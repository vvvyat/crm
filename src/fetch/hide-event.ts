import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"

export function useHideEventMutation(eventId: number, setIsHideFaled: React.Dispatch<React.SetStateAction<boolean>>,
    setIsHideConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    return useMutation({
        mutationKey: ['hide-event'],
        mutationFn: async () => {
            const res = await axios.put(`${SERVER_URL}/events/hide/${eventId}`)
            return res.data
        },
        onSuccess () {
            setIsHideFaled(false)
            setIsHideConfirmOpen(false)
        },
        onError () {
            setIsHideFaled(true)
        }
    })
}