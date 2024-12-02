import React from "react"
import { Event } from "../../consts"

export const EventSettings: React.FC<{
    event: Event
}> = React.memo(({event}) => {
    return (
        <form className="edit-event-form event-form">
            <label className="edit-event-label">Редактирование мероприятия</label>
            <label className="name-lable">Название:</label>
            <input type="text" name="name" value={event.title} required/>
            <label className="description-lable">Описание:</label>
            <textarea name="description" required>{event.discriptionText}</textarea>
            <div>
                <label className="date-lable">Срок проведения</label>
                <label className="date-from-lable">Начало:</label>
                <input type="date" name="date-from" value={event.eventStartDate} required/>
                <label className="date-to-lable">Конец:</label>
                <input type="date" name="date-to" value={event.eventEndDate} required/>
            </div>
            <div>
                <label className="enrollment-date-lable">Срок зачисления студентов</label>
                <label className="enrollment-date-from-lable">Начало:</label>
                <input type="date" name="enrollment-date-from" value={event.enrollmentStartDate} required/>
                <label className="enrollment-date-to-lable">Конец:</label>
                <input type="date" name="enrollment-date-to" value={event.enrollmentEndDate} required/>
            </div>
            <label className="number-of-participants-lable">Количество мест:</label>
            <input className="number-of-participants" type="number" name="number-of-participants" required/>
            <label className="chat-link-lable">Ссылка на огр. чат:</label>
            <input className="chat-link" type="input" name="chat-link" required/>
            <div className="save-delete-buttons">
                <button className="save-button">Сохранить изменения</button>
                <button className="delete-event-button">Удалить мероприятие</button>
            </div>
        </form>
    )
})