import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, UpdateStatusOrder } from "../consts";

export function useUpdateStatusOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-status-order"],
    mutationFn: async ({statusId, payload}: UpdateStatusOrder) => {
      const res = await axios.put(
        `${SERVER_URL}/api/statuses/${statusId}`,
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
      queryClient.invalidateQueries({ queryKey: ["event-statuses"] });
    },
  });
}
