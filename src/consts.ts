export type EventData = {
    adminId: number;
    chatUrl: string;
    condition: string;
    descriptionText: string;
    enrollmentEndDate: string;
    enrollmentStartDate: string;
    eventEndDate: string;
    eventStartDate: string;
    id: number;
    managerId: number;
    numberSeatsCurator: number;
    numberSeatsStudent: number;
    title: string;
}

export type Student = {
    eventId: number;
    studentId: number;
    statusRequest: string;
    firstName: string;
    lastName: string;
    surname: string;
    competencies: string;
    telegramUrl: string;
    vkUrl: string;
    curatorFirstName: string;
    curatorLastName: string;
    curatorSurname: string;
}

export type Curator = {
    eventId: number;
    curatorId: number;
    curatorStatus: string;
    firstName: string;
    lastName: string;
    surname: string;
    competencies: string;
    telegramUrl: string;
    vkUrl: string;
}

export type Manager = {
    managerId: number;
    firstName: string;
    lastName: string;
    surname: string;
    email: string;
    telegramUrl: string;
    vkUrl: string;
}

export type Inputs = {
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

export enum EventState {
    Preparation = "Подготовка",
    RegistrationIsOpen = "REGISTRATION_OPEN",
    NoPlacesLeft = "Мест нет",
    RegistrationIsClosed = "Регистрация закрыта",
    InProgress = "В процессе проведения",
    Completed = "Завершено",
    Hidden = "Скрыто",
    Deleted = "Удалено",
    Error = "Ошибка",
}