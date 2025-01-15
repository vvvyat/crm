import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useCuratorSendMutation(eventId: number, setIsFaled: React.Dispatch<React.SetStateAction<boolean>>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['curator-send', eventId, sessionStorage.getItem('id')],
        mutationFn: async () => {
            const res = await axios.put(`${SERVER_URL}/events-curators/${eventId}/send/${sessionStorage.getItem('id')}`, {}, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            setIsFaled(false)
            queryClient.invalidateQueries({queryKey: ['curator-is-able-to-send', eventId, sessionStorage.getItem('id')]})
        },
        onError () {
            setIsFaled(true)
        }
    })
}