import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../consts";

export function useStudentSendMutation(
  eventId: number,
  setIsFaled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student-send", eventId, sessionStorage.getItem("id")],
    mutationFn: async () => {
      const res = await axios.put(
        `${SERVER_URL}/events-students/${eventId}/send/${sessionStorage.getItem(
          "id"
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess() {
      setIsFaled(false);
      queryClient.invalidateQueries({
        queryKey: [
          "student-is-able-to-send",
          eventId,
          sessionStorage.getItem("id"),
        ],
      });
    },
    onError() {
      setIsFaled(true);
    },
  });
}
