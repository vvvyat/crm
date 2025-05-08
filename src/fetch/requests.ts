import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, StudentRequest } from "../consts";

export function useRequestsQuery(eventId: number, statusId: number) {
  return useQuery<StudentRequest[]>({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/applications?eventId=${eventId}&statusId=${statusId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
