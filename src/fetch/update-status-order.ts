import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, UpdateStatusOrder } from "../consts";

export function useUpdateStatusOrderMutation(eventId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-status-order"],
    mutationFn: async (payload: UpdateStatusOrder) => {
      const res = await axios.put(
        `${SERVER_URL}/events/${eventId}/statuses/reorder`,
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
      queryClient.invalidateQueries({ queryKey: ["event-statuses", eventId] });
    },
  });
}
