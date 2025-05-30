import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useDeleteStatusMutation(
  eventId: number,
  statusId: number,
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeleteFaled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-status", eventId, statusId],
    mutationFn: async () => {
      const res = await axios.delete(`${SERVER_URL}/events/${eventId}/statuses/${statusId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["event-statuses", eventId] });
      setIsDeleteFaled(false);
      setIsDeleteConfirmOpen(false);
      setIsAnyModalOpen(false);
    },
    onError() {
      setIsDeleteFaled(true);
    },
  });
}
