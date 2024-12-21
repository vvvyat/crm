import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CreateUpdateEvent, SERVER_URL } from "../consts"

export function useUpdateEventMutation(eventId: number, setIsEditFaled: React.Dispatch<React.SetStateAction<boolean>>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-event'],
        mutationFn: async (payload: CreateUpdateEvent) => {
            const res = await axios.put(`${SERVER_URL}/events/update/${eventId}`, payload)
            return res.data
        },
        onSuccess () {
            setIsEditFaled(false)
            queryClient.invalidateQueries({queryKey: ['event']})
        },
        onError () {
            setIsEditFaled(true)
        }
    })
}