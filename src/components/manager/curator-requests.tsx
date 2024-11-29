import React from "react";
import { Curator } from "../../consts";
import { EventNavigation } from "./event-navigation";

const CuratorRequestsListItem: React.FC<{
    counter: number,
    curator: Curator
}> = React.memo(({counter, curator}) => {
    return (
        <section className="curator-requests" id={`${curator.curatorId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${curator.surname} ${curator.firstName} ${curator.lastName}`}</p>
            <p className="skills">Наблюдательность, Принятие инициативы, Принятие решений, Планирование и организация, Работа под давлением</p>
            <button className="accept">Принять</button>
            <button className="reject">Отклонить</button>
        </section>
    )
})

export const CuratorRequestsList: React.FC<{
    curators: Array<Curator>
}> = React.memo(({curators}) => {

    return (
        <>
            <header>
                <a className="logo">CRM</a>
                <form className="search-form">
                    <label className="search-lable">Поиск</label>
                    <input className="search" type="text" name="search"/>
                </form>
                <div className="profile-button">
                    <img src="img/profile-icon.svg" width="37" height="37"/>
                    <p>Имя пользователя</p>
                </div>
                <img src="img/logout.svg" height="30.83" width="37"/>
            </header>
            <main>
                <EventNavigation />
                <div className="curators-container">
                    <div className="curator-requests-header">
                        <p className="counter"></p>
                        <p>Имя</p>
                        <p>Компетенции</p>
                    </div>
                    {curators.map((curator, index) => {
                        return < CuratorRequestsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
                    })}
                </div>
            </main>
        </>
    )
})

