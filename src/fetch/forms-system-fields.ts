import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, FormsSystemField } from "../consts";

export function useFormsSystemFieldsQuery() {
  return useQuery<FormsSystemField[]>({
    queryKey: ["forms-system-fields"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/forms/system-fields`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
