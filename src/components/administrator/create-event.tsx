import React, { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { MainNavigation } from "./main-navigation"
import { Header } from "./header"
import { studentsList } from "../../mock"

type Inputs = {
    title: string;
    discriptionText: string;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeats: number;
    managerId: number;
    chatUrl: string;
}

export const CreateEvent: React.FC = React.memo(() => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const createFormRef = useRef<HTMLFormElement>(null)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        reset()
      }

    return (
        <>
            <Header />
            <main>
                <MainNavigation changeIsConfirmOpen={() => {setIsConfirmOpen(!isConfirmOpen)}} createFormRef={createFormRef} />
                <form ref={createFormRef} onSubmit={handleSubmit(onSubmit)} className="add-new-event-form event-form">
                    <label className="title-lable">Название:</label>
                    <input type="text" {...register("title", { required: true, maxLength: 70 })} />
                    {errors.title?.type === "required" && <span className="warning">Обязательное поле!</span>}
                    {errors.title?.type === "maxLength" && <span className="warning">Максимальная длина 70 символов.</span>}

                    <label className="description-lable">Описание:</label>
                    <textarea {...register("discriptionText", { required: true })}></textarea>
                    {errors.discriptionText && <span className="warning">Обязательное поле!</span>}

                    <div>
                        <label className="date-lable">Срок проведения</label>

                        <label className="date-from-lable">Начало:</label>
                        <input type="date" {...register("eventStartDate", { required: true, deps: ['eventEndDate', 'enrollmentEndDate']})} />
                        {errors.eventStartDate?.type === "required" && <span className="date-warning">Обязательное поле!</span>}

                        <label className="date-to-lable">Конец:</label>
                        <input type="date" {...register("eventEndDate", { required: 'Обязательное поле!', validate: (end) => {
                            if (!watch("eventStartDate")) return
                            const startDate = new Date(watch("eventStartDate")).getTime()
                            const endDate = new Date(end).getTime()
                            return startDate <= endDate || 'Событие должно начинаться раньше, чем заканчиваться.'
                        }})} />
                        {errors.eventEndDate && <span className="date-warning">{errors.eventEndDate.message}</span>}
                    </div>

                    <div>
                        <label className="enrollment-date-lable">Срок зачисления студентов</label>

                        <label className="enrollment-date-from-lable">Начало:</label>
                        <input type="date" {...register("enrollmentStartDate", { required: true, deps: ['enrollmentEndDate']})} />
                        {errors.enrollmentStartDate?.type === 'required' && <span className="date-warning">Обязательное поле!</span>}

                        <label className="enrollment-date-to-lable">Конец:</label>
                        <input type="date" {...register("enrollmentEndDate", { required: 'Обязательное поле!', validate: (enEnd) => {
                            if (!watch("enrollmentStartDate")) return
                            const enStartDate = new Date(watch("enrollmentStartDate")).getTime()
                            const enEndDate = new Date(enEnd).getTime()
                            const start = new Date(watch("eventStartDate")).getTime()
                            if (enStartDate > enEndDate) {
                                return 'Набор участников должен начинаться раньше, чем заканчиваться.'
                            }
                            if (!watch("eventStartDate")) return
                            return enEndDate <= start || 'Набор участников должен завершиться до начала события.'
                        }})} />
                        {errors.enrollmentEndDate && <span className="date-warning">{errors.enrollmentEndDate.message}</span>}
                    </div>

                    <label className="number-of-participants-lable">Количество мест:</label>
                    <input className="number-of-participants" type="number" {...register("numberSeats", { required: true, min: 1, max: 99999, validate: seats => seats % 1 === 0 || 'Количество участников должно быть целым числом.'})} />
                    {errors.numberSeats?.type === "required" && <span className="warning">Обязательное поле!</span>}
                    {errors.numberSeats?.type === "min" && <span className="warning">Количество участников не должно быть меньше 1.</span>}
                    {errors.numberSeats?.type === "max" && <span className="warning">Количество участников не должно превышать 99999.</span>}
                    {errors.numberSeats && <span className="warning">{errors.numberSeats.message}</span>}

                    <label className="manager-lable">Руководитель:</label>
                    <select className="manager" defaultValue={""} {...register("managerId", { required: true })}>
                        <option value="" disabled hidden></option>
                        {studentsList.map((student) => {
                            return <option key={student.studentId} value={student.studentId}>{`${student.surname} ${student.firstName} ${student.lastName}`}</option>
                        })}
                    </select>
                    {errors.managerId && <span className="warning">Обязательное поле!</span>}

                    <label className="chat-link-lable">Ссылка на огр. чат:</label>
                    <input className="chat-link" type="input" {...register("chatUrl", { required: true })}/>
                    {errors.chatUrl && <span className="warning">Обязательное поле!</span>}

                    <button disabled={isSubmitting} className="save-button">Сохранить</button>
                </form>

                {isConfirmOpen && (
                    <div className="warning-modal">
                        <p className="warning-text">Изменения будут утеряны.<br/>Вы уверены?</p>
                        <div className="warning-buttons">
                            <button className="create-event-warning-confirm">Да</button>
                            <button className="create-event-warning-cancel">Отмена</button>
                        </div>
                    </div>)
                }
            </main>
        </>
    )
})