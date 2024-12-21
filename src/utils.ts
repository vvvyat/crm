import { EventStatus, StudentCuratorStatus, Manager, Student, Curator } from "./consts";

const FormatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const GetManagerById = (managers: Array<Manager> | undefined, id: number) => {
    const manager = managers?.find((manager) => manager.managerId === id)
    return manager ? FormatName(manager) : 'Ошибка'
}

const GetEventStatus = (condition: string) => {
    let statusBGColor = '#d9d9d9'
    let statusMessage = 'Подготовка'

    switch (condition) {
        case EventStatus.Preparation:
            statusBGColor = '#d9d9d9'
            statusMessage = 'Подготовка'
            break
        case EventStatus.RegistrationIsOpen:
            statusBGColor = 'greenyellow'
            statusMessage = 'Регистрация открыта'
            break
        case EventStatus.NoPlacesLeft:
            statusBGColor = 'yellow'
            statusMessage = 'Мест нет'
            break
        case EventStatus.RegistrationIsClosed:
            statusBGColor = 'orange'
            statusMessage = 'Регистрация закрыта'
            break
        case EventStatus.InProgress:
            statusBGColor = 'cornflowerblue'
            statusMessage = 'В процессе проведения'
            break
        case EventStatus.Completed:
            statusBGColor = 'indianred'
            statusMessage = 'Завершено'
            break
        case EventStatus.Hidden:
            statusBGColor = 'grey'
            statusMessage = 'Скрыто'
            break
    }

    return {statusBGColor, statusMessage}
}

const GetStudentCuratorStatus = (status: string) => {
    let statusMessage = 'Заявка отправлена'
    switch (status) {
        case StudentCuratorStatus.SentRequest:
            statusMessage = 'Заявка отправлена'
            break
        case StudentCuratorStatus.Rejected:
            statusMessage = 'Заявка отклонена'
            break
        case StudentCuratorStatus.AddedInChat:
            statusMessage = 'Добавлен(а) в чат'
            break
        case StudentCuratorStatus.StartedEvent:
            statusMessage = 'Приступил(а) к мероприятию'
            break
        case StudentCuratorStatus.EndedEvent:
            statusMessage = 'Завершил(а) мероприятие'
            break
        case StudentCuratorStatus.Deleted:
            statusMessage = 'Удален(а) с мероприятия'
            break
    }

    return statusMessage
}

const FormatName = (user: Manager | Student | Curator) => {
    return `${user.lastName} ${user.firstName} ${user.surname}`
}

export {FormatDate, GetManagerById, GetEventStatus, FormatName, GetStudentCuratorStatus}