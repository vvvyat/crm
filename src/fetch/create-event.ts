import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Inputs, CreateUpdateEvent, SERVER_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import { UseFormReset } from "react-hook-form";

export function useNewEventMutation(
  setIsCreateFailed: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<Inputs>
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-event"],
    mutationFn: async (payload: CreateUpdateEvent) => {
      const res = await axios.post(`${SERVER_URL}/events/post`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      reset();
      navigate("/admin/events");
    },
    onError() {
      setIsCreateFailed(true);
    },
  });
}
