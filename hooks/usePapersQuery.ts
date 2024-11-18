import { useQuery } from "@tanstack/react-query";
import { getUpvotedPapers } from "@/app/actions";

export function usePapersQuery(userId: string, page: number, pageSize: number) {
  return useQuery({
    queryKey: ['papers', userId, page, pageSize],
    queryFn: () => getUpvotedPapers(userId, page, pageSize),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    enabled: !!userId, // Only run query if userId exists
  });
} 