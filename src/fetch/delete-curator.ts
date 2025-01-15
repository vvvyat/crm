import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useDeleteCuratorMutation(eventId: number, setIsDeleteFaled: React.Dispatch<React.SetStateAction<boolean>>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-curator'],
        mutationFn: async (curatorId: number) => {
            const res = await axios.delete(`${SERVER_URL}/events-curators/${eventId}/delete/${curatorId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['curators', eventId]})
            setIsDeleteFaled(false)
        },
        onError () {
            setIsDeleteFaled(true)
        }
    })
}