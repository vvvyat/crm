import React from "react"
import { MainNavigation } from "./main-navigation"

export const CreateEvent: React.FC = React.memo(() => {
    return (
        <>
            <header>
                <a className="logo">CRM</a>
                <span></span>
                <div className="profile-button">
                    <img src="img/profile-icon.svg" width="37" height="37"/>
                    <p>Имя пользователя</p>
                </div>
                <img src="img/logout.svg" height="30.83" width="37"/>
            </header>
            <main>
                <MainNavigation />
                <form className="add-new-event-form event-form">
                    <label className="title-lable">Название:</label>
                    <input type="text" name="title" required/>
                    <label className="description-lable">Описание:</label>
                    <textarea name="description" required></textarea>
                    <div>
                        <label className="date-lable">Срок проведения</label>
                        <label className="date-from-lable">Начало:</label>
                        <input type="date" name="date-from" required/>
                        <label className="date-to-lable">Конец:</label>
                        <input type="date" name="date-to" required/>
                    </div>
                    <div>
                        <label className="enrollment-date-lable">Срок зачисления студентов</label>
                        <label className="enrollment-date-from-lable">Начало:</label>
                        <input type="date" name="enrollment-date-from" required/>
                        <label className="enrollment-date-to-lable">Конец:</label>
                        <input type="date" name="enrollment-date-to" required/>
                    </div>
                    <label className="number-of-participants-lable">Количество мест:</label>
                    <input className="number-of-participants" type="number" name="number-of-participants" required/>
                    <label className="manager-lable">Руководитель:</label>
                    <input className="manager" type="text" name="manager" required/>

                    <label className="chat-link-lable">Ссылка на огр. чат:</label>
                    <input className="chat-link" type="input" name="chat-link" required/>
                    <button className="save-button">Сохранить</button>
                </form>
            </main>
        </>
    )
})
