import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Curator, SERVER_URL } from "../consts"

export function useCuratorsQuery(eventId: number) {
    return useQuery<Curator[]>({
        queryKey: ['curators'],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/events_curators/${eventId}/curators`)
            return res.data
        }
    })
}