import React from "react";
import { Curator } from "../../consts";
import { useCuratorRequestsQuery } from "../../fetch/curator-requests";
import { useParams } from "react-router-dom";
import { FormatName } from "../../utils";
import { useCuratorAcceptMutation } from "../../fetch/curator-accept";
import { useCuratorRejectMutation } from "../../fetch/curator-reject";

const CuratorRequestsListItem: React.FC<{
    counter: number,
    eventId: number,
    curator: Curator
}> = React.memo(({counter, eventId, curator}) => {
    const {mutateAsync: accept} = useCuratorAcceptMutation(eventId, curator.curatorId)
    const {mutateAsync: reject} = useCuratorRejectMutation(eventId, curator.curatorId)

    return (
        <section className='curator-requests' id={`${curator.curatorId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{FormatName(curator)}</p>
            <p className="skills">{curator.competencies}</p>
            <button onClick={() => accept()} className="accept">Принять</button>
            <button onClick={() => reject()} className="reject">Отклонить</button>
        </section>
    )
})

export const CuratorRequestsList: React.FC = React.memo(() => {
    const params = useParams()
    const {data: curatorRequsets, isLoading, isError} = useCuratorRequestsQuery(Number(params.id))
    
    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (curatorRequsets && curatorRequsets.length === 0) {
        return <p className="fetch-warnings">Заявок на кураторство нет</p>
    }else if (curatorRequsets) {
        return (
            <div className="curators-container">
                <div className="curator-requests-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                </div>
                {curatorRequsets.map((curator, index) => {
                    return < CuratorRequestsListItem key={curator.curatorId} counter={index + 1} eventId={Number(params.id)} curator={curator} />
                })}
            </div>
        )
    }
})

