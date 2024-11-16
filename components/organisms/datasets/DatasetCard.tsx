import { IDataset } from "./DatasetsList";
import { Eye, Download, Heart } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { formatFileSize } from "@/lib/utils";

export function DatasetCard({ dataset }: { dataset: IDataset }) {
    return (
        <div className="group rounded-xl bg-white border border-gray-200/50 p-3.5 
            transition-all duration-200 hover:bg-gray-50
            dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/[0.07]">
            <div className="flex gap-3">
                {/* Image thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 
                    bg-gray-100 dark:bg-white/5">
                    <img 
                        src={dataset.image} 
                        alt={dataset.name}
                        className="w-full h-full object-cover 
                            opacity-100 dark:opacity-90"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Owner info */}
                    <div className="flex items-center gap-2 mb-1.5">
                        <a href="#" className="block w-5 h-5 rounded-full overflow-hidden 
                            hover:opacity-90">
                            <img 
                                src={dataset.owner.avatarUrl} 
                                alt={`${dataset.owner.name}'s avatar`}
                                className="w-full h-full object-cover"
                            />
                        </a>
                        <span className="text-[11px] text-gray-500 dark:text-white/50">
                            {dataset.owner.name} • {formatDistanceToNow(new Date(dataset.updatedAt), { addSuffix: true })}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 
                        className="text-sm font-medium text-gray-900 hover:text-gray-700 
                            dark:text-white/90 dark:hover:text-white cursor-pointer 
                            transition-colors mb-1 truncate"
                    >
                        <Link href={`/datasets/${dataset.id}`}>{dataset.name}</Link>
                    </h2>

                    {/* Description */}
                    <p className="text-[11px] leading-[1.4] text-gray-500 
                        dark:text-white/50 line-clamp-2 mb-2">
                        {dataset.description}
                    </p>

                    {/* Swap size and format info */}
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-white/50">
                        {/* Format Badge */}
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded 
                            dark:bg-blue-500/20 dark:text-blue-200">
                            {dataset.format}
                        </span>
                        
                        {/* Size Info */}
                        <span className="flex items-center gap-1.5">
                            <span className="font-medium">{formatFileSize(dataset.size)}</span>
                        </span>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-3 text-gray-500 dark:text-white/50">
                            <div className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{dataset.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="w-3.5 h-3.5" />
                                <span>{dataset.downloads.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" />
                                <span>{dataset.likes.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
