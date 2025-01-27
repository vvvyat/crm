import React, { useRef, useState } from "react";
import { Student, EventStatus, EventData } from "../../consts";
import { useStudentsQuery } from "../../fetch/students";
import { useParams } from "react-router-dom";
import { useDeleteStudentMutation } from "../../fetch/delete-student";
import { FormatName, GetStudentCuratorStatus } from "../../utils";
import { useStartedStudentsQuery } from "../../fetch/started-students";
import { useEventQuery } from "../../fetch/event";
import { ConfigProvider, Select } from "antd";
import { useStartedCuratorsQuery } from "../../fetch/started-curators";
import { useCuratorChangeMutation } from "../../fetch/change-curator";

const StudentsListItem: React.FC<{
    counter: number,
    student: Student,
    event: EventData | undefined,
    studentsRef: React.RefObject<HTMLDivElement>
}> = React.memo(({counter, student, event, studentsRef}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const {mutateAsync: deleteStudent} = useDeleteStudentMutation(event ? event.id : 0)
    const {data: curators} = useStartedCuratorsQuery(event ? event.id : 0)
    const {mutateAsync: changeCurator} = useCuratorChangeMutation(event ? event.id : 0)

    return (
        <>
            <section className="student manager-student" id={`${student.studentId}`}>
                <p className="counter">{counter}</p>
                <p className="name">{FormatName(student)}</p>
                <p className="skills">{student.competencies}</p>
                {event && event.condition === EventStatus.InProgress ?
                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: 16,
                                fontFamily: 'Philosopher',
                                paddingSM: 13,
                                colorText: '#000000',
                                controlHeight: 54,
                                lineWidth: 0,
                                controlOutlineWidth: 0
                            },
                            components: {
                                Select: {
                                    activeOutlineColor: '#d9d9d9',
                                    hoverBorderColor: '#d9d9d9',
                                    activeBorderColor: '#d9d9d9',
                                    optionActiveBg: '#dedab4',
                                    optionFontSize: 16,
                                    optionSelectedBg: '#dedab4',
                                    optionSelectedColor: '#000000',
                                    optionSelectedFontWeight: 400,
                                    selectorBg: '#c7bf9e',
                                },
                            },
                        }}
                    >
                        <Select
                            onChange={(value) => {
                                changeCurator({studentId: student.studentId, newCuratorId: value})
                            }}
                            value={curators?.find((curator) => {
                                return curator.firstName === student.curatorFirstName &&
                                curator.lastName === student.curatorLastName &&
                                curator.surname === student.curatorSurname})?.curatorId}
                            className="manager"
                            popupClassName="manager-popup"
                            notFoundContent="Не найдено"
                            showSearch
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={curators?.map((curator) => {
                                return {
                                    value: curator.curatorId,
                                    label: FormatName(curator)
                                }
                            })}
                        />
                    </ConfigProvider> : 
                    <p className="curator-name"> {`${student.curatorLastName || ''} ${student.curatorFirstName || ''} ${student.curatorSurname || ''}`}</p>
                }
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
    const {data: event} = useEventQuery(Number(params.id))
    const studentsRef = useRef<HTMLDivElement>(null)
    const {data: studentsAccepted, isLoading: acceptedLoading, isError: acceptedError} = useStudentsQuery(Number(params.id))
    const {data: studentsStarted, isLoading: startedLoading, isError: startedError} = useStartedStudentsQuery(Number(params.id))

    if (event?.condition === EventStatus.RegistrationIsOpen && acceptedLoading || startedLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && acceptedError || startedError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (event?.condition === EventStatus.RegistrationIsOpen && studentsAccepted && studentsAccepted.length === 0 || 
        event?.condition !== EventStatus.RegistrationIsOpen && studentsStarted && studentsStarted.length === 0) {
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
                {event?.condition === EventStatus.RegistrationIsOpen ?
                    studentsAccepted?.map((student, index) => {
                        return < StudentsListItem
                            key={student.studentId} counter={index + 1} student={student} event={event} studentsRef={studentsRef} />
                    }) :
                    studentsStarted?.map((student, index) => {
                        return < StudentsListItem
                            key={student.studentId} counter={index + 1} student={student} event={event} studentsRef={studentsRef} />
                    })
                }
            </div>
        )
    }
})
