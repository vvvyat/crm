import React from "react";
import { Curator } from "../../consts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CuratorsListItem: React.FC<{
    counter: number,
    curator: Curator
}> = React.memo(({counter, curator}) => {
    return (
        <section className="curator" id={`${curator.curatorId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${curator.surname} ${curator.firstName} ${curator.lastName}`}</p>
            <p className="telegram">{curator.telegramUrl}</p>
            <p className="vk">{curator.vkUrl}</p>
            <p className="state">{curator.curatorStatus}</p>
        </section>
    )
})

export const CuratorsList: React.FC = React.memo(() => {
    const {data: curators, isLoading, error} = useQuery<Curator[]>({
        queryKey: ['curators'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_curators/${1}/curators`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (curators && curators.length === 0) {
        return <p className="fetch-warnings">Кураторов нет</p>
    }else {
        return (
            <div className="curators-container">
                <div className="curators-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Telegram</p>
                    <p>ВКонтакте</p>
                    <p>Статус</p>
                </div>
                {curators?.map((curator, index) => {
                    return < CuratorsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
                })}
            </div>
        )
    }
})

