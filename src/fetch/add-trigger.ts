import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, AddTrigger } from "../consts";

export function useAddTriggerMutation(
  statusId: number,
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-trigger", statusId],
    mutationFn: async (payload: AddTrigger) => {
      const res = await axios.post(
        `${SERVER_URL}/status-triggers/${statusId}`,
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
      setIsAddModalOpen(false);
      setIsAnyModalOpen(false);
      setIsFailed(false);
    },
    onError() {
      setIsFailed(true);
    },
  });
}