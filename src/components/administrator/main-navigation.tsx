import React, { useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ExitCreateContext } from "./exit-create-context"

export const MainNavigation: React.FC = React.memo(() => {
    const page = useLocation().pathname
    const eventsListButtonRef = useRef<HTMLButtonElement>(null)
    const createEventButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const onEventsListButtonClick = () => {
            //console.log(isCreateFormEmpty)
            //if (!isCreateFormEmpty) {
                //const createForm = document.querySelector('.add-new-event-form')
                //if (createForm)    
                    //createForm.style.filter = 'blur(5px)'

                setIsModalOpen(true)
            //} else {
            //    navigate('/')
            //}
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
        <ExitCreateContext.Provider value={{isModalOpen}}>
            <nav>
                <button ref={eventsListButtonRef} className="events-button">Мероприятия</button>
                <button ref={createEventButtonRef} className="create-event-button">Создать<br/>мероприятие</button>
            </nav>
            <Outlet />
        </ExitCreateContext.Provider>
    )
})
