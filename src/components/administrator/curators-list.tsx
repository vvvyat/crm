import React from "react";
import { Curator } from "../../consts";

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
            <p className="state">Приступил(а) к мероприятию</p>
        </section>
    )
})

export const CuratorsList: React.FC<{
    curators: Array<Curator>
}> = React.memo(({curators}) => {

    return (
        <div className="curators-container">
            <div className="curators-header">
                <p className="counter"></p>
                <p>Имя</p>
                <p>Telegram</p>
                <p>ВКонтакте</p>
                <p>Статус</p>
            </div>
            {curators.map((curator, index) => {
                return < CuratorsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
            })}
        </div>
    )
})

