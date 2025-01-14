import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EventData, SERVER_URL } from "../consts"

export function useEventQuery(eventId: number) {
    return useQuery<EventData>({
        queryKey: ['event', eventId],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events/${eventId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}