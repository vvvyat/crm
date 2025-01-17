import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { AuthorizationInputs, SERVER_URL } from "../consts"


export function useAuthorizationMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, setUser: React.Dispatch<React.SetStateAction<boolean>>) {
    return useMutation({
        mutationKey: ['authorization'],
        mutationFn: async (payload: AuthorizationInputs) => {
            const res = await axios.post(`${SERVER_URL}/auth/login`, payload)
            return res.data
        },
        onSuccess: (response) => {
            sessionStorage.setItem('token', response.access)
            setUser(true)
        },
        onError () {
            setIsFailed(true)
        }
    })
}