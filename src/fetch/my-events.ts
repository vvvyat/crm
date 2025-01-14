import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EventData, SERVER_URL } from "../consts"

export function useMyEventsQuery() {    
    return useQuery<EventData[]>({
        queryKey: ['my-events'],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events/my`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}