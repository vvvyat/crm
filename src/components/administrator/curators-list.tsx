import React from "react";
import { Curator } from "../../consts";
import { useCuratorsQuery } from "../../fetch/curators";
import { useParams } from "react-router-dom";
import { FormatName, GetStudentCuratorStatus} from "../../utils";

const CuratorsListItem: React.FC<{
    counter: number,
    curator: Curator
}> = React.memo(({counter, curator}) => {
    return (
        <section className="curator" id={`${curator.curatorId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{FormatName(curator)}</p>
            <p className="telegram">{curator.telegramUrl}</p>
            <p className="vk">{curator.vkUrl}</p>
            <p className="state">{GetStudentCuratorStatus(curator.curatorStatus)}</p>
        </section>
    )
})

export const CuratorsList: React.FC = React.memo(() => {
    const params = useParams()
    const {data: curators, isLoading, isError} = useCuratorsQuery(Number(params.id))

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
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

