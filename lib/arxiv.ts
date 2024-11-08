import { cache } from 'react';
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
  arxivUrl: string;
  pdfUrl: string;
}

export const searchArxiv = cache(async (query: string, start = 0, maxResults = 50) => {
  try {
    const params = new URLSearchParams({
      search_query: query,
      start: start.toString(),
      max_results: maxResults.toString(),
      sortBy: 'submittedDate',
      sortOrder: 'descending',
    });

    const response = await fetch(`${ARXIV_API_URL}?${params}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`ArXiv API responded with status: ${response.status}`);
    }

    const data = await response.text();
    const parsed = parser.parse(data);

    if (!parsed?.feed?.entry) {
      return [];
    }

    const entries = Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];
    return transformArxivResponse(entries);
  } catch (error) {
    console.error('Error in searchArxiv:', error);
    throw new Error(`Failed to search arXiv: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

export const getArxivPaper = cache(async (id: string): Promise<ArxivPaper> => {
  try {
    console.log('Fetching paper with ID:', id);
    const response = await fetch(`${ARXIV_API_URL}?id_list=${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`ArXiv API responded with status: ${response.status}`);
    }

    const data = await response.text();
    const parsed = parser.parse(data);
    console.log('Parsed response:', parsed);

    if (!parsed?.feed?.entry) {
      console.log('No entry found in feed');
      throw new Error('Paper not found');
    }

    const paper = transformArxivResponse([parsed.feed.entry])[0];
    console.log('Transformed paper:', paper);
    
    if (!paper) {
      throw new Error('Failed to transform paper data');
    }

    return paper;
  } catch (error) {
    console.error('Error in getArxivPaper:', error);
    throw error;
  }
});

function transformArxivResponse(entries: any[]): ArxivPaper[] {
  try {
    return entries.map((entry) => {
      if (!entry) {
        console.error('Empty entry received');
        throw new Error('Invalid entry data');
      }

      const categories = Array.isArray(entry.category)
        ? entry.category.map((c: any) => c['term'] || c.term).filter(Boolean)
        : [entry.category?.['term'] || entry.category?.term].filter(Boolean);
      
      const id = entry.id.split('/').pop().split('v')[0];
      
      return {
        id,
        title: entry.title || '',
        summary: entry.summary || '',
        authors: Array.isArray(entry.author) 
          ? entry.author.map((a: any) => a.name)
          : [entry.author?.name || ''],
        publishedDate: entry.published || new Date().toISOString(),
        updatedDate: entry.updated || new Date().toISOString(),
        categories: categories.length > 0 ? categories : [],
        arxivUrl: `https://arxiv.org/abs/${entry.id.split('/').pop()}`,
        pdfUrl: entry.link?.find((l: any) => l['@_title'] === 'pdf')?.['@_href'] || 
               `https://arxiv.org/pdf/${entry.id.split('/').pop()}`,
      };
    });
  } catch (error) {
    console.error('Error in transformArxivResponse:', error);
    throw error;
  }
}