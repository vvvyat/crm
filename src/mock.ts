const events = [
    {
        id: 0,
        condition: "HIDDEN",
        discriptionText: "Описание 1 описание 1 описание 1 описание 1 описание 1",
        title: "Мероприятие 1",
        adminId: 0,
        managerId: 0,
        eventStartDate: "2024-11-22",
        eventEndDate: "2024-11-30",
        chatUrl: "www/url.ru",
        enrollmentStartDate: "2024-11-01",
        enrollmentEndDate: "2024-11-14",
        numberSeats: 145
    },
    {
        id: 1,
        condition: "HIDDEN",
        discriptionText: "Описание 2 описание 2 описание 2 описание 2 описание 3",
        title: "Мероприятие 2",
        adminId: 1,
        managerId: 1,
        eventStartDate: "2024-12-22",
        eventEndDate: "2024-12-27",
        chatUrl: "www/url.ru",
        enrollmentStartDate: "2024-09-07",
        enrollmentEndDate: "2024-12-14",
        numberSeats: 5
    },
    {
        id: 2,
        condition: "HIDDEN",
        discriptionText: "Описание 3 описание 3 описание 3 описание 3 описание 3",
        title: "Мероприятие 3",
        adminId: 2,
        managerId: 2,
        eventStartDate: "2025-02-01",
        eventEndDate: "2025-02-5",
        chatUrl: "www/url.ru",
        enrollmentStartDate: "2025-01-14",
        enrollmentEndDate: "2025-01-28",
        numberSeats: 180
    }
]

const studentsList = [
    {
        eventId: 1,
        studentId: 1,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Иван',
        lastName: 'Иванович',
        surname: 'Иванов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений, Планирование и организация, Работа под давлением',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 1,
        studentId: 2,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Максим',
        lastName: 'Сергеевич',
        surname: 'Сахаров',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 1,
        studentId: 3,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Данил',
        lastName: 'Константинович',
        surname: 'Максимов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 1,
        studentId: 4,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Михаил',
        lastName: 'Романович',
        surname: 'Горкунов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 2,
        studentId: 5,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Ксения',
        lastName: 'Михайловна',
        surname: 'Зайцева',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 2,
        studentId: 6,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Елена',
        lastName: 'Дмитриевна',
        surname: 'Новокрещенных',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 2,
        studentId: 7,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Глеб',
        lastName: 'Сергеевич',
        surname: 'Чашин',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 8,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Иан',
        lastName: 'Викторович',
        surname: 'Иванов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 9,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Антон',
        lastName: 'Дмитриеевич',
        surname: 'Воложанинов',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 10,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Кирилл',
        lastName: 'Сергеевич',
        surname: 'Ковальчук',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 11,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Екатерина',
        lastName: 'Олеговна',
        surname: 'Мальцева',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 12,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Анна',
        lastName: 'Сергеевна',
        surname: 'Бисерова',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 13,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Елизавета',
        lastName: 'Ивановна',
        surname: 'Архипова',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
    },
    {
        eventId: 3,
        studentId: 14,
        studentStatus: 'Приступил(а) к мероприятию',
        firstName: 'Сергей',
        lastName: 'Максимович',
        surname: 'Курочкин',
        competencies: 'Наблюдательность, Принятие инициативы, Принятие решений',
        telegramUrl: '@telegtamUrl',
        vkUrl: 'vk.com'
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