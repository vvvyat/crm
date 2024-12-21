import React from "react";
import { Student } from "../../consts";
import { useStudentsQuery } from "../../fetch/students";
import { useParams } from "react-router-dom";
import { FormatName, GetStudentCuratorStatus } from "../../utils";

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
    const {data: students, isLoading, error} = useStudentsQuery(Number(params.id))

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (students && students.length === 0) {
        return <p className="fetch-warnings">Студентов нет</p>
    }else {
        return (
            <div className="students-container">
                <div className="students-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                    <p>Куратор</p>
                    <p>Статус</p>
                </div>
                {students?.map((student, index) => {
                    return < StudentsListItem key={student.studentId} counter={index + 1} student={student} />
                })}
            </div>
        )
    }
})
