import React, { useEffect, useRef } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const MainNavigation: React.FC = React.memo(() => {
    const page = useLocation().pathname
    const eventsListButtonRef = useRef<HTMLButtonElement>(null)
    const createEventButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onEventsListButtonClick = () => {
            navigate('/')
        }

        const onCreateEventButtonClick = () => {
            navigate('/create')
        }

        eventsListButtonRef.current?.addEventListener('click', onEventsListButtonClick)
        createEventButtonRef.current?.addEventListener('click', onCreateEventButtonClick)
    }, [])

    useEffect(() => {
        if (page === '/' && eventsListButtonRef.current && createEventButtonRef.current) {
            eventsListButtonRef.current.style.backgroundColor = '#dedab4'
            createEventButtonRef.current.style.backgroundColor = '#c7bf9e'
        } else if (page === '/create' && createEventButtonRef.current && eventsListButtonRef.current) {
            createEventButtonRef.current.style.backgroundColor = '#dedab4'
            eventsListButtonRef.current.style.backgroundColor = '#c7bf9e'
        }
    }, [page])

    return (
        <>
            <nav>
                <button ref={eventsListButtonRef} className="events-button">Мероприятия</button>
                <button ref={createEventButtonRef} className="create-event-button">Создать<br/>мероприятие</button>
            </nav>
            <Outlet />
        </>
    )
})
