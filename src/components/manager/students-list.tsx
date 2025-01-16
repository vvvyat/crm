import React, { useRef, useState } from "react";
import { Student } from "../../consts";
import { useStudentsQuery } from "../../fetch/students";
import { useParams } from "react-router-dom";
import { useDeleteStudentMutation } from "../../fetch/delete-student";
import { FormatName, GetStudentCuratorStatus } from "../../utils";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student,
    eventId: number,
    studentsRef: React.RefObject<HTMLDivElement>
}> = React.memo(({counter, student, eventId, studentsRef}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const {mutateAsync: deleteStudent} = useDeleteStudentMutation(eventId)

    return (
        <>
            <section className="student manager-student" id={`${student.studentId}`}>
                <p className="counter">{counter}</p>
                <p className="name">{FormatName(student)}</p>
                <p className="skills">{student.competencies}</p>
                <p className="curator-name">{`${student.curatorLastName || ''} ${student.curatorFirstName || ''} ${student.curatorSurname || ''}`}</p>
                <p className="state">{GetStudentCuratorStatus(student.statusRequest)}</p>
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
                    <p className="warning-text">Вы уверены, что хотите удалить<br/>{FormatName(student)}?</p>
                    <div className="warning-buttons">
                        <button className="edit-event-warning-confirm" onClick={() => deleteStudent(student.studentId)}>Да</button>
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
    const params = useParams()
    const studentsRef = useRef<HTMLDivElement>(null)
    const {data: students, isLoading, isError} = useStudentsQuery(Number(params.id))

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
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
                    return < StudentsListItem
                        key={student.studentId} counter={index + 1} student={student} eventId={Number(params.id)} studentsRef={studentsRef} />
                })}
            </div>
        )
    }
})
