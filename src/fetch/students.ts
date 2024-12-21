import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Student, SERVER_URL } from "../consts"

export function useStudentsQuery(eventId: number) {
    return useQuery<Student[]>({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events_students/${eventId}/students`)
            return res.data
        }
    })
}