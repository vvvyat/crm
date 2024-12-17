import React from "react";
import { Student } from "../../consts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
            <p className="state">{student.statusRequest}</p>
        </section>
    )
})

export const StudentsList: React.FC = React.memo(() => {
    const {data: students, isLoading, error} = useQuery<Student[]>({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_students/${1}/students`)
            return res.data
        }
    })

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
