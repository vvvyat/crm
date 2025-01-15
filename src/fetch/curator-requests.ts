import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Curator, SERVER_URL } from "../consts"

export function useCuratorRequestsQuery(eventId: number) {
    return useQuery<Curator[]>({
        queryKey: ['curator-requests', eventId],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events-curators/${eventId}/waiting-curators`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}