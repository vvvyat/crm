import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { events, curatorsList, studentsList } from "../../mock";
import { EventsList } from "./events-list";
import { MyEventsList } from "./my-events-list";
import { EventInfo } from "./event-info";
import { CuratorRequestsList } from "./curator-requests";
import { StudentRequestsList } from "./student-requests";
import { CuratorsList } from "./curators-list";
import { StudentsList } from "./students-list";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={(<Outlet />)}>
                <Route index element={<EventsList events={events} />}></Route>
                <Route path="myEvents" element={<MyEventsList events={events} />}></Route>
                <Route path="eventInfo" element={<EventInfo event={events[0]} />}></Route>
                <Route path="curatorRequests" element={<CuratorRequestsList curators={curatorsList} />}></Route>
                <Route path="studentRequests" element={<StudentRequestsList students={studentsList} />}></Route>
                <Route path="curators" element={<CuratorsList curators={curatorsList} />}></Route>
                <Route path="students" element={<StudentsList students={studentsList} />}></Route>
            </Route>
        </>
    )
)

export const Manager: React.FC = React.memo(() => {
    return <RouterProvider router={router} />
})
