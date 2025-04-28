import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Student, SERVER_URL } from "../consts";

export function useStartedStudentsGroupQuery(eventId: number) {
  return useQuery<Student[]>({
    queryKey: ["started-students-group", eventId],
    queryFn: async () => {
      const res = await axios.get(
        `${SERVER_URL}/events-students/${eventId}/started-students-group`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    },
  });
}
