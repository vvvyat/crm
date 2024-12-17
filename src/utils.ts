import { Manager } from "./consts";

const FormatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const GetManagerById = (managers: Array<Manager> | undefined, id: number) => {
    return managers?.find((manager) => manager.managerId === id)
}

export {FormatDate, GetManagerById}