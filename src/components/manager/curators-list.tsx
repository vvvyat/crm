import React, { useRef, useState } from "react";
import { Curator } from "../../consts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CuratorsListItem: React.FC<{
    counter: number,
    curator: Curator,
    curatorsRef: React.RefObject<HTMLDivElement>
}> = React.memo(({counter, curator, curatorsRef}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    return (
        <>
            <section className={isDeleted ? "hidden" : "curator manager-curator"} id={`${curator.curatorId}`}>
                <p className="counter">{counter}</p>
                <p className="name">{`${curator.surname} ${curator.firstName} ${curator.lastName}`}</p>
                <p className="telegram">{curator.telegramUrl}</p>
                <p className="vk">{curator.vkUrl}</p>
                <p className="state">{curator.curatorStatus}</p>
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
                    <p className="warning-text">Вы уверены, что хотите удалить<br/>{`${curator.surname} ${curator.firstName} ${curator.lastName}`}?</p>
                    <div className="warning-buttons">
                        <button className="edit-event-warning-confirm" onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:8080/events_curators/${curator.eventId}/delete/${curator.curatorId}`)
                                setIsDeleteConfirmOpen(false)
                                if (curatorsRef.current) {
                                    curatorsRef.current.classList.remove('modal-open')
                                }
                                setIsDeleted(true)
                            } catch {
                                console.log('Не удалить куратора с мероприятия')
                            }
                        }}>Да</button>
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
    const curatorsRef = useRef<HTMLDivElement>(null)

    const {data: curators, isLoading, error} = useQuery<Curator[]>({
        queryKey: ['curators'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_curators/${3}/curators`)
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
            <div ref={curatorsRef} className="curators-container">
                <div className="curators-header manager-curator-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Telegram</p>
                    <p>ВКонтакте</p>
                    <p>Статус</p>
                </div>
                {curators?.map((curator, index) => {
                    return < CuratorsListItem key={curator.curatorId} counter={index + 1} curator={curator} curatorsRef={curatorsRef}/>
                })}
            </div>
        )
    }
})

