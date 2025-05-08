import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, FormsStandardField } from "../consts";

export function useFormsStandardFieldsQuery() {
  return useQuery<FormsStandardField[]>({
    queryKey: ["forms-standard-fields"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/forms/standard-fields`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
