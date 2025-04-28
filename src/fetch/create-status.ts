import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateUpdateStatus,
  CreateStatusFormInputs,
  SERVER_URL,
} from "../consts";
import { UseFormReset } from "react-hook-form";

export function useCreateStatusMutation(
  setIsCreateFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<CreateStatusFormInputs>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-status"],
    mutationFn: async (payload: CreateUpdateStatus) => {
      const res = await axios.post(`${SERVER_URL}/api/statuses`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["event-statuses"] });
      reset();
      setIsAddModalOpen(false);
      setIsAnyModalOpen(false);
    },
    onError() {
      setIsCreateFailed(true);
    },
  });
}
