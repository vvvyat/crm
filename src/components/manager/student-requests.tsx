import React from "react";
import { Student } from "../../consts";
import { EventNavigation } from "./event-navigation";

const StudentRequestsListItem: React.FC<{
    counter: number,
    student: Student
}> = React.memo(({counter, student}) => {
    return (
        <section className="curator-requests" id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${student.surname} ${student.firstName} ${student.lastName}`}</p>
            <p className="skills">{student.competencies}</p>
            <button className="accept">Принять</button>
            <button className="reject">Отклонить</button>
        </section>
    )
})

export const StudentRequestsList: React.FC<{
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
                    <div className="student-requests-header">
                        <p className="counter"></p>
                        <p>Имя</p>
                        <p>Компетенции</p>
                    </div>
                    {students.map((student, index) => {
                        return < StudentRequestsListItem key={student.studentId} counter={index + 1} student={student} />
                    })}
                </div>
            </main>
        </>
    )
})

