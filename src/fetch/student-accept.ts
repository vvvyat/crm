import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useStudentAcceptMutation(eventId: number, studentId: number/*, setIsFaled: React.Dispatch<React.SetStateAction<boolean>>*/) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['student-accept', eventId, studentId],
        mutationFn: async () => {
            const res = await axios.put(`${SERVER_URL}/events-students/${eventId}/accept/${studentId}`, {}, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            //setIsFaled(false)
            queryClient.invalidateQueries({queryKey: ['student-requests', eventId]})
        },
        /*onError () {
            setIsFaled(true)
        }*/
    })
}