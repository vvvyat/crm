import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreateStatusFormInputs, CreateUpdateStatus, SERVER_URL } from "../consts";
import { UseFormReset } from "react-hook-form";

export function useUpdateStatusMutation(
  statusId: number,
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<CreateStatusFormInputs>,
  setIsEditFaled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-status"],
    mutationFn: async (payload: CreateUpdateStatus) => {
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
      reset();
      setIsEditModalOpen(false);
      setIsAnyModalOpen(false);
    },
    onError() {
      setIsEditFaled(true);
    },
  });
}
