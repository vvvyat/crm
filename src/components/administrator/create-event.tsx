import React, { useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useBlocker } from "react-router-dom";
import { ConfigProvider, Select } from "antd";
import { Inputs } from "../../consts";
import { useNewEventMutation } from "../../fetch/create-event";
import { FormatName } from "../../utils";
import { useAllManagersQuery } from "../../fetch/all-managers";
import { useUserInfoQuery } from "../../fetch/user-info";
import moment from "moment";

export const CreateEvent: React.FC = React.memo(() => {
    const [isCreateFailed, setIsCreateFailed] = useState(false)

    const {
        register,
        reset,
        watch,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()
    
    const {mutateAsync: createNewEvent} = useNewEventMutation(setIsCreateFailed, reset)
    const {data: userInfo} = useUserInfoQuery()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        createNewEvent({
            title: data.title,
            descriptionText: data.descriptionText,
            adminId: userInfo ? userInfo.id : 0,
            managerId: data.managerId,
            eventStartDate: moment(data.eventStartDate).format(),
            eventEndDate: moment(data.eventEndDate).format(),
            enrollmentStartDate: moment(data.enrollmentStartDate).format(),
            enrollmentEndDate: moment(data.enrollmentEndDate).format(),
            chatUrl: data.chatUrl,
            numberSeatsStudent: data.numberSeatsStudent,
            hasTest: false,
            testUrl: null
        })
    }

    const isFormEmpty = () => {
        const inputs = watch()
        for(const inputValue of Object.values(inputs))
            if ( inputValue ) return false
        return true;
    }

    const blocker = useBlocker(() => !isFormEmpty());

    const {data: managers} = useAllManagersQuery()
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={blocker.state === "blocked" ? {filter: 'blur(5px)'} : {}} className="add-new-event-form event-form">
                <label className="title-lable">Название:</label>
                <input type="text" autoComplete="off" disabled={blocker.state === "blocked"} {...register("title", { required: true, maxLength: 70 })} />
                {errors.title?.type === "required" && <span className="warning">Обязательное поле!</span>}
                {errors.title?.type === "maxLength" && <span className="warning">Максимальная длина 70 символов.</span>}

                <label className="description-lable">Описание:</label>
                <textarea autoComplete="off" disabled={blocker.state === "blocked"} {...register("descriptionText", { required: true })}></textarea>
                {errors.descriptionText && <span className="warning">Обязательное поле!</span>}

                <div>
                    <label className="date-lable">Срок проведения</label>

                    <label className="date-from-lable">Начало:</label>
                    <input type="date" disabled={blocker.state === "blocked"} {...register("eventStartDate", { required: true, deps: ['eventEndDate', 'enrollmentEndDate']})} />
                    {errors.eventStartDate?.type === "required" && <span className="date-warning">Обязательное поле!</span>}

                    <label className="date-to-lable">Конец:</label>
                    <input type="date" disabled={blocker.state === "blocked"} {...register("eventEndDate", { required: 'Обязательное поле!', validate: (end) => {
                        if (!watch("eventStartDate")) return
                        const startDate = moment(watch("eventStartDate"))
                        const endDate = moment(end)
                        if (moment().isAfter(startDate)) {
                            return 'Нельзя создать событие, которое уже началось / завершилось.'
                        }
                        return endDate.isAfter(startDate) || 'Начало события должно происходить раньше, чем конец.'
                    }})} />
                    {errors.eventEndDate && <span className="date-warning">{errors.eventEndDate.message}</span>}
                </div>

                <div>
                    <label className="enrollment-date-lable">Срок зачисления студентов</label>

                    <label className="enrollment-date-from-lable">Начало:</label>
                    <input type="date" disabled={blocker.state === "blocked"} {...register("enrollmentStartDate", { required: true, deps: ['enrollmentEndDate']})} />
                    {errors.enrollmentStartDate?.type === 'required' && <span className="date-warning">Обязательное поле!</span>}

                    <label className="enrollment-date-to-lable">Конец:</label>
                    <input type="date" disabled={blocker.state === "blocked"} {...register("enrollmentEndDate", { required: 'Обязательное поле!', validate: (enEnd) => {
                        if (!watch("enrollmentStartDate") || !watch("eventStartDate")) return
                        const enStartDate = moment(watch("enrollmentStartDate"))
                        const enEndDate = moment(enEnd)
                        const start = moment(watch("eventStartDate"))
                        if (enStartDate.isSameOrAfter(enEndDate)) {
                            return 'Начало набора должно происходить раньше, чем конец.'
                        }
                        if (enEndDate.isAfter(start)) {
                            return 'Набор участников должен завершиться до начала события.'
                        }
                    }})} />
                    {errors.enrollmentEndDate && <span className="date-warning">{errors.enrollmentEndDate.message}</span>}
                </div>

                <label className="number-of-participants-lable">Количество мест:</label>
                <input className="number-of-participants" type="number" disabled={blocker.state === "blocked"} {...register("numberSeatsStudent", { required: true, min: 1, max: 99999, validate: seats => seats % 1 === 0 || 'Количество участников должно быть целым числом.'})} />
                {errors.numberSeatsStudent?.type === "required" && <span className="warning">Обязательное поле!</span>}
                {errors.numberSeatsStudent?.type === "min" && <span className="warning">Количество участников не должно быть меньше 1.</span>}
                {errors.numberSeatsStudent?.type === "max" && <span className="warning">Количество участников не должно превышать 99999.</span>}
                {errors.numberSeatsStudent && <span className="warning">{errors.numberSeatsStudent.message}</span>}

                <label className="manager-lable">Руководитель:</label>
                <Controller
                    control={control}
                    name="managerId"
                    rules={{required: true}}
                    render={({field}) => (
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
                                {...field}
                                disabled={blocker.state === "blocked"}
                                className="manager"
                                popupClassName="manager-popup"
                                notFoundContent="Не найдено"
                                showSearch
                                optionFilterProp="label"
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={managers?.map((manager) => {
                                    return {
                                        value: manager.id,
                                        label: FormatName(manager)
                                    }
                                })}
                            />
                        </ConfigProvider>
                    )}
                />
                {errors.managerId && <span className="warning">Обязательное поле!</span>}

                <label className="chat-link-lable">Ссылка на огр. чат:</label>
                <input className="chat-link" type="input" disabled={blocker.state === "blocked"} autoComplete="off" {...register("chatUrl", {
                    required: 'Обязательное поле!',
                    pattern: {
                        value: /^http.*\./,
                        message: 'Невалидная ссылка.',
                    },
                })}/>
                {errors.chatUrl && <span className="warning">{errors.chatUrl.message}</span>}

                <button disabled={isSubmitting || blocker.state === "blocked"} className="save-button">Создать мероприятие</button>
                {isCreateFailed && <p className="save-error">Не удалось создать мероприятие</p>}
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