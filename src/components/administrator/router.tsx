import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { EventsList } from "./events-list";
import { CreateEvent } from "./create-event";
import { EventInfo } from "./event-info";
import { CuratorsList } from "./curators-list";
import { StudentsList } from "./students-list";
import { EventSettings } from "./event-settings";
import { Main } from "./main";
import { MainNavigation } from "./main-navigation";
import { EventNavigation } from "./event-navigation";
import { CreateMessages } from "./messages";
import { EditProfile } from "../profile/admin-manager-edit-profile";
import { ProfileNavigation } from "../profile/profile-navigation";
import { EditEmail } from "../profile/edit-email";
import { EditPassword } from "../profile/edit-password";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Outlet />}>
                <Route path="authorization"></Route>
                <Route element={<Main/>}>
                    <Route element={<ProfileNavigation/>}>
                        <Route path="edit-profile" element={<EditProfile/>}></Route>
                        <Route path="edit-email" element={<EditEmail />}></Route>
                        <Route path="edit-password" element={<EditPassword />}></Route>
                    </Route>
                    <Route element={<MainNavigation/>}>
                        <Route index element={<EventsList />}></Route>
                        <Route path="create" element={<CreateEvent />}></Route>
                    </Route>
                    <Route path="event/:id" element={<EventNavigation/>}>
                        <Route path="info" element={<EventInfo />}></Route>
                        <Route path="curators" element={<CuratorsList />}></Route>
                        <Route path="students" element={<StudentsList />}></Route>
                        <Route path="messages" element={<CreateMessages />}></Route>
                        <Route path="settings" element={<EventSettings />}></Route>
                    </Route>
                </Route>
                <Route path="*" element={<p className="not-found-message">Страница не найдена :&#40;</p>}></Route>
            </Route>
        </>
    )
)

export const Administrator: React.FC = React.memo(() => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
})
