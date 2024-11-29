import React, { useEffect, useRef } from "react"
import { useMatch, useNavigate } from "react-router-dom"

export const MainNavigation: React.FC = React.memo(() => {
    const {page} = useMatch('/:page')?.params || {}
    const eventsListButtonRef = useRef<HTMLButtonElement>(null)
    const createEventButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onEventsListButtonClick = () => {
            navigate('/')
        }

        const onCreateEventButtonClick = () => {
            navigate('/create-event')
        }

        eventsListButtonRef.current?.addEventListener('click', onEventsListButtonClick)
        createEventButtonRef.current?.addEventListener('click', onCreateEventButtonClick)
    }, [])

    useEffect(() => {
        if (page === undefined && eventsListButtonRef.current) {
            eventsListButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'create-event' && createEventButtonRef.current) {
            createEventButtonRef.current.style.backgroundColor = '#dedab4'
        }
    }, [page])

    return (
        <nav>
            <button ref={eventsListButtonRef} className="events-button">Мероприятия</button>
            <button ref={createEventButtonRef} className="create-event-button">Создать<br/>мероприятие</button>
        </nav>
    )
})
