import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useIsAbleToSendQuery(eventId: number) {
    return useQuery({
        queryKey: ['student-is-able-to-send', eventId, sessionStorage.getItem('id')],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events-students/${eventId}/student-can-send/${sessionStorage.getItem('id')}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}