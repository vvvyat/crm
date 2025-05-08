import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useDeleteFormMutation(
  eventId: number,
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteFaled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-form", eventId],
    mutationFn: async () => {
      const res = await axios.delete(`${SERVER_URL}/forms/${eventId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      setIsDeleteFaled(false);
      setIsDeleteConfirmOpen(false);
    },
    onError() {
      setIsDeleteFaled(true);
    },
  });
}
