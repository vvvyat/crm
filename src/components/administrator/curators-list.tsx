import React from "react";
import { Curator, EventStatus } from "../../consts";
import { useCuratorsQuery } from "../../fetch/curators";
import { useParams } from "react-router-dom";
import { FormatName, GetStudentCuratorStatus} from "../../utils";
import { useEventQuery } from "../../fetch/event";
import { useStartedCuratorsQuery } from "../../fetch/started-curators";

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
    const {data: event} = useEventQuery(Number(params.id))
    const {data: curatorsAccepted, isLoading: acceptedLoading, isError: acceptedError} = useCuratorsQuery(Number(params.id))
    const {data: curatorsStarted, isLoading: startedLoading, isError: startedError} = useStartedCuratorsQuery(Number(params.id))
        
    if (event?.condition === EventStatus.RegistrationIsOpen && acceptedLoading || startedLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && acceptedError || startedError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && curatorsAccepted && curatorsAccepted.length === 0 || curatorsStarted && curatorsStarted.length === 0) {
        return <p className="fetch-warnings">Кураторов нет</p>
    } else {
        return (
            <div className="curators-container">
                <div className="curators-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Telegram</p>
                    <p>ВКонтакте</p>
                    <p>Статус</p>
                </div>
                {event?.condition === EventStatus.RegistrationIsOpen ?
                    curatorsAccepted?.map((curator, index) => {
                        return < CuratorsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
                    }) :
                    curatorsStarted?.map((curator, index) => {
                        return < CuratorsListItem key={curator.curatorId} counter={index + 1} curator={curator} />
                    })
                }
            </div>
        )
    }
})

