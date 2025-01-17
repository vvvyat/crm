import React from "react";
import { EventStatus, Student } from "../../consts";
import { useStudentsQuery } from "../../fetch/students";
import { useParams } from "react-router-dom";
import { FormatName, GetStudentCuratorStatus } from "../../utils";
import { useEventQuery } from "../../fetch/event";
import { useStartedStudentsQuery } from "../../fetch/started-students";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student
}> = React.memo(({counter, student}) => {
    return (
        <section className="student" id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{FormatName(student)}</p>
            <p className="skills">{student.competencies}</p>
            <p className="curator-name">{`${student.curatorLastName || ''} ${student.curatorFirstName || ''} ${student.curatorSurname || ''}`}</p>
            <p className="state">{GetStudentCuratorStatus(student.statusRequest)}</p>
        </section>
    )
})

export const StudentsList: React.FC = React.memo(() => {
    const params = useParams()
    const {data: event} = useEventQuery(Number(params.id))
    const {data: studentsAccepted, isLoading: acceptedLoading, isError: acceptedError} = useStudentsQuery(Number(params.id))
    const {data: studentsStarted, isLoading: startedLoading, isError: startedError} = useStartedStudentsQuery(Number(params.id))

    if (event?.condition === EventStatus.RegistrationIsOpen && acceptedLoading || startedLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && acceptedError || startedError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && studentsAccepted && studentsAccepted.length === 0 || 
        event?.condition !== EventStatus.RegistrationIsOpen && studentsStarted && studentsStarted.length === 0) {
            return <p className="fetch-warnings">Участников нет</p>
    } else {
        return (
            <div className="students-container">
                <div className="students-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                    <p>Куратор</p>
                    <p>Статус</p>
                </div>
                {event?.condition === EventStatus.RegistrationIsOpen ?
                    studentsAccepted?.map((student, index) => {
                        return < StudentsListItem key={student.studentId} counter={index + 1} student={student} />
                    }) :
                    studentsStarted?.map((student, index) => {
                        return < StudentsListItem key={student.studentId} counter={index + 1} student={student} />
                    })
                }
            </div>
        )
    }
})
