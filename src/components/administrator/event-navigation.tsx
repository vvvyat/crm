import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    const page = useLocation().pathname
    const infoButtonRef = useRef<HTMLButtonElement>(null)
    const curatorsButtonRef = useRef<HTMLButtonElement>(null)
    const studentsButtonRef = useRef<HTMLButtonElement>(null)
    const settingsButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onInfoButtonClick = () => {
            navigate('/event/id/info')
        }

        const onCuratorsButtonClick = () => {
            navigate('/event/id/curators')
        }

        const onStudentsButtonClick = () => {
            navigate('/event/id/students')
        }

        const onSettiongsButtonClick = () => {
            navigate('/event/id/settings')
        }

        infoButtonRef.current?.addEventListener('click', onInfoButtonClick)
        curatorsButtonRef.current?.addEventListener('click', onCuratorsButtonClick)
        studentsButtonRef.current?.addEventListener('click', onStudentsButtonClick)
        settingsButtonRef.current?.addEventListener('click', onSettiongsButtonClick)
    }, [])

    useEffect(() => {
        if (page === '/event/id/info' && infoButtonRef.current && curatorsButtonRef.current
            && studentsButtonRef.current && settingsButtonRef.current) {
            infoButtonRef.current.style.backgroundColor = '#dedab4'
            curatorsButtonRef.current.style.backgroundColor = '#c7bf9e'
            studentsButtonRef.current.style.backgroundColor = '#c7bf9e'
            settingsButtonRef.current.style.backgroundColor = '#c7bf9e'
        } else if (page === '/event/id/curators' && curatorsButtonRef.current
            && studentsButtonRef.current && settingsButtonRef.current && infoButtonRef.current) {
            curatorsButtonRef.current.style.backgroundColor = '#dedab4'
            studentsButtonRef.current.style.backgroundColor = '#c7bf9e'
            settingsButtonRef.current.style.backgroundColor = '#c7bf9e'
            infoButtonRef.current.style.backgroundColor = '#c7bf9e'
        } else if (page === '/event/id/students' && studentsButtonRef.current
            && curatorsButtonRef.current && settingsButtonRef.current && infoButtonRef.current) {
            studentsButtonRef.current.style.backgroundColor = '#dedab4'
            curatorsButtonRef.current.style.backgroundColor = '#c7bf9e'
            settingsButtonRef.current.style.backgroundColor = '#c7bf9e'
            infoButtonRef.current.style.backgroundColor = '#c7bf9e'
        } else if (page === '/event/id/settings' && settingsButtonRef.current
            && curatorsButtonRef.current && studentsButtonRef.current && infoButtonRef.current) {
            settingsButtonRef.current.style.backgroundColor = '#dedab4'
            curatorsButtonRef.current.style.backgroundColor = '#c7bf9e'
            studentsButtonRef.current.style.backgroundColor = '#c7bf9e'
            infoButtonRef.current.style.backgroundColor = '#c7bf9e'
        }
    }, [page])

    return (
        <>
            <nav>
                <button ref={infoButtonRef} className="info">Описание<br/>мероприятия</button>
                <button ref={curatorsButtonRef} className="curators">Список кураторов</button>
                <button ref={studentsButtonRef} className="students">Список студентов</button>
                <button ref={settingsButtonRef} className="settings">Настройки</button>
            </nav>
            <Outlet/>
        </>
    )
})

