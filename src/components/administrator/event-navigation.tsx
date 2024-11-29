import React, { useEffect, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    const {page} = useMatch('/:page')?.params || {}
    const infoButtonRef = useRef<HTMLButtonElement>(null)
    const curatorsButtonRef = useRef<HTMLButtonElement>(null)
    const studentsButtonRef = useRef<HTMLButtonElement>(null)
    const settingsButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onInfoButtonClick = () => {
            navigate('/event-info')
        }

        const onCuratorsButtonClick = () => {
            navigate('/curators')
        }

        const onStudentsButtonClick = () => {
            navigate('/students')
        }

        const onSettiongsButtonClick = () => {
            navigate('/settings')
        }

        infoButtonRef.current?.addEventListener('click', onInfoButtonClick)
        curatorsButtonRef.current?.addEventListener('click', onCuratorsButtonClick)
        studentsButtonRef.current?.addEventListener('click', onStudentsButtonClick)
        settingsButtonRef.current?.addEventListener('click', onSettiongsButtonClick)
    }, [])

    useEffect(() => {
        if (page === 'event-info' && infoButtonRef.current) {
            infoButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'curators' && curatorsButtonRef.current) {
            curatorsButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'students' && studentsButtonRef.current) {
            studentsButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'settings' && settingsButtonRef.current) {
            settingsButtonRef.current.style.backgroundColor = '#dedab4'
        }
    }, [page])

    return (
            <nav>
                <button ref={infoButtonRef} className="info">Описание<br/>мероприятия</button>
                <button ref={curatorsButtonRef} className="curators">Список кураторов</button>
                <button ref={studentsButtonRef} className="students">Список студентов</button>
                <button ref={settingsButtonRef} className="settings">Настройки</button>
            </nav>
    )
})

