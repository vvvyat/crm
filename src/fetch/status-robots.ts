import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, Robot } from "../consts";

export function useRobotsQuery(statusId: number) {
  return useQuery<Robot[]>({
    queryKey: ["robots", statusId],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/robots/${statusId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}