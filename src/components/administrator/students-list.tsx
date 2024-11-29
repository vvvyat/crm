import React from "react";
import { Student } from "../../consts";
import { EventNavigation } from "./event-navigation";

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
        <>
            <header>
                <a className="logo">CRM</a>
                <form className="search-form">
                    <label className="search-lable">Поиск</label>
                    <input className="search" type="text" name="search"/>
                </form>
                <div className="profile-button">
                    <img src="img/profile-icon.svg" width="37" height="37"/>
                    <p>Имя пользователя</p>
                </div>
                <img src="img/logout.svg" height="30.83" width="37"/>
            </header>
            <main>
                <EventNavigation />
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
            </main>
        </>
    )
})
