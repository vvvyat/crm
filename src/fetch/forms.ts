import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Form, SERVER_URL } from "../consts";

export function useFormsQuery() {
  return useQuery<Form[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/forms`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
