import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/entities/auth/api.ts";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    select: data => data.data_list.practicant
  })
}
