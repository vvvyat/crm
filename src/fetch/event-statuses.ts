import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Status, SERVER_URL } from "../consts";

export function useEventStatusesQuery(eventId: number) {
  return useQuery<Status[]>({
    queryKey: ["event-statuses", eventId],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/events/${eventId}/statuses`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
