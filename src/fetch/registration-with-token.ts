import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ManagerRegistrationPayload, SERVER_URL } from "../consts"
import { useParams } from "react-router-dom"

export function useRegistrationWithTokenMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>) {
    const params = useParams()
    return useMutation({
        mutationKey: ['registration-with-token'],
        mutationFn: async (payload: ManagerRegistrationPayload) => {
            const res = await axios.post(`${SERVER_URL}/auth/register-with-token?token=${params.token}`, payload)
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