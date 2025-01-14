import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { EditProfile, SERVER_URL } from "../consts"
import { UseFormReset } from "react-hook-form"

export function useUpdateUserInfoMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, reset: UseFormReset<EditProfile>) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-user-info'],
        mutationFn: async (payload: EditProfile) => {
            const res = await axios.put(`${SERVER_URL}/users/me`, payload, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
        onSuccess () {
            queryClient.invalidateQueries({queryKey: ['user-info']})
            reset()
        },
        onError () {
            setIsFailed(true)
        }
    })
}