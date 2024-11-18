"use client"

import { useState, useEffect, useMemo, useCallback } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Check, Plus } from 'lucide-react';

interface FilterSidebarProps {
    onFiltersChange: (filters: {
        selectedIndustries: string[];
        selectedFormats: string[];
        sizeFilterStep: number;
    }) => void;
}

export function FilterSidebar({
    onFiltersChange
}: FilterSidebarProps) {
    // Change state to use arrays instead of single values
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

    const sizeFilterSteps = useMemo(() => [
        { step: 0, label: "<1MB", value: 1024 },
        { step: 1, label: "<10MB", value: Math.pow(1024, 2) },
        { step: 2, label: "<100MB", value: Math.pow(1024, 3) },
        { step: 3, label: "<1GB", value: Math.pow(1024, 4) },      
        { step: 4, label: "<10GB", value: Math.pow(1024, 5) },     
        { step: 5, label: "<100GB", value: Math.pow(1024, 6) },    
        { step: 6, label: "<1TB", value: Math.pow(1024, 7) },  
        { step: 7, label: "<10TB", value: Math.pow(1024, 8) }, 
        { step: 8, label: "<100TB", value: Math.pow(1024, 9) }, 
        { step: 9, label: "<1PB", value: Math.pow(1024, 10) },
        { step: 10, label: ">1PB", value: Math.pow(1024, 11) }
    ], []);

    // Initialize sizeFilterStep with step 4 representing datasets smaller than 10GB
    const [sizeFilterStep, setSizeFilterStep] = useState<number>(4);

    // Memoize the filters object to prevent unnecessary re-renders
    const currentFilters = useMemo(() => ({
        selectedIndustries,
        selectedFormats,
        sizeFilterStep: sizeFilterSteps[sizeFilterStep].value
    }), [selectedIndustries, selectedFormats, sizeFilterStep]);

    // Use the memoized filters object in useEffect
    useEffect(() => {
        onFiltersChange(currentFilters);
    }, [currentFilters, onFiltersChange]);

    const industries = [
        "AEC", "Aerospace", "Automotive", "Consumer Products", "Electronics", "Energy",
        "Engineering Services", "Life Sciences & Healthcare", "Machinery & Industrial Equipment",
        "Manufacturing", "Marine", "Other"
    ];
    const formats = ["json", "csv", "webdataset", "vtp", "vtu", "vti", "vtk", "tfrecords", "HDF5"];

    // Add toggle handlers
    const toggleIndustry = useCallback((industry: string) => {
        setSelectedIndustries(prev => 
            prev.includes(industry)
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    }, []);

    const toggleFormat = useCallback((format: string) => {
        setSelectedFormats(prev => 
            prev.includes(format)
                ? prev.filter(f => f !== format)
                : [...prev, format]
        );
    }, []);

    return (
        <div className="w-72 space-y-6">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white/90">
                Filter by Industry
            </h2>
            
            {/* Industry Filter */}
            <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-700 dark:text-white/70">
                    Industries
                </h3>
                <div className="flex flex-wrap gap-1.5">
                    {industries.map((industry) => (
                        <button
                            key={industry}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200
                                flex items-center gap-1.5
                                ${selectedIndustries.includes(industry)
                                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-500/30 backdrop-blur-sm hover:bg-purple-200 dark:hover:bg-purple-500/30 hover:border-purple-300 dark:hover:border-purple-500/40'
                                    : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/15 hover:border-gray-300 dark:hover:border-white/30 hover:text-gray-800 dark:hover:text-gray-200 opacity-75 hover:opacity-100'}`}
                            onClick={() => toggleIndustry(industry)}
                        >
                            {selectedIndustries.includes(industry) ? (
                                <Check className="h-3.5 w-3.5" />
                            ) : (
                                <Plus className="h-3.5 w-3.5" />
                            )}
                            {industry}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-medium text-gray-700 dark:text-white/70">
                        Size
                    </h3>
                </div>
                <div className="relative pt-8 px-[10px]">
                    <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={[sizeFilterStep]}
                        max={10}
                        step={1}
                        onValueChange={(value) => setSizeFilterStep(value[0])}
                    >
                        <Slider.Track className="bg-gray-200 dark:bg-white/10 relative grow rounded-full h-[3px]">
                            <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                        </Slider.Track>
                        <div className="absolute w-full" style={{ top: '-24px' }}>
                            <div
                                className="absolute text-xs text-gray-700 dark:text-white/70 transform -translate-x-1/2 whitespace-nowrap"
                                style={{ left: `${(sizeFilterStep / 10) * 100}%` }}
                            >
                                {sizeFilterSteps[sizeFilterStep].label}
                            </div>
                        </div>
                        <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-gray-800 shadow-lg rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                    </Slider.Root>
                </div>
            </div>

            {/* Format Filter */}
            <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-700 dark:text-white/70">
                    Format
                </h3>
                <div className="flex flex-wrap gap-1.5">
                    {formats.map((format) => (
                        <button
                            key={format}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200
                                flex items-center gap-1.5
                                ${selectedFormats.includes(format)
                                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-500/30 backdrop-blur-sm hover:bg-purple-200 dark:hover:bg-purple-500/30 hover:border-purple-300 dark:hover:border-purple-500/40'
                                    : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/15 hover:border-gray-300 dark:hover:border-white/30 hover:text-gray-800 dark:hover:text-gray-200 opacity-75 hover:opacity-100'}`}
                            onClick={() => toggleFormat(format)}
                        >
                            {selectedFormats.includes(format) ? (
                                <Check className="h-3.5 w-3.5" />
                            ) : (
                                <Plus className="h-3.5 w-3.5" />
                            )}
                            {format}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
