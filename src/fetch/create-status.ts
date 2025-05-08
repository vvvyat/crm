import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateUpdateStatus,
  StatusFormInputs,
  SERVER_URL,
} from "../consts";
import { UseFormReset } from "react-hook-form";

export function useCreateStatusMutation(
  eventId: number,
  setIsCreateFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<StatusFormInputs>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-status", eventId],
    mutationFn: async (payload: CreateUpdateStatus) => {
      const res = await axios.post(`${SERVER_URL}/events/${eventId}/statuses`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["event-statuses", eventId] });
      reset();
      setIsAddModalOpen(false);
      setIsAnyModalOpen(false);
    },
    onError() {
      setIsCreateFailed(true);
    },
  });
}
