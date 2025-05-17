import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, Trigger } from "../consts";

export function useTriggersQuery(statusId: number) {
  return useQuery<Trigger[]>({
    queryKey: ["triggers", statusId],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/status-triggers/${statusId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}