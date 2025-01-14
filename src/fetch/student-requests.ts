import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL, Student } from "../consts"

export function useStudentRequestsQuery(eventId: number) {
    return useQuery<Student[]>({
        queryKey: ['student-requests', eventId],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events-students/${eventId}/waiting-students`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}