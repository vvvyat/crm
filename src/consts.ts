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
    id: number;
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
    chatUrl: string;
    numberSeatsStudent: number;
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

export const SERVER_URL = 'https://84.252.132.66/api'

export type AuthorizationInputs = {
    email: string;
    password: string;
}

export enum Roles {
    Administrator = "ADMIN",
    Manager = "MANAGER",
    Curator = "CURATOR",
    Student = "STUDENT",
}

export type RegistrationInputs = {
    lastName: string;
    firstName: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
    competencies: string;
    role: Roles;
    telegramUrl: string;
    vkUrl: string;
}

export type ManagerRegistrationInputs = {
    lastName: string;
    firstName: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
    telegramUrl: string;
    vkUrl: string;
}

export type RegistrationPayload = {
    firstName: string;
    lastName: string;
    surname: string;
    email: string;
    sign: string;
    telegramUrl: string;
    vkUrl: string;
    role: Roles;
    competencies: string;
}

export type UserInfo = {
    id: number;
    firstName: string;
    lastName: string;
    surname: string;
    telegramUrl: string;
    vkUrl: string;
    role_enum: Roles;
    competencies: string;
}

export type EditProfile = {
    firstName: string;
    lastName: string;
    surname: string;
    telegramUrl: string;
    vkUrl: string;
    competencies: string;
}

export type EmailInputs = {
    oldEmail: string;
    newEmail: string;
}

export type PasswordInputs = {
    oldPassword: string;
    newPassword: string;
}

export type Message = {
    id: number;
    eventId: number;
    text: string;
    messageStatus: string;
    editDate: string;
}

export type UpdateMessage = {
    messageId: number;
    text: string;
}

export type MessagesInputs = {
    approvalMessage: string;
    rejectionMessage: string;
}

export type Notification = {
    notificationId: number;
    eventTitle: string;
    messageText: string;
    sent_at: string;
  }