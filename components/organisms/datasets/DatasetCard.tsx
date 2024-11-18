import { IDataset } from "./DatasetsList";
import { Eye, Download, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { formatFileSize } from "@/lib/utils";

export function DatasetCard({ dataset }: { dataset: IDataset }) {
  return (
    <div
      className="relative rounded-[10px] bg-white dark:bg-[#1C1C1E] 
                hover:bg-gray-50/80 dark:hover:bg-[#2C2C2E] 
                shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:shadow-none 
                border border-gray-100 dark:border-[#2C2C2E] 
                p-4 transition-colors"
    >
      <div className="flex gap-3">
        {/* Image thumbnail */}
        <div className="rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={dataset.image}
            alt={dataset.name}
            className="w-20 h-20 object-cover 
                            opacity-100 dark:opacity-90 bg-gray-100 dark:bg-white/5"
          />
          <div className="mt-2">
            <span
              className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded 
                            dark:bg-blue-500/20 dark:text-blue-200 text-xs"
            >
              {dataset.format}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Owner info */}
          <div className="flex items-center gap-2 mb-1.5">
            <a
              href="#"
              className="block w-5 h-5 rounded-full overflow-hidden 
                            hover:opacity-90"
            >
              <img
                src={dataset.owner.avatarUrl}
                alt={`${dataset.owner.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </a>
            <span className="text-[11px] text-gray-500 dark:text-white/50">
              {dataset.owner.name} •{" "}
              {formatDistanceToNow(new Date(dataset.updatedAt), {
                addSuffix: true,
              })}
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
          <p
            className="text-[11px] xl:text-[12px] text-gray-500 
                        dark:text-white/50 line-clamp-2 mb-2"
          >
            {dataset.description}
          </p>

          {/* Swap size and format info */}
          <div className="mt-2">
            {/* Stats */}
            <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-white/50">
              {/* Size Info */}
              <div className="flex items-center gap-1 inline-block">
                <span className="whitespace-nowrap">
                  {formatFileSize(dataset.size)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{dataset.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{dataset.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{dataset.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
