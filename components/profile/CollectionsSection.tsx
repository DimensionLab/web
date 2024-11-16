import React from "react";

export default function CollectionsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Collections</h3>
        <span className="text-sm text-muted-foreground">6 collections</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Mock collection cards */}
        <div className="rounded-lg border border-border p-4">
          <h4 className="font-semibold">Spanish Language Models</h4>
          <p className="text-sm text-muted-foreground">
            Collection of pre-trained and fine-tuned Spanish Language Models
          </p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Updated Mar 30, 2022</span>
            <span className="mx-2">•</span>
            <span>5 items</span>
          </div>
        </div>
        {/* Add more collection cards */}
      </div>
    </section>
  );
}
