import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UserInfo, SERVER_URL } from "../consts"

export function useUserInfoQuery() {
    return useQuery<UserInfo>({
        queryKey: ['user-info', sessionStorage.getItem('token')],
        queryFn: async () => {
            const res = await axios.get(`${SERVER_URL}/users/me`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        },
    })
}
