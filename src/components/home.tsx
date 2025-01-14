import React, { useEffect } from "react";
import { useUserInfoQuery } from "../fetch/user-info";
import { GetRole } from "../utils";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = React.memo(() => {    
    const {data: userInfo, isLoading, isError} = useUserInfoQuery()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && userInfo) {
            const role = GetRole(userInfo.role_enum);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('id', String(userInfo.id))
            navigate(`/${role}/events`);
        }
    }, [isLoading, userInfo, navigate]); 

    if (isLoading) {
        return <p className="not-found-message">Загрузка...</p>
    } else if (isError) {
        return <p className="not-found-message">При загрузке произошла ошибка</p>
    }

    return <></>
})
