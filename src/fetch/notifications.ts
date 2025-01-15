import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Notification, SERVER_URL } from "../consts"

export function useNotificationsQuery() {
    return useQuery<Notification[]>({
        queryKey: ['notifications', sessionStorage.getItem('token')],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/notifications/my`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        refetchInterval: 120 * 1000
    })
}
