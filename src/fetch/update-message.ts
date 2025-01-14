import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { UpdateMessage, SERVER_URL, MessagesInputs } from "../consts"
import { UseFormReset } from "react-hook-form"

export function useUpdateMessageMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, reset: UseFormReset<MessagesInputs>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-message'],
        mutationFn: async (payload: UpdateMessage) => {
            const res = await axios.put(`${SERVER_URL}/messages/update-message`, payload, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['messages', response.eventId]})
            reset()
        },
        onError () {
            setIsFailed(true)
        }
    })
}