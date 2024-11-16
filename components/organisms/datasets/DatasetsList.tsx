"use client";

import { memo, useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useDebounce } from 'use-debounce';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { DatasetCard } from './DatasetCard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface IOwner {
    id: string;  // UUID
    name: string;  // Person name or organization
    avatarUrl: string;
    type: 'person' | 'organization';
}

export interface IDataset {
    id: number;
    name: string;
    description: string;
    industry: string;
    format: string;
    size: number;
    updatedAt: number; // Unix timestamp in milliseconds
    views: number;
    downloads: number;
    likes: number;
    image?: string;
    owner: IOwner;  // Add this field
}

interface DatasetsListProps {
    datasets: ReadonlyArray<IDataset>;
}

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50] as const;
type ItemsPerPage = typeof ITEMS_PER_PAGE_OPTIONS[number];

const MemoizedDatasetCard = memo(DatasetCard);

// Add new types and constants
type SortField = 'views' | 'likes' | 'downloads' | 'updatedAt' | 'size';
type SortDirection = 'asc' | 'desc';

const SORT_OPTIONS: { label: string; field: SortField }[] = [
    { label: 'Size', field: 'size' },
    { label: 'Trending', field: 'views' },
    { label: 'Most likes', field: 'likes' },
    { label: 'Most downloads', field: 'downloads' },
    { label: 'Recently updated', field: 'updatedAt' },
];

export function DatasetsList({ datasets }: DatasetsListProps) {
    // Initialize with default values
    const [sortField, setSortField] = useState<SortField>('size');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    // Load saved preferences after mount
    useEffect(() => {
        const savedField = localStorage.getItem('sortField') as SortField;
        const savedDirection = localStorage.getItem('sortDirection') as SortDirection;
        
        if (savedField) {
            setSortField(savedField);
        }
        if (savedDirection) {
            setSortDirection(savedDirection);
        }
    }, []);

    // Pagination and sorting state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(25);
    
    // Search state with transitions
    const [searchTerm, setSearchTerm] = useState('');
    const [isPending, startTransition] = useTransition();
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    // Page number editing state
    const [isEditingPage, setIsEditingPage] = useState(false);
    const [tempPage, setTempPage] = useState('1');

    // Memoized dataset filtering and sorting
    const filteredAndSortedDatasets = useMemo(() => {
        if (!datasets.length) return [];

        const filtered = debouncedSearch
            ? datasets.filter(dataset => (
                dataset.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                dataset.description.toLowerCase().includes(debouncedSearch.toLowerCase())
            ))
            : datasets;

        return [...filtered].sort((a, b) => {
            const multiplier = sortDirection === 'desc' ? -1 : 1;
            // Special handling for size field to ensure correct numeric comparison
            if (sortField === 'size') {
                return multiplier * (a.size - b.size);
            }
            return multiplier * (a[sortField] - b[sortField]);
        });
    }, [datasets, sortField, sortDirection, debouncedSearch]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedDatasets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDatasets = useMemo(() => 
        filteredAndSortedDatasets.slice(startIndex, startIndex + itemsPerPage),
        [filteredAndSortedDatasets, startIndex, itemsPerPage]
    );

    // Calculate grid columns based on viewport
    const columns = {
        base: 1,
        lg: 2,
        xl: 3
    };

    // Virtualization setup
    const parentRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            // Reduced height to ensure pagination is visible
            // Subtracting header (24px + margins) and pagination (56px + margins) heights
            node.style.height = 'calc(100vh - 280px)';
        }
    }, []);

    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(paginatedDatasets.length / columns.xl),
        getScrollElement: () => document.querySelector('[data-virtualized-grid]'),
        estimateSize: () => 140 + 8, // Base height + gap (2 units = 8px)
        overscan: 3
    });

    // Handlers
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        startTransition(() => {
            setCurrentPage(1); // Reset to first page on search
        });
    }, []);

    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    const handlePageInputBlur = useCallback(() => {
        setIsEditingPage(false);
        const newPage = parseInt(tempPage);
        if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        } else {
            setTempPage(currentPage.toString());
        }
    }, [tempPage, totalPages, currentPage]);

    const handlePageInputKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePageInputBlur();
        }
    }, [handlePageInputBlur]);

    const handleItemsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(e.target.value) as ItemsPerPage;
        setItemsPerPage(newValue);
        setCurrentPage(1); // Reset to first page when changing items per page
    }, []);

    // Update handler for sort changes - simplified
    const handleSortChange = useCallback((field: SortField) => {
        if (field === sortField) {
            const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
            setSortDirection(newDirection);
            if (typeof window !== 'undefined') {
                localStorage.setItem('sortDirection', newDirection);
            }
        } else {
            setSortField(field);
            setSortDirection('desc');
            if (typeof window !== 'undefined') {
                localStorage.setItem('sortField', field);
                localStorage.setItem('sortDirection', 'desc');
            }
        }
    }, [sortField, sortDirection]);

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Datasets{' '}
                    <span className="text-gray-500 dark:text-white/50">
                        {filteredAndSortedDatasets.length.toLocaleString()}
                    </span>
                </h1>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Filter by name or description"
                        className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 
                            text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none 
                            focus:border-gray-300 w-64
                            dark:bg-white/5 dark:border-white/10 dark:text-white/90 
                            dark:placeholder:text-white/30 dark:focus:border-white/20"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1.5">
                            <span className="text-gray-500 text-xs font-medium hover:text-gray-700 
                                transition-colors dark:text-white/50 dark:hover:text-white/70">
                                Sort: {SORT_OPTIONS.find(opt => opt.field === sortField)?.label}
                            </span>
                        </DropdownMenuTrigger>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
                                setSortDirection(newDirection);
                                localStorage.setItem('sortDirection', newDirection);
                            }}
                            className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-white/50 dark:hover:text-white/70"
                        >
                            {sortDirection === 'desc' ? (
                                <ArrowDown className="w-3.5 h-3.5" />
                            ) : (
                                <ArrowUp className="w-3.5 h-3.5" />
                            )}
                        </button>
                        <DropdownMenuContent align="end" className="w-48">
                            {SORT_OPTIONS.map(option => (
                                <DropdownMenuItem
                                    key={option.field}
                                    onClick={() => handleSortChange(option.field)}
                                    className={`cursor-pointer ${
                                        sortField === option.field ? 'text-blue-500' : ''
                                    }`}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Dataset Grid with Virtualization */}
            <div 
                ref={parentRef}
                data-virtualized-grid
                className="overflow-auto mb-8 pr-4"
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                        width: '100%'
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map(virtualRow => {
                        const firstIndex = virtualRow.index * columns.xl;
                        const rowDatasets = paginatedDatasets.slice(
                            firstIndex,
                            firstIndex + columns.xl
                        );

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size - 8}px`, // Subtract the smaller gap
                                    transform: `translateY(${virtualRow.start + (virtualRow.index * 8)}px)`, // Add smaller gap for each row
                                }}
                                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2" // Reduced gap from 4 to 2
                            >
                                {rowDatasets.map((dataset) => (
                                    <MemoizedDatasetCard 
                                        key={dataset.id}
                                        dataset={dataset}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    Show:
                    <select 
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="bg-white border border-gray-200 rounded px-2 py-1
                            dark:bg-gray-800 dark:border-gray-700"
                    >
                        {ITEMS_PER_PAGE_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <span>per page</span>
                </div>

                <div className="flex items-center gap-2">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isEditingPage={isEditingPage}
                        tempPage={tempPage}
                        onPageChange={handlePageChange}
                        onEditingChange={setIsEditingPage}
                        onTempPageChange={setTempPage}
                        onInputBlur={handlePageInputBlur}
                        onInputKeyDown={handlePageInputKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

// Extracted Pagination Controls Component
const PaginationControls = memo(function PaginationControls({
    currentPage,
    totalPages,
    isEditingPage,
    tempPage,
    onPageChange,
    onEditingChange,
    onTempPageChange,
    onInputBlur,
    onInputKeyDown
}: {
    currentPage: number;
    totalPages: number;
    isEditingPage: boolean;
    tempPage: string;
    onPageChange: (page: number) => void;
    onEditingChange: (isEditing: boolean) => void;
    onTempPageChange: (value: string) => void;
    onInputBlur: () => void;
    onInputKeyDown: (e: React.KeyboardEvent) => void;
}) {
    return (
        <>
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 
                    disabled:hover:bg-transparent
                    dark:hover:bg-gray-800"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            <div className="flex items-center gap-1">
                {isEditingPage ? (
                    <input
                        type="text"
                        value={tempPage}
                        onChange={(e) => onTempPageChange(e.target.value)}
                        onBlur={onInputBlur}
                        onKeyDown={onInputKeyDown}
                        className="w-12 bg-white border border-gray-200 rounded text-center 
                            text-gray-800 text-sm py-1
                            dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        autoFocus
                    />
                ) : (
                    <button
                        onClick={() => {
                            onEditingChange(true);
                            onTempPageChange(currentPage.toString());
                        }}
                        className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm 
                            flex items-center justify-center"
                    >
                        {currentPage}
                    </button>
                )}
                <span className="text-gray-500 text-sm dark:text-gray-400">
                    of {totalPages}
                </span>
            </div>

            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 
                    disabled:hover:bg-transparent
                    dark:hover:bg-gray-800"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
        </>
    );
});
