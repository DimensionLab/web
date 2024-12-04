import Link from "next/link";
import React from "react";

export default function CollectionsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Collections</h3>
        <span className="text-sm text-muted-foreground">6 collections</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mock collection cards */}
        <Link 
            href={`#`} 
            className="block rounded-[10px] bg-white dark:bg-[#1C1C1E] hover:bg-gray-50/80 dark:hover:bg-[#2C2C2E] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-[#2C2C2E] p-7 transition-colors"
          >
          <h4 className="font-medium text-[15px] text-gray-900 dark:text-gray-100 line-clamp-2">Spanish Language Models</h4>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-2.5">
            Collection of pre-trained and fine-tuned Spanish Language Models
          </p>
          <div className="mt-3.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Updated Mar 30, 2022</span>
            <span className="mx-2">•</span>
            <span>5 items</span>
          </div>
        </Link>
        {/* Add more collection cards */}
      </div>
    </section>
  );
}
