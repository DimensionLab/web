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
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#121212] p-8 flex gap-8">
            <FilterSidebar onFiltersChange={handleFiltersChange} />
            <DatasetsList datasets={filteredDatasets} />
        </div>
    );
}
