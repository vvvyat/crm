import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { studentsList } from "../../mock"
import { useBlocker } from "react-router-dom";
import { ConfigProvider, Select } from "antd";

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

    console.log(watch())

    const isFormEmpty = () => {
        const inputs = watch()
        for(const inputValue of Object.values(inputs))
            if ( inputValue ) return false
        return true;
    }

    const blocker = useBlocker(() => !isFormEmpty());
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="add-new-event-form event-form">
                <label className="title-lable">Название:</label>
                <input type="text" autoComplete="off" {...register("title", { required: true, maxLength: 70 })} />
                {errors.title?.type === "required" && <span className="warning">Обязательное поле!</span>}
                {errors.title?.type === "maxLength" && <span className="warning">Максимальная длина 70 символов.</span>}

                <label className="description-lable">Описание:</label>
                <textarea autoComplete="off" {...register("discriptionText", { required: true })}></textarea>
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
                <ConfigProvider
                    theme={{
                        token: {
                            fontSize: 16,
                            fontFamily: 'Philosopher',
                            paddingSM: 13,
                            borderRadius: 32,
                            colorText: '#000000',
                            controlHeight: 54,
                            lineWidth: 5,
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
                        className="manager"
                        popupClassName="manager-popup"
                        notFoundContent="Не найдено"
                        showSearch
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={studentsList.map((student) => {
                            return {
                                value: student.studentId,
                                label: `${student.surname} ${student.firstName} ${student.lastName}`
                            }
                        })}
                        {...register("managerId", { required: true })}
                    />
                </ConfigProvider>
                {errors.managerId && <span className="warning">Обязательное поле!</span>}

                <label className="chat-link-lable">Ссылка на огр. чат:</label>
                <input className="chat-link" type="input" autoComplete="off" {...register("chatUrl", { required: true })}/>
                {errors.chatUrl && <span className="warning">Обязательное поле!</span>}

                <button disabled={isSubmitting} className="save-button">Сохранить</button>
            </form>

            {blocker.state === "blocked" && (
                <div className="warning-modal">
                    <p className="warning-text">Изменения будут утеряны.<br/>Вы уверены?</p>
                    <div className="warning-buttons">
                        <button className="create-event-warning-confirm" onClick={() => blocker.proceed()}>Да</button>
                        <button className="create-event-warning-cancel" onClick={() => blocker.reset()}>Отмена</button>
                    </div>
                </div>)
            }
        </>
    )
})