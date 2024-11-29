import React, { useEffect, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    const {page} = useMatch('/:page')?.params || {}
    
    const infoButtonRef = useRef<HTMLButtonElement>(null)
    const curatorRequestsButtonRef = useRef<HTMLButtonElement>(null)
    const studentRequestsButtonRef = useRef<HTMLButtonElement>(null)
    const curatorsButtonRef = useRef<HTMLButtonElement>(null)
    const studentsButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onInfoButtonClick = () => {
            navigate('/eventInfo')
        }

        const onCuratorRequestsButtonClick = () => {
            navigate('/curatorRequests')
        }

        const onStudentRequestsButtonClick = () => {
            navigate('/studentRequests')
        }

        const onCuratorsButtonClick = () => {
            navigate('/curators')
        }

        const onStudentsButtonClick = () => {
            navigate('/students')
        }

        infoButtonRef.current?.addEventListener('click', onInfoButtonClick)
        curatorRequestsButtonRef.current?.addEventListener('click', onCuratorRequestsButtonClick)
        studentRequestsButtonRef.current?.addEventListener('click', onStudentRequestsButtonClick)
        curatorsButtonRef.current?.addEventListener('click', onCuratorsButtonClick)
        studentsButtonRef.current?.addEventListener('click', onStudentsButtonClick)
    }, [])

    useEffect(() => {
        if (page === 'eventInfo' && infoButtonRef.current) {
            infoButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'curatorRequests' && curatorRequestsButtonRef.current) {
            curatorRequestsButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'studentRequests' && studentRequestsButtonRef.current) {
            studentRequestsButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'curators' && curatorsButtonRef.current) {
            curatorsButtonRef.current.style.backgroundColor = '#dedab4'
        } else if (page === 'students' && studentsButtonRef.current) {
            studentsButtonRef.current.style.backgroundColor = '#dedab4'
        }
    }, [page])

    return (
            <nav>
                <button ref={infoButtonRef} className="info">Описание<br/>мероприятия</button>
                <button ref={curatorRequestsButtonRef} className="curators">Заявки на<br/>кураторство</button>
                <button ref={studentRequestsButtonRef} className="students">Заявки на<br/>мероприятие</button>
                <button ref={curatorsButtonRef} className="curators">Список кураторов</button>
                <button ref={studentsButtonRef} className="students">Список студентов</button>
            </nav>
    )
})

