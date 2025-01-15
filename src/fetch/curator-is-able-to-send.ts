import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useCuratorIsAbleToSendQuery(eventId: number) {
    return useQuery({
        queryKey: ['curator-is-able-to-send', eventId, sessionStorage.getItem('id')],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/events-curators/${eventId}/curator-can-send/${sessionStorage.getItem('id')}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}