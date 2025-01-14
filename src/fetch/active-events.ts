import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EventData, SERVER_URL } from "../consts"

export function useActiveEventsQuery() {
    return useQuery<EventData[]>({
        queryKey: ['active-events'],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events/active`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}