import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../consts"


export function useInviteManagerMutation(setReferalToken: React.Dispatch<React.SetStateAction<string | undefined>>) {
    return useMutation({
        mutationKey: ['invite-manager'],
        mutationFn: async () => {
            const res = await axios.post(`${SERVER_URL}/users/invite-manager`, {}, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess: (response) => {
            setReferalToken(response.referralToken)
        }
    })
}