import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RequestData, SERVER_URL } from "../consts";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useSendRequestMutation(
  setIsSendFailed: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<FieldValues>
) {
  return useMutation({
    mutationKey: ["send-request"],
    mutationFn: async (payload: RequestData) => {
      const res = await axios.post(`${SERVER_URL}/applications`, payload);
      return res.data;
    },
    onSuccess() {
      setIsSendFailed(false);
      reset();
      setIsSuccessModalOpen(true);
    },
    onError() {
      setIsSendFailed(true);
    },
  });
}