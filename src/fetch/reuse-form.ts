import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, CreateUpdateForm } from "../consts";

export function useReuseFormMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reuse-form"],
    mutationFn: async (payload: CreateUpdateForm) => {
      const res = await axios.post(`${SERVER_URL}/forms`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}