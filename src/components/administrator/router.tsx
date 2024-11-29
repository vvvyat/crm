import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { events, curatorsList, studentsList } from "../../mock";
import { EventsList } from "./events-list";
import { CreateEvent } from "./create-event";
import { EventInfo } from "./event-info";
import { CuratorsList } from "./curators-list";
import { StudentsList } from "./students-list";
import { EventSettings } from "./event-settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={(<Outlet />)}>
                <Route index element={<EventsList events={events} />}></Route>
                <Route path="create-event" element={<CreateEvent />}></Route>
                <Route path="event-info" element={<EventInfo event={events[0]} />}></Route>
                <Route path="curators" element={<CuratorsList curators={curatorsList} />}></Route>
                <Route path="students" element={<StudentsList students={studentsList} />}></Route>
                <Route path="settings" element={<EventSettings event={events[0]}/>}></Route>
            </Route>
        </>
    )
)

export const Administrator: React.FC = React.memo(() => {
    return <RouterProvider router={router} />
})
