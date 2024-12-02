import { createContext } from "react";

export const ExitCreateContext = createContext<{
    isModalOpen: boolean,
    //isCreateFormEmpty: boolean
}>({
    isModalOpen: false,
    //isCreateFormEmpty: true
})