import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, AddRobot, AddRobotWithLink } from "../consts";

export function useAddRobotMutation(
  statusId: number,
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-robot", statusId],
    mutationFn: async (payload: AddRobot | AddRobotWithLink) => {
      const res = await axios.post(
        `${SERVER_URL}/robots/${statusId}`,
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
      queryClient.invalidateQueries({ queryKey: ["robots", statusId] });
      setIsAddModalOpen(false);
      setIsAnyModalOpen(false);
      setIsFailed(false)
    },
    onError() {
      setIsFailed(true);
    },
  });
}