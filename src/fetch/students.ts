import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Student, SERVER_URL } from "../consts"

export function useStudentsQuery(eventId: number) {
    return useQuery<Student[]>({
        queryKey: ['students', eventId],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events-curators/${eventId}/accepted-curators`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}