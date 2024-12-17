import React, { useRef, useState } from "react";
import { Student } from "../../consts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student,
    studentsRef: React.RefObject<HTMLDivElement>
}> = React.memo(({counter, student, studentsRef}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    return (
        <>
            <section className={isDeleted ? "hidden" : "student manager-student" } id={`${student.studentId}`}>
                <p className="counter">{counter}</p>
                <p className="name">{`${student.surname} ${student.firstName} ${student.lastName}`}</p>
                <p className="skills">{student.competencies}</p>
                <p className="curator-name">{`${student.curatorSurname || ''} ${student.curatorFirstName || ''} ${student.curatorLastName || ''}`}</p>
                <p className="state">{student.statusRequest}</p>
                <button className="delete-student" disabled={isDeleteConfirmOpen} onClick={(evt) => {
                    evt.preventDefault()
                    if (studentsRef.current) {
                        studentsRef.current.classList.add('modal-open')
                    }
                    setIsDeleteConfirmOpen(true)
                }}>Удалить</button>
            </section>

            {isDeleteConfirmOpen && (
                <div className="warning-modal">
                    <p className="warning-text">Вы уверены, что хотите удалить<br/>{`${student.surname} ${student.firstName} ${student.lastName}`}?</p>
                    <div className="warning-buttons">
                        <button className="edit-event-warning-confirm" onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:8080/events_students/${student.eventId}/delete/${student.studentId}`)
                                setIsDeleteConfirmOpen(false)
                                if (studentsRef.current) {
                                    studentsRef.current.classList.remove('modal-open')
                                }
                                setIsDeleted(true)
                            } catch {
                                console.log('Не удалить студента с мероприятия')
                            }
                        }}>Да</button>
                        <button className="edit-event-warning-cancel" onClick={(evt) => {
                            evt.preventDefault()
                            setIsDeleteConfirmOpen(false)
                            if (studentsRef.current) {
                                studentsRef.current.classList.remove('modal-open')
                            }
                        }}>Отмена</button>
                    </div>
                </div>
            )}
        </>
    )
})

export const StudentsList: React.FC = React.memo(() => {
    const studentsRef = useRef<HTMLDivElement>(null)

    const {data: students, isLoading, error} = useQuery<Student[]>({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_students/${3}/students`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (students && students.length === 0) {
        return <p className="fetch-warnings">Участников нет</p>
    }else {
        return (
            <div ref={studentsRef} className="students-container">
                <div className="students-header manager-student-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                    <p>Куратор</p>
                    <p>Статус</p>
                </div>
                {students?.map((student, index) => {
                    return < StudentsListItem key={student.studentId} counter={index + 1} student={student} studentsRef={studentsRef} />
                })}
            </div>
        )
    }
})
