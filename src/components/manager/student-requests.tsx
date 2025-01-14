import React from "react";
import { Student } from "../../consts";
import { useStudentRequestsQuery } from "../../fetch/student-requests";
import { useParams } from "react-router-dom";
import { FormatName } from "../../utils";
import { useStudentAcceptMutation } from "../../fetch/student-accept";
import { useStudentRejectMutation } from "../../fetch/student-reject";

const StudentRequestsListItem: React.FC<{
    counter: number,
    eventId: number,
    student: Student
}> = React.memo(({counter, eventId, student}) => {    
    const {mutateAsync: accept} = useStudentAcceptMutation(eventId, student.studentId)
    const {mutateAsync: reject} = useStudentRejectMutation(eventId, student.studentId)

    return (
        <section className='curator-requests' id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{FormatName(student)}</p>
            <p className="skills">{student.competencies}</p>
            <button onClick={() => accept()} className="accept">Принять</button>
            <button onClick={() => reject()} className="reject">Отклонить</button>
        </section>
    )
})

export const StudentRequestsList: React.FC = React.memo(() => {
    const params = useParams()
    const {data: studentRequsets, isLoading, isError} = useStudentRequestsQuery(Number(params.id))

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (studentRequsets && studentRequsets.length === 0) {
        return <p className="fetch-warnings">Заявок нет</p>
    }else if (studentRequsets) {
        return (
            <div className="students-container">
                <div className="student-requests-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                </div>
                {studentRequsets.map((student, index) => {
                    return < StudentRequestsListItem key={student.studentId} counter={index + 1} eventId={Number(params.id)} student={student} />
                })}
            </div>
        )
    }
})

