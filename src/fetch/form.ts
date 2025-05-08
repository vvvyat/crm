import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Form, SERVER_URL } from "../consts";

export function useFormQuery(eventId: number) {
  return useQuery<Form>({
    queryKey: ["form"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/forms/${eventId}`);
      return res.data;
    },
  });
}