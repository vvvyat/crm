import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useDeleteStudentMutation(eventId: number, setIsDeleteFaled: React.Dispatch<React.SetStateAction<boolean>>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-student'],
        mutationFn: async () => {
            const res = await axios.delete(`${SERVER_URL}/events-students/${eventId}/delete/${sessionStorage.getItem('id')}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['students', eventId]})
            setIsDeleteFaled(false)
        },
        onError () {
            setIsDeleteFaled(true)
        }
    })
}