import { cache } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const ARXIV_API_URL = 'http://export.arxiv.org/api/query';
const parser = new XMLParser();

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  publishedDate: string;
  updatedDate: string;
  categories: string[];
  pdfUrl: string;
}

export const searchArxiv = cache(async (query: string, start = 0, maxResults = 50) => {
  try {
    const response = await axios.get(ARXIV_API_URL, {
      params: {
        search_query: query,
        start,
        max_results: maxResults,
        sortBy: 'submittedDate',
        sortOrder: 'descending',
      },
    });

    const parsed = parser.parse(response.data);
    console.log('Parsed response:', parsed);

    if (!parsed?.feed?.entry) {
      console.log('No entries found in feed');
      return [];
    }

    const entries = Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];
    console.log('Entries to process:', entries);
    return transformArxivResponse(entries);
  } catch (error: unknown) {
    console.error('Error in searchArxiv:', error);
    throw new Error(`Failed to search arXiv: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

export const getArxivPaper = cache(async (id: string): Promise<ArxivPaper> => {
  const response = await axios.get(ARXIV_API_URL, {
    params: { id_list: id },
  });

  const parsed = parser.parse(response.data);
  if (!parsed.feed.entry) throw new Error('Paper not found');
  return transformArxivResponse([parsed.feed.entry])[0];
});

function transformArxivResponse(entries: any[]): ArxivPaper[] {
  return entries.map((entry) => {
    console.log('Entry categories:', entry.category);
    
    const categories = Array.isArray(entry.category)
      ? entry.category.map((c: any) => c['@_term'] || c.term).filter(Boolean)
      : [entry.category?.['@_term'] || entry.category?.term].filter(Boolean);
    
    console.log('Transformed categories:', categories);

    return {
      id: entry.id.split('/').pop().split('v')[0],
      title: entry.title,
      summary: entry.summary,
      authors: Array.isArray(entry.author) 
        ? entry.author.map((a: any) => a.name)
        : [entry.author.name],
      publishedDate: entry.published,
      updatedDate: entry.updated,
      categories,
      pdfUrl: entry.link?.find((l: any) => l['@_title'] === 'pdf')?.['@_href'] || 
             `https://arxiv.org/pdf/${entry.id.split('/').pop()}`,
    };
  });
}