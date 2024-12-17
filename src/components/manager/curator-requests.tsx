import React, { useState } from "react";
import { Curator } from "../../consts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CuratorRequestsListItem: React.FC<{
    counter: number,
    curator: Curator
}> = React.memo(({counter, curator}) => {
    const [aceptedOrRejected, setAceptedOrRejected] = useState(false)
    
    return (
        <section className={aceptedOrRejected ? 'curator-requests hidden' : 'curator-requests'} id={`${curator.curatorId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${curator.surname} ${curator.firstName} ${curator.lastName}`}</p>
            <p className="skills">Наблюдательность, Принятие инициативы, Принятие решений, Планирование и организация, Работа под давлением</p>
            <button onClick={async () => {
                try {
                    await axios.put(`http://localhost:8080/events_curators/${3}}/accept/${curator.curatorId}`)
                    setAceptedOrRejected(true)
                } catch {
                    console.log('Не удалось принять заявку куратора')
                }
            }} className="accept">Принять</button>
            <button onClick={async () => {
                try {
                    await axios.put(`http://localhost:8080/events_curators/${3}/reject/${curator.curatorId}`)
                    setAceptedOrRejected(true)
                } catch {
                    console.log('Не удалось отклонить заявку куратора')
                }
            }} className="reject">Отклонить</button>
        </section>
    )
})

export const CuratorRequestsList: React.FC = React.memo(() => {
    const {data: curatorRequsets, isLoading, error} = useQuery<Curator[]>({
        queryKey: ['curator-requsets'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_curators/${3}/waiting_curators`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (curatorRequsets && curatorRequsets.length === 0) {
        return <p className="fetch-warnings">Заявок на кураторство нет</p>
    }else {
        return (
            <div className="curators-container">
                <div className="curator-requests-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                </div>
                {curatorRequsets?.map((curator, index) => {
                    return < CuratorRequestsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
                })}
            </div>
        )
    }
})

