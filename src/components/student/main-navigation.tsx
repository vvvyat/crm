import React, { useEffect, useRef } from "react"
import { useMatch, useNavigate } from "react-router-dom"

export const MainNavigation: React.FC = React.memo(() => {
    const {page} = useMatch('/:page')?.params || {}
    
    const eventsListButtonRef = useRef<HTMLButtonElement>(null)
    const myEventsButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onEventsListButtonClick = () => {
            navigate('/')
        }

        const onMyEventsButtonClick = () => {
            navigate('/myEvents')
        }

        eventsListButtonRef.current?.addEventListener('click', onEventsListButtonClick)
        myEventsButtonRef.current?.addEventListener('click', onMyEventsButtonClick)
    }, [])

    useEffect(() => {
        if ((page === undefined || page === 'eventInfo') && eventsListButtonRef.current) {
            eventsListButtonRef.current.style.backgroundColor = '#dedab4'
        } else if ((page === 'myEvents' || page === 'myEventInfo') && myEventsButtonRef.current) {
            myEventsButtonRef.current.style.backgroundColor = '#dedab4'
        }
    }, [page])

    return (
        <nav>
            <button ref={eventsListButtonRef} className="events-button">Мероприятия</button>
            <button ref={myEventsButtonRef} className="create-event-button">Мои<br/>мероприятия</button>
        </nav>
    )
})
