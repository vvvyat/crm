import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Message, SERVER_URL } from "../consts"

export function useMessagesQuery(eventId: number) {
    return useQuery<Message[]>({
        queryKey: ['messages', eventId],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/messages/event/${eventId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}