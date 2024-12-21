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
    descriptionText: string;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeatsStudent: number;
    managerId: number;
    chatUrl: string;
}

export type CreateUpdateEvent = {
    title: string;
    descriptionText: string;
    adminId: number;
    managerId: number;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeatsStudent: number;
    numberSeatsCurator: number;
    condition: string;
}

export enum EventStatus {
    Preparation = "PREPARATION",
    RegistrationIsOpen = "REGISTRATION_OPEN",
    NoPlacesLeft = "NO_SEATS",
    RegistrationIsClosed = "REGISTRATION_CLOSED",
    InProgress = "IN_PROGRESS",
    Completed = "FINISHED",
    Hidden = "HIDDEN",
    Deleted = "DELETED",
}

export enum StudentCuratorStatus {
    SentRequest = "SENT_PERSONAL_INFO",
    Rejected = "REJECTED_FROM_EVENT",
    AddedInChat = "ADDED_IN_CHAT",
    StartedEvent = "STARTED_EVENT",
    EndedEvent = "ENDED_EVENT",
    Deleted = "DELETED_FROM_EVENT",
}

export const SERVER_URL = 'http://localhost:8080'