import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Curator, SERVER_URL } from "../consts"

export function useStartedCuratorsQuery(eventId: number) {
    return useQuery<Curator[]>({
        queryKey: ['started-curators', eventId],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events-curators/${eventId}/started-curators`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}