import React from "react";
import { Student } from "../../consts";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student
}> = React.memo(({counter, student}) => {
    return (
        <section className="student curator" id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${student.surname} ${student.firstName} ${student.lastName}`}</p>
            <p className="telegram">{student.telegramUrl}</p>
            <p className="vk">{student.vkUrl}</p>
            <p className="state">Приступил(а) к мероприятию</p>
        </section>
    )
})

export const StudentsList: React.FC<{
    students: Array<Student>
}> = React.memo(({students}) => {

    return (
        <div className="curators-container">
            <div className="curators-header">
                <p className="counter"></p>
                <p>Имя</p>
                <p>Telegram</p>
                <p>ВКонтакте</p>
                <p>Статус</p>
            </div>
            {students.map((student, index) => {
                return < StudentsListItem key={student.studentId} counter={index + 1} student={student} />
            })}
        </div>
    )
})

