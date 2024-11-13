import { searchArxiv } from "@/lib/arxiv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const start = Number(searchParams.get('start')) || 0;
  const limit = Number(searchParams.get('limit')) || 20;

  const papers = await searchArxiv(query, start, limit);
  return NextResponse.json(papers);
} 