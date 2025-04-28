import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthorizationInputs, SERVER_URL } from "../consts";
import { useNavigate } from "react-router-dom";

export function useAuthorizationMutation(
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>
) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["authorization"],
    mutationFn: async (payload: AuthorizationInputs) => {
      const res = await axios.post(`${SERVER_URL}/auth/login`, payload);
      return res.data;
    },
    onSuccess: (response) => {
      sessionStorage.setItem("token", response.access);
      sessionStorage.setItem("role", "admin");
      navigate("/admin/events");
    },
    onError() {
      setIsFailed(true);
    },
  });
}
