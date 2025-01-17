import React, { useRef, useState } from "react";
import { Curator, EventStatus } from "../../consts";
import { useCuratorsQuery } from "../../fetch/curators";
import { useParams } from "react-router-dom";
import { FormatName, GetStudentCuratorStatus } from "../../utils";
import { useDeleteCuratorMutation } from "../../fetch/delete-curator";
import { useStartedCuratorsQuery } from "../../fetch/started-curators";
import { useEventQuery } from "../../fetch/event";

const CuratorsListItem: React.FC<{
    counter: number,
    eventId: number,
    curator: Curator,
    curatorsRef: React.RefObject<HTMLDivElement>
}> = React.memo(({counter, eventId, curator, curatorsRef}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const {mutateAsync: deleteCurator} = useDeleteCuratorMutation(eventId)

    return (
        <>
            <section className="curator manager-curator" id={`${curator.curatorId}`}>
                <p className="counter">{counter}</p>
                <p className="name">{FormatName(curator)}</p>
                <p className="telegram">{curator.telegramUrl}</p>
                <p className="vk">{curator.vkUrl}</p>
                <p className="state">{GetStudentCuratorStatus(curator.curatorStatus)}</p>
                <button className="delete-curator" disabled={isDeleteConfirmOpen} onClick={(evt) => {
                    evt.preventDefault()
                    if (curatorsRef.current) {
                        curatorsRef.current.classList.add('modal-open')
                    }
                    setIsDeleteConfirmOpen(true)
                }}>Удалить</button>
            </section>

            {isDeleteConfirmOpen && (
                <div className="warning-modal">
                    <p className="warning-text">Вы уверены, что хотите удалить<br/>{FormatName(curator)}?</p>
                    <div className="warning-buttons">
                        <button className="edit-event-warning-confirm" onClick={() => deleteCurator(curator.curatorId)}>Да</button>
                        <button className="edit-event-warning-cancel" onClick={(evt) => {
                            evt.preventDefault()
                            setIsDeleteConfirmOpen(false)
                            if (curatorsRef.current) {
                                curatorsRef.current.classList.remove('modal-open')
                            }
                        }}>Отмена</button>
                    </div>
                </div>
            )}
        </>
    )
})

export const CuratorsList: React.FC = React.memo(() => {
    const params = useParams()
    const curatorsRef = useRef<HTMLDivElement>(null)
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
            <div ref={curatorsRef} className="curators-container">
                <div className="curators-header manager-curator-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Telegram</p>
                    <p>ВКонтакте</p>
                    <p>Статус</p>
                </div>
                {event?.condition === EventStatus.RegistrationIsOpen ?
                    curatorsAccepted?.map((curator, index) => {
                        return <CuratorsListItem key={curator.curatorId} counter={index + 1} eventId={Number(params.id)} curator={curator} curatorsRef={curatorsRef}/>
                    }) :
                    curatorsStarted?.map((curator, index) => {
                        return <CuratorsListItem key={curator.curatorId} counter={index + 1} eventId={Number(params.id)} curator={curator} curatorsRef={curatorsRef}/>
                    })
                }
            </div>
        )
    }
})