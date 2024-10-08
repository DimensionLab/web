"use client";

import { UniversityPostCard } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import UniversityPost from "@/components/blog/UniversityPost";
import { useEffect, useState } from "react";
import fetchMoreUniPosts from "./fetchMoreUniPosts";
import SkeletonCard from "@/components/blog/skeletonCard";
import { STORIES_PER_PAGE } from "@/lib/constants";

interface CachedArticles {
  articles: UniversityPostCard[];
  time: number;
  total: number;
  page: number;
}

const CACHE_INVALIDATION_TIME = 1000 * 20 * 5; // 5 minutes

export default function UniversityRootPage() {
  const [storiesObjects, setStoriesObjects] = useState<UniversityPostCard[]>(
    []
  );
  const [currPage, setCurrPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const localStorage = window.localStorage;
    const uniArticles = localStorage.getItem("uniArticles");

    if (uniArticles !== null && uniArticles !== undefined) {
      const parsedArticles: CachedArticles = JSON.parse(uniArticles);

      // use cached only if tiem is less than 5 minutes
      if (parsedArticles.time + CACHE_INVALIDATION_TIME > Date.now()) {
        setStoriesObjects(parsedArticles.articles);
        setTotal(parsedArticles.total);
        setCurrPage(parsedArticles.page);
        return;
      }
      // if time is more than 5 minutes, fetch new ones (goes to fetchMorePosts below)
    }

    fetchMoreUniPosts(currPage).then((newStories) => {
      setStoriesObjects(newStories.data);
      const obj: CachedArticles = {
        articles: newStories.data,
        time: Date.now(),
        total: newStories.total,
        page: currPage + 1,
      };

      localStorage.setItem("uniArticles", JSON.stringify(obj));
      setCurrPage(currPage + 1);
      setTotal(newStories.total);
    });
  }, []);

  const mockArray = Array.from({ length: STORIES_PER_PAGE }, (_, i) => i);

  return (
    <section className="flex flex-col w-full h-full gap-y-2 my-8">
      <Image
        src="/assets/simlai/simlai-university-logo.png"
        alt="Siml.ai University"
        className="text-4xl font-bold mx-auto"
        width={400}
        height={200}
      />
      <h3 className="text-[#B4B6C3] font-normal text-xl lg:line-clamp-2 mx-auto text-center">
        Learn how to create AI-driven simulations in Siml.ai
      </h3>
      <ul className="flex flex-col gap-y-12 items-center w-full mt-20">
        {storiesObjects?.length > 0
          ? storiesObjects.map((uniPost) => {
              return (
                <li key={uniPost.uuid} className={cn("max-w-6xl")}>
                  <Link href={`/products/simlai/university/${uniPost.slug}`}>
                    <UniversityPost uniPost={uniPost} />
                  </Link>
                </li>
              );
            })
          : mockArray.map((_, i) => {
              return <SkeletonCard key={i} />;
            })}
      </ul>
      {total >= (currPage - 1) * STORIES_PER_PAGE && (
        <section className="flex justify-center">
          <div className="flex flex-row items-center justify-center w-full gap-x-10 max-w-2xl">
            <button
              className={cn(
                `w-1/2 border-2 border-muted px-4 py-2 rounded text-muted text-center duration-300 hover:text-white hover:border-btnPurple`
              )}
              onClick={() => {
                fetchMoreUniPosts(currPage).then((newStories) => {
                  const { data } = newStories;
                  const oldStoryIdSet = new Set(
                    storiesObjects.map((story) => story.uuid)
                  );
                  const storiesArray = data.filter(
                    (story) => !oldStoryIdSet.has(story.uuid)
                  ); // remove duplicates
                  const obj: CachedArticles = {
                    articles: storiesObjects.concat(storiesArray),
                    time: Date.now(),
                    total: newStories.total,
                    page: currPage + 1,
                  };
                  setStoriesObjects(obj.articles);
                  localStorage.setItem("uniArticles", JSON.stringify("obj"));
                  setCurrPage(currPage + 1);
                });
              }}
            >
              {"Load more..."}
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
