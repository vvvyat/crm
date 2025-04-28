import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Status, SERVER_URL } from "../consts";

export function useEventStatusesQuery() {
  return useQuery<Status[]>({
    queryKey: ["event-statuses"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/api/statuses`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
