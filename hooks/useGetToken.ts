import { useQuery } from "@tanstack/react-query"

export const useGetToken = () => {
  return useQuery({
    queryKey: ["accessToken"],
    queryFn: async () => {
      const res = await fetch("/api/token")
      if (!res.ok) {
        throw new Error("There was an error fetching the token.")
      }
      const data = await res.json()
      return data.accessToken
    },
    staleTime: 1000 * 60 * 5
  })
}