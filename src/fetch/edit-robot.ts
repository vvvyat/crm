import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, EditRobot, EditRobotWithLink } from "../consts";

export function useEditRobotMutation(
  statusId: number,
  robotId: number,
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-robot", statusId, robotId],
    mutationFn: async (payload: EditRobot | EditRobotWithLink) => {
      const res = await axios.put(`${SERVER_URL}/robots/${statusId}/${robotId}`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["robots", statusId] });
      setIsEditModalOpen(false);
      setIsAnyModalOpen(false);
      setIsFailed(false)
    },
    onError() {
      setIsFailed(true);
    },
  });
}