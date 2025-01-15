import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useCuratorAcceptMutation(eventId: number, curatorId: number/*, setIsFaled: React.Dispatch<React.SetStateAction<boolean>>*/) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['curator-accept', eventId, curatorId],
        mutationFn: async () => {
            const res = await axios.put(`${SERVER_URL}/events-curators/${eventId}/accept/${curatorId}`, {}, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            //setIsFaled(false)
            queryClient.invalidateQueries({queryKey: ['curator-requests', eventId]})
        },
        /*onError () {
            setIsFaled(true)
        }*/
    })
}