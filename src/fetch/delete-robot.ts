import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useDeleteRobotMutation(
  statusId: number,
  robotId: number,
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-robot", robotId],
    mutationFn: async () => {
      const res = await axios.delete(
        `${SERVER_URL}/robots/${statusId}/${robotId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["robots", statusId] });
      setIsFailed(false);
      setIsDeleteConfirmOpen(false);
      setIsAnyModalOpen(false);
    },
    onError() {
      setIsFailed(true);
    },
  });
}