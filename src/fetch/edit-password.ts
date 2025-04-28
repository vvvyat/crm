import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PasswordInputs, SERVER_URL } from "../consts";
import { UseFormReset } from "react-hook-form";

export function useEditPasswordMutation(
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<PasswordInputs>
) {
  return useMutation({
    mutationKey: ["edit-password"],
    mutationFn: async (payload: PasswordInputs) => {
      const res = await axios.post(
        `${SERVER_URL}/users/update-password`,
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
