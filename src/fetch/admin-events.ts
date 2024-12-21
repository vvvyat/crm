import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EventData, SERVER_URL } from "../consts"

export function useAdminEventsQuery(adminId: number) {
    return useQuery<EventData[]>({
        queryKey: ['admin-events'],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events/admin/${adminId}`)
            return res.data
        }
    })
}