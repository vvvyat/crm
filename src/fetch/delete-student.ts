import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useDeleteStudentMutation(eventId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-student'],
        mutationFn: async (studentId: number) => {
            const res = await axios.delete(`${SERVER_URL}/events-students/${eventId}/delete/${studentId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['students', eventId]})
        }
    })
}