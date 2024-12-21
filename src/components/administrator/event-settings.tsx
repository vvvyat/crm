import React, { useState } from "react"
import { Inputs } from "../../consts"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { ConfigProvider, Select } from "antd";
import { useParams } from "react-router-dom";
import { GetManagerById } from "../../utils";
import { useEventQuery } from "../../fetch/event";
import { useAllManagersQuery } from "../../fetch/all-managers";
import { useUpdateEventMutation } from "../../fetch/update-event";
import { useHideEventMutation } from "../../fetch/hide-event";
import { useDeleteEventMutation } from "../../fetch/delete-event";
import { EventStatus } from "../../consts";

export const EventSettings: React.FC = React.memo(() => {
    const params = useParams()
    const [isHideConfirmOpen, setIsHideConfirmOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [isEditFailed, setIsEditFaled] = useState(false)
    const [isHideFailed, setIsHideFaled] = useState(false)
    const [isDeleteFailed, setIsDeleteFaled] = useState(false)

    const {data: event, isLoading, error} = useEventQuery(Number(params.id))
    const {mutateAsync: updateEvent} = useUpdateEventMutation(Number(params.id), setIsEditFaled)
    const {mutateAsync: hideEvent} = useHideEventMutation(Number(params.id), setIsHideFaled, setIsHideConfirmOpen)
    const {mutateAsync: deleteEvent} = useDeleteEventMutation(Number(params.id), setIsDeleteFaled)

    const {
        register,
        watch,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<Inputs>({
        defaultValues: {
            title: event?.title,
            descriptionText: event?.descriptionText,
            eventStartDate: event?.eventStartDate.split('T')[0],
            eventEndDate: event?.eventEndDate.split('T')[0],
            enrollmentStartDate: event?.enrollmentStartDate.split('T')[0],
            enrollmentEndDate: event?.enrollmentEndDate.split('T')[0],
            numberSeatsStudent: event?.numberSeatsStudent,
            managerId: event?.managerId,
            chatUrl: event?.chatUrl
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        updateEvent({                
            title: data.title,
            descriptionText: data.descriptionText,
            adminId: 4,
            managerId: data.managerId,
            eventStartDate: data.eventStartDate + 'T00:00:00.000Z',
            eventEndDate: data.eventEndDate + 'T00:00:00.000Z',
            enrollmentStartDate: data.enrollmentStartDate + 'T00:00:00.000Z',
            enrollmentEndDate: data.enrollmentEndDate + 'T00:00:00.000Z',
            numberSeatsStudent: data.numberSeatsStudent,
            numberSeatsCurator: 1,
            condition: "PREPARATION"
        })
        reset()
    }

    const {data: managers} = useAllManagersQuery()

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)} className="edit-event-form event-form" style={isDeleteConfirmOpen || isHideConfirmOpen ? {filter: 'blur(5px)'} : {}}>
                    <label className="title-lable">Название:</label>
                    <input type="text" autoComplete="off" {...register("title", { required: true, maxLength: 70 })} />
                    {errors.title?.type === "required" && <span className="warning">Обязательное поле!</span>}
                    {errors.title?.type === "maxLength" && <span className="warning">Максимальная длина 70 символов.</span>}
    
                    <label className="description-lable">Описание:</label>
                    <textarea autoComplete="off" {...register("descriptionText", { required: true })}></textarea>
                    {errors.descriptionText && <span className="warning">Обязательное поле!</span>}
    
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
                            return startDate <= endDate || 'Начало события должно происходить раньше, чем конец.'
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
                                return 'Начало набора должно происходить раньше, чем конец.'
                            }
                            if (!watch("eventStartDate")) return
                            return enEndDate <= start || 'Набор участников должен завершиться до начала события.'
                        }})} />
                        {errors.enrollmentEndDate && <span className="date-warning">{errors.enrollmentEndDate.message}</span>}
                    </div>
    
                    <label className="number-of-participants-lable">Количество мест:</label>
                    <input className="number-of-participants" type="number" {...register("numberSeatsStudent", { required: true, min: 1, max: 99999, validate: seats => seats % 1 === 0 || 'Количество участников должно быть целым числом.'})} />
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
                                            selectorBg: '#c7bf9e'
                                        },
                                    },
                                }}
                            >
                                <Select
                                    {...field}
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
                                            value: manager.managerId,
                                            label: GetManagerById(managers, manager.managerId)
                                        }
                                    })}
                                />
                            </ConfigProvider>
                        )}
                    />
                    {errors.managerId && <span className="warning">Обязательное поле!</span>}
    
                    <label className="chat-link-lable">Ссылка на огр. чат:</label>
                    <input className="chat-link" type="input" autoComplete="off" {...register("chatUrl", { required: true })}/>
                    {errors.chatUrl && <span className="warning">Обязательное поле!</span>}
    
                    <div className="save-delete-buttons">
                        <button disabled={isSubmitting || !isDirty} className="save-button">Сохранить изменения</button>
                        <button disabled={event?.condition === EventStatus.Hidden} className="hide-event-button" onClick={(evt) => {
                            evt.preventDefault()
                            setIsHideConfirmOpen(true)
                        }}>Скрыть мероприятие</button>
                        <button className="delete-event-button" onClick={(evt) => {
                            evt.preventDefault()
                            setIsDeleteConfirmOpen(true)
                        }}>Удалить мероприятие</button>
                    </div>
                    {isEditFailed && <p className="save-error">Не удалось сохранить изменения</p>}
                    {isHideFailed && <p className="save-error">Не удалось скрыть мероприятие</p>}
                </form>
    
                {isHideConfirmOpen && (
                    <div className="warning-modal edit-warning-modal">
                        <p className="warning-text">Вы уверены, что хотите скрыть<br/>это мероприятие?</p>
                        <div className="warning-buttons">
                            <button className="edit-event-warning-confirm" onClick={() => hideEvent()}>Да</button>
                            <button className="edit-event-warning-cancel" onClick={() => setIsHideConfirmOpen(false)}>Отмена</button>
                        </div>
                    </div>
                )}
    
                {isDeleteConfirmOpen && (
                    <div className="warning-modal edit-warning-modal">
                        <p className="warning-text">Вы уверены, что хотите удалить<br/>это мероприятие?</p>
                        {isDeleteFailed && <p className="modal-error">Не удалось удалить мероприятие</p>}
                        <div className="warning-buttons">
                            <button className="edit-event-warning-confirm" onClick={async () => deleteEvent()}>Да</button>
                            <button className="edit-event-warning-cancel" onClick={() => {
                                setIsDeleteConfirmOpen(false)
                                setIsDeleteFaled(false)
                            }}>Отмена</button>
                        </div>
                    </div>
                )}
            </>
        )    
    }
})