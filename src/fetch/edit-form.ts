import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL, CreateUpdateForm, CreateFormInputs } from "../consts";
import { useNavigate, useParams } from "react-router-dom";
import { UseFormReset } from "react-hook-form";

export function useEditFormMutation(
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<CreateFormInputs>
) {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-form"],
    mutationFn: async (payload: CreateUpdateForm) => {
      const res = await axios.post(`${SERVER_URL}/forms`, payload, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      reset();
      navigate(`/admin/event/${params.id}/student-data-forms`);
    },
    onError() {
      setIsFailed(true);
    },
  });
}