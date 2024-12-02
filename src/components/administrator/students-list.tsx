import React from "react";
import { Student } from "../../consts";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student
}> = React.memo(({counter, student}) => {
    return (
        <section className="student" id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${student.surname} ${student.firstName} ${student.lastName}`}</p>
            <p className="skills">{student.competencies}</p>
            <p className="curator-name">Имя куратора</p>
            <p className="state">{student.studentStatus}</p>
        </section>
    )
})

export const StudentsList: React.FC<{
    students: Array<Student>
}> = React.memo(({students}) => {
    return (
        <div className="students-container">
            <div className="students-header">
                <p className="counter"></p>
                <p>Имя</p>
                <p>Компетенции</p>
                <p>Куратор</p>
                <p>Статус</p>
            </div>
            {students.map((student, index) => {
                return < StudentsListItem key={student.studentId} counter={index + 1} student={student} />
            })}
        </div>
    )
})
