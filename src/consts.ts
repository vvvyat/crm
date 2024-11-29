export type Event = {
    id: number;
    condition: string;
    discriptionText: string;
    title: string;
    adminId: number;
    managerId: number;
    eventStartDate: string;
    eventEndDate: string;
    chatUrl: string;
    enrollmentStartDate: string;
    enrollmentEndDate: string;
    numberSeats: number;
}

export type Student = {
    eventId: number;
    studentId: number;
    studentStatus: string;
    firstName: string;
    lastName: string;
    surname: string;
    competencies: string;
    telegramUrl: string;
    vkUrl: string;
}

export type Curator = {
    eventId: number;
    curatorId: number;
    firstName: string;
    lastName: string;
    surname: string;
    telegramUrl: string;
    vkUrl: string;
}