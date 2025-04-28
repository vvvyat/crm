export type EventData = {
    id: number;
    condition: string;
    descriptionText: string;
    title: string;
    adminId: number;
    managerId: number;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeatsStudent: number;
    hasTest: boolean;
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

export type Inputs = {
    title: string;
    descriptionText: string;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeatsStudent: number;
}

export type CreateUpdateEvent = {
    title: string;
    descriptionText: string;
    adminId: number;
    eventStartDate: string;
    eventEndDate: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeatsStudent: number;
    hasTest: boolean;
    testUrl: string | null;
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

export const SERVER_URL = 'https://localhost/api'

export type AuthorizationInputs = {
    email: string;
    password: string;
}

export enum Roles {
    Administrator = "ADMIN",
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

export type ManagerRegistrationPayload = {
    firstName: string;
    lastName: string;
    surname: string;
    email: string;
    sign: string;
    telegramUrl: string;
    vkUrl: string;
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

export type Status = {
    id: number;
    name: string;
    isSystem: boolean;
    displayOrder: number;
    updatedAt: string;
}

export type CreateUpdateStatus = {
    name: string;
    displayOrder: number;
}

export type StatusFormInputs = {
    name: string;
}

export type UpdateStatusOrder = {
    statusId: number; 
    payload: CreateUpdateStatus;
}

/*
type Participant = {
    id: number;
    name: string;
}

export type StageData = {
    id: number;
    title: string; 
    participants: Participant[]
}

export const Stages: StageData[] = [
    {
        id: 50,
        title: 'Отправила(а) персональные данные',
        participants: [
            {
                id: 1,
                name: 'Иванов Иван Иванович',
            },
            {
                id: 2,
                name: 'Петров Петр Петрович',
            },
            {
                id: 3,
                name: 'Сидорова Анна Сергеевна',
            },
            {
                id: 4,
                name: 'Смирнов Алексей Викторович',
            },
        ],
    },
    {
        id: 13131313,
        title: 'Отправила(а) персональные данные',
        participants: [
            {
                id: 1,
                name: 'Иванов Иван Иванович',
            },
            {
                id: 2,
                name: 'Петров Петр Петрович',
            },
            {
                id: 3,
                name: 'Сидорова Анна Сергеевна',
            },
            {
                id: 4,
                name: 'Смирнов Алексей Викторович',
            },
            {
                id: 5,
                name: 'Иванов Иван Иванович',
            },
            {
                id: 6,
                name: 'Петров Петр Петрович',
            },
            {
                id: 7,
                name: 'Сидорова Анна Сергеевна',
            },
            {
                id: 8,
                name: 'Смирнов Алексей Викторович',
            },
            {
                id: 9,
                name: 'Иванов Иван Иванович',
            },
            {
                id: 10,
                name: 'Петров Петр Петрович',
            },
        ],
    },
    {
        id: 1212121,
        title: 'Отправила(а) персональные данные',
        participants: [
            {
                id: 1,
                name: 'Иванов Иван Иванович',
            },
            {
                id: 2,
                name: 'Петров Петр Петрович',
            },
            {
                id: 3,
                name: 'Сидорова Анна Сергеевна',
            },
            {
                id: 4,
                name: 'Смирнов Алексей Викторович',
            },
        ],
    },
    {
        id: 60,
        title: 'Прошел(ла) тестирование',
        participants: [
            {
                id: 5,
                name: 'Кузнецова Екатерина Андреевна',
            },
            {
                id: 6,
                name: 'Николаев Николай Степанович',
            },
            {
                id: 7,
                name: 'Васильева Мария Павловна',
            },
        ],
    },
    {
        id: 70,
        title: 'Добавлен(а) в организационный чат',
        participants: [
            {
                id: 8,
                name: 'Орлов Сергей Валерьевич',
            },
            {
                id: 9,
                name: 'Федотова Ольга Дмитриевна',
            },
            {
                id: 10,
                name: 'Зайцева Светлана Игоревна',
            },
            {
                id: 11,
                name: 'Баранов Василий Александрович',
            },
            {
                id: 12,
                name: 'Лебедев Максим Сергеевич',
            },
        ],
    },
    {
        id: 80,
        title: 'Приступил(а) к практике',
        participants: [
            {
                id: 13,
                name: 'Мартынова Дарья Юрьевна',
            },
            {
                id: 14,
                name: 'Гусев Андрей Николаевич',
            },
        ],
    },
    {
        id: 90,
        title: 'Завершил(а) прохождение практики',
        participants: [
            {
                id: 15,
                name: 'Тихомирова Анастасия Викторовна',
            },
            {
                id: 16,
                name: 'Корнева Юлия Владимировна',
            },
            {
                id: 17,
                name: 'Савельев Валентин Павлович',
            },
            {
                id: 18,
                name: 'Шульгина Светлана Анатольевна',
            },
        ],
    },
]*/