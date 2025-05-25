import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useEditTriggerMutation(
  statusId: number,
  triggerId: number,
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-trigger", statusId, triggerId],
    mutationFn: async (payload: { [key: string]: string | number }) => {
      const res = await axios.patch(
        `${SERVER_URL}/status-triggers/${statusId}/${triggerId}/parameters`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["triggers", statusId] });
      setIsEditModalOpen(false);
      setIsAnyModalOpen(false);
      setIsFailed(false);
    },
    onError() {
      setIsFailed(true);
    },
  });
}