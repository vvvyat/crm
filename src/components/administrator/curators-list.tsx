import React from "react";
import { Curator } from "../../consts";
import { EventNavigation } from "./event-navigation";

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
            </main>
        </>
    )
})

