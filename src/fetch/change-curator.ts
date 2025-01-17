import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useCuratorChangeMutation(eventId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['curator-change', eventId],
        mutationFn: async ({ studentId, newCuratorId }: { studentId: number, newCuratorId: number }) => {
            const res = await axios.put(`${SERVER_URL}/events-students/change-curator/${eventId}/students/${studentId}/curator/{newCuratorId}?newCuratorId=${newCuratorId}`, {}, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['started-students', eventId]})
        }
    })
}