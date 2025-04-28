import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useHideEventMutation(
  eventId: number,
  setIsHideFaled: React.Dispatch<React.SetStateAction<boolean>>,
  setIsHideConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["hide-event", eventId],
    mutationFn: async () => {
      const res = await axios.put(
        `${SERVER_URL}/events/hide/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      setIsHideFaled(false);
      setIsHideConfirmOpen(false);
    },
    onError() {
      setIsHideFaled(true);
    },
  });
}
