import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { RegistrationPayload, SERVER_URL } from "../consts"

export function useRegistrationMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>) {
    return useMutation({
        mutationKey: ['registration'],
        mutationFn: async (payload: RegistrationPayload) => {
            const res = await axios.post(`${SERVER_URL}/auth/register`, payload)
            return res.data
        },
        onSuccess () {
            setIsSuccess(true)
        },
        onError () {
            setIsFailed(true)
        }
    })
}