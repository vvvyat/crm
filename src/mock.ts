const events = [
    {
        adminId: 0,
        chatUrl: "www/url.ru/очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка/очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка_/очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка_очень_длинная_ссылка",
        condition: 'В процессе проведения',
        descriptionText: "Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1 Описание 1 описание 1 описание 1 описание 1 описание 1",
        enrollmentEndDate: "2024-11-14",
        enrollmentStartDate: "2024-11-01",
        eventEndDate: "2024-11-30",
        eventStartDate: "2024-11-22",
        id: 0,
        managerId: 0,
        numberSeatsCurator: 5,
        numberSeatsStudent: 145,
        title: "Мероприятие 1"
    },
    {
        adminId: 1,
        chatUrl: "www/url.ru",
        condition: 'Мест нет',
        descriptionText: "Описание 2 описание 2 описание 2 описание 2 описание 2",
        enrollmentEndDate: "2024-12-14",
        enrollmentStartDate: "2024-09-07",
        eventEndDate: "2024-12-27",
        eventStartDate: "2024-12-22",
        id: 1,
        managerId: 1,
        numberSeatsCurator: 1,
        numberSeatsStudent: 5,
        title: "Мероприятие 2"
    },
    {
        adminId: 2,
        chatUrl: "www/url.ru",
        condition: 'Подготовка',
        descriptionText: "Описание 3 описание 3 описание 3 описание 3 описание 3",
        enrollmentEndDate: "2025-01-28",
        enrollmentStartDate: "2025-01-14",
        eventEndDate: "2025-02-5",
        eventStartDate: "2025-02-01",
        id: 2,
        managerId: 2,
        numberSeatsCurator: 3,
        numberSeatsStudent: 180,
        title: "Мероприятие 3"
    }
]

const studentsList = [
    {
        eventId: 1,
        studentId: 1,
        statusRequest: 'Приступил(а) к мероприятию',
        firstName: 'Иван',
        lastName: 'Иванович',
        surname: 'Иванов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений, Планирование и организация, Работа под давлением',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com',
        curatorFirstName: '',
        curatorLastName: '',
        curatorSurname: ''
    },
    {
        eventId: 1,
        studentId: 2,
        statusRequest: 'Приступил(а) к мероприятию',
        firstName: 'Максим',
        lastName: 'Сергеевич',
        surname: 'Сахаров',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com',
        curatorFirstName: '',
        curatorLastName: '',
        curatorSurname: ''
    }
]

const curatorsList = [
    {
        eventId: 1,
        curatorId: 1,
        firstName: 'Вячеслав',
        lastName: 'Максимович',
        surname: 'Чернышев',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 1,
        curatorId: 2,
        firstName: 'Максим',
        lastName: 'Всеволодович',
        surname: 'Головин',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    }
]

export {events, curatorsList, studentsList}