import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { events, curatorsList, studentsList } from "../../mock";
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Outlet />}>
                <Route path="authorization"></Route>
                <Route element={<Main/>}>
                    <Route path="user-profile"></Route>
                    <Route element={<MainNavigation/>}>
                        <Route index element={<EventsList events={events} />}></Route>
                        <Route path="create" element={<CreateEvent />}></Route>
                    </Route>
                    <Route path="event/:id" element={<EventNavigation/>}>
                        <Route path="info" element={<EventInfo event={events[0]} />}></Route>
                        <Route path="curators" element={<CuratorsList curators={curatorsList} />}></Route>
                        <Route path="students" element={<StudentsList students={studentsList} />}></Route>
                        <Route path="messages" element={<CreateMessages />}></Route>
                        <Route path="settings" element={<EventSettings event={events[0]}/>}></Route>
                    </Route>
                </Route>
                <Route path="*" element={<p className="not-found-message">Страница не найдена :&#40;</p>}></Route>
            </Route>
        </>
    )
)

export const Administrator: React.FC = React.memo(() => {
    return <RouterProvider router={router} />
})
