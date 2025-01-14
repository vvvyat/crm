import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Manager, SERVER_URL } from "../consts"

export function useAllManagersQuery() {
    return useQuery<Manager[]>({
        queryKey: ['all-managers'],
        queryFn: async () => {
            const res = await axios.get(`${ SERVER_URL}/users/all-managers`, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            return res.data
        }
    })
}