import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RequestData, SERVER_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useSendRequestMutation(
  setIsSendFailed: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<FieldValues>
) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["send-request"],
    mutationFn: async (payload: RequestData) => {
      const res = await axios.post(`${SERVER_URL}/applications`, payload);
      return res.data;
    },
    onSuccess() {
      reset();
      navigate("/");
    },
    onError() {
      setIsSendFailed(true);
    },
  });
}