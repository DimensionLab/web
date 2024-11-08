import { getArxivPaper } from "@/lib/arxiv";
import { notFound } from "next/navigation";
import 'katex/dist/katex.min.css';
import { renderMathInElement } from '@/lib/math';

function processText(text: string): string {
  return text
    .replace(/(\d+\.?\d*)\\%/g, '$1%')
    .replace(/--/g, '—');
}

export default async function PaperPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const paper = await getArxivPaper(params.id);
    console.log(paper);

    return (
      <article className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {renderMathInElement(processText(paper.title))}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Authors</h2>
          <p>{paper.authors.join(", ")}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Abstract</h2>
          <p className="text-white">
            {renderMathInElement(processText(paper.summary))}
          </p>
        </div>

        {paper.categories && paper.categories.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <div className="flex gap-2 flex-wrap">
              {paper.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <a
          href={paper.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
          View PDF
        </a>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
