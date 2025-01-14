import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"
import { useNavigate } from "react-router-dom"

export function useDeleteEventMutation(eventId: number, setIsDeleteFaled: React.Dispatch<React.SetStateAction<boolean>>) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-event'],
        mutationFn: async () => {
            const res = await axios.delete(`${SERVER_URL}/events/delete/${eventId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['admin-events']})
            setIsDeleteFaled(false)
            navigate('/admin/events')
        },
        onError () {
            setIsDeleteFaled(true)
        }
    })
}