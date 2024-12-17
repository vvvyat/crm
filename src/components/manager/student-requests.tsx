import React, { useState } from "react";
import { Student } from "../../consts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const StudentRequestsListItem: React.FC<{
    counter: number,
    student: Student
}> = React.memo(({counter, student}) => {
    const [aceptedOrRejected, setAceptedOrRejected] = useState(false)
    
    return (
        <section className={aceptedOrRejected ? 'curator-requests hidden' : 'curator-requests'} id={`${student.studentId}`}>
            <p className="counter">{counter}</p>
            <p className="name">{`${student.surname} ${student.firstName} ${student.lastName}`}</p>
            <p className="skills">{student.competencies}</p>
            <button onClick={async () => {
                try {
                    await axios.put(`http://localhost:8080/events_students/${3}/accept/${student.studentId}`)
                    setAceptedOrRejected(true)
                } catch {
                    console.log('Не удалось принять заявку')
                }
            }} className="accept">Принять</button>
            <button onClick={async () => {
                try {
                    await axios.put(`http://localhost:8080/events_students/${3}/reject/${student.studentId}`)
                    setAceptedOrRejected(true)
                } catch {
                    console.log('Не удалось отклонить заявку')
                }
            }} className="reject">Отклонить</button>
        </section>
    )
})

export const StudentRequestsList: React.FC = React.memo(() => {
    const {data: studentRequsets, isLoading, error} = useQuery<Student[]>({
        queryKey: ['student-requests'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events_students/${3}/waiting_students`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (studentRequsets && studentRequsets.length === 0) {
        return <p className="fetch-warnings">Заявок нет</p>
    }else {
        return (
            <div className="students-container">
                <div className="student-requests-header">
                    <p className="counter"></p>
                    <p>Имя</p>
                    <p>Компетенции</p>
                </div>
                {studentRequsets?.map((student, index) => {
                    return < StudentRequestsListItem key={student.studentId} counter={index + 1} student={student} />
                })}
            </div>
        )
    }
})

