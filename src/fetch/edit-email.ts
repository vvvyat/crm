import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { EmailInputs, SERVER_URL } from "../consts";
import { UseFormReset } from "react-hook-form";

export function useEditEmailMutation(
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<EmailInputs>
) {
  return useMutation({
    mutationKey: ["edit-email"],
    mutationFn: async (payload: EmailInputs) => {
      const res = await axios.post(
        `${SERVER_URL}/users/update-email`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (response) => {
      setIsFailed(false);
      sessionStorage.setItem("token", response.access);
      reset();
    },
    onError() {
      setIsFailed(true);
    },
  });
}
