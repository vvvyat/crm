import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EventData, SERVER_URL } from "../consts"

export function useEventQuery(eventId: number) {
    return useQuery<EventData>({
        queryKey: ['event'],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events/${eventId}`)
            return res.data
        }
    })
}