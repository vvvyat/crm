import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import { events } from "../../mock";
import { EventsList } from "./events-list";
import { MyEventsList } from "./my-events-list";
import { EventInfo } from "./event-info";
import { MyEventInfo } from "./my-event-info";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={(<Outlet />)}>
                <Route index element={<EventsList events={events} />}></Route>
                <Route path="myEvents" element={<MyEventsList events={events} />}></Route>
                <Route path="eventInfo" element={<EventInfo event={events[0]} />}></Route>
                <Route path="myEventInfo" element={<MyEventInfo event={events[0]} />}></Route>
            </Route>
        </>
    )
)

export const Student: React.FC = React.memo(() => {
    return <RouterProvider router={router} />
})
