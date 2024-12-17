import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { events } from "../../mock";
import { studentsList } from "../../mock";
import { Main } from "../main";
import { ProfileNavigation } from "../profile/profile-navigation";
import { EditProfile } from "../profile/student-curator-edit-profile";
import { EditEmail } from "../profile/edit-email";
import { EditPassword } from "../profile/edit-password";
import { MainNavigation } from "../main-navigation";
import { EventsList } from "../events-list";
import { EventNavigation } from "./event-navigation";
import { StudentsList } from "./students-list";
import { MyEventInfo } from "./my-event-info";
import { MyEventsList } from "./my-events-list";
import { EventInfo } from "./event-info";
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
                        <Route path="event/:id" element={<EventInfo />}></Route>
                        <Route path="my-events" element={<MyEventsList events={events} />}></Route>
                    </Route>
                    <Route path="my-event/:id" element={<EventNavigation/>}>
                        <Route path="info" element={<MyEventInfo event={events[0]} />}></Route>
                        <Route path="students" element={<StudentsList students={studentsList} />}></Route>
                    </Route>
                </Route>
                <Route path="*" element={<p className="not-found-message">Страница не найдена :&#40;</p>}></Route>
            </Route>
        </>
    )
)

export const Curator: React.FC = React.memo(() => {
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
