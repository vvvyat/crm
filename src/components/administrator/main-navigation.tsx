import React, { useEffect, useRef } from "react"
import { useMatch, useNavigate } from "react-router-dom"

export const MainNavigation: React.FC<{
    changeIsConfirmOpen: () => void;
    createFormRef: React.RefObject<HTMLFormElement>;
}> = React.memo(({
    changeIsConfirmOpen,
    createFormRef
}) => {
    const {page} = useMatch('/:page')?.params || {}
    const eventsListButtonRef = useRef<HTMLButtonElement>(null)
    const createEventButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        console.log('эффект')
        const onEventsListButtonClick = () => {
            /*changeIsConfirmOpen()
            const confirmButton = document.querySelector('.create-event-warning-confirm')
            const cancelButton = document.querySelector('.create-event-warning-cancel')
            console.log(confirmButton)
            console.log(cancelButton)
            if (createFormRef.current) {
                createFormRef.current.style.filter = 'blur(5px)'
            }
            confirmButton?.addEventListener('click', () => {
                console.log('click')
                navigate('/')
            })
            cancelButton?.addEventListener('click', () => {
                createFormRef.current?.style.removeProperty('filter')
                changeIsConfirmOpen()
                console.log('click')
            })*/
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
