import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UserInfo, SERVER_URL } from "../consts"

export function useUserInfoByIdQuery(userId: number) {
    return useQuery<UserInfo>({
        queryKey: ['user-info-by-id', userId],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/users/${userId}`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
    })
}
