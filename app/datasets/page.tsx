"use client";

import { useState, useCallback } from "react";
import { FilterSidebar } from "@/components/organisms/datasets/FilterSidebar";
import { DatasetsList } from "@/components/organisms/datasets/DatasetsList";
import { mockDatasets } from "./fake-datasets";

export default function DatasetsPage() {
    const [filteredDatasets, setFilteredDatasets] = useState(mockDatasets);

    const handleFiltersChange = useCallback((filters: {
        selectedIndustries: string[];
        selectedFormats: string[];
        sizeFilterStep: number;
    }) => {
        const filtered = mockDatasets.filter((dataset) => {
            const matchesIndustry = filters.selectedIndustries.length === 0 || 
                filters.selectedIndustries.includes(dataset.industry);
            
            const matchesFormat = filters.selectedFormats.length === 0 || 
                filters.selectedFormats.includes(dataset.format);
            
            const matchesSize = dataset.size <= filters.sizeFilterStep;
                
            return matchesIndustry && matchesFormat && matchesSize;
        });
        setFilteredDatasets(filtered);
    }, []); // Empty dependency array since mockDatasets is static

    return (
        <main className="w-full min-h-screen mx-auto px-4 sm:px-8 lg:px-16 2xl:px-32 py-8 flex gap-8">
            <FilterSidebar onFiltersChange={handleFiltersChange} />
            <DatasetsList datasets={filteredDatasets} />
        </main>
    );
}
