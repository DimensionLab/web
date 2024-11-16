import React from "react";

export default function PapersSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Papers</h3>
        <span className="text-sm text-muted-foreground">5 papers</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Mock paper cards */}
        <div className="rounded-lg border border-border p-4">
          <h4 className="font-semibold">Paper Title</h4>
          <p className="text-sm text-muted-foreground">
            Brief description of the paper...
          </p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Published: Jan 2024</span>
            <span className="mx-2">•</span>
            <span>Citations: 42</span>
          </div>
        </div>
        {/* Add more paper cards */}
      </div>
    </section>
  );
}
