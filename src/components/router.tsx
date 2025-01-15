import React, { useState } from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Authorization } from "./login/authorization";
import { Registration } from "./login/registration";
import { RegistrationWithToken } from "./login/register-with-token";
import { Home } from "./home";
import { Header } from "./header";

// профиль
import { EditProfile as AdminManagerEditProfile } from "./profile/admin-manager-edit-profile";
import { EditProfile as StudentCuratorEditProfile} from "./profile/student-curator-edit-profile";
import { ProfileNavigation } from "./profile/profile-navigation";
import { EditEmail } from "./profile/edit-email";
import { EditPassword } from "./profile/edit-password";

// админ
import { EventsList as AdminEvents } from "./administrator/events-list";
import { CreateEvent } from "./administrator/create-event";
import { EventInfo as AdminEventInfo } from "./administrator/event-info";
import { CuratorsList as AdminCuratirsList } from "./administrator/curators-list";
import { StudentsList as AdminStudentsList } from "./administrator/students-list";
import { EventSettings } from "./administrator/event-settings";
import { MainNavigation as AdminNavigation } from "./administrator/main-navigation";
import { EventNavigation as AdminEventNavigation } from "./administrator/event-navigation";
import { CreateMessages } from "./administrator/messages";
import { InviteManager } from "./administrator/invite-manager";

// куратор
import { MainNavigation } from "./main-navigation";
import { EventsList } from "./events-list";
import { EventNavigation as CuratorEventNavigation } from "./curator/event-navigation";
import { StudentsList as CuratorStudentsList } from "./curator/students-list";
import { MyEventInfo as CuratorMyEventInfo } from "./curator/my-event-info";
import { MyEventsList as CuratorEvents } from "./curator/my-events-list";
import { EventInfo as CuratorEventInfo} from "./curator/event-info";

// руководитель
import { MyEventInfo as ManagerMyEventInfo} from "./manager/my-event-info";
import { CuratorRequestsList } from "./manager/curator-requests";
import { StudentRequestsList } from "./manager/student-requests";
import { CuratorsList as ManagerCuratorsList } from "./manager/curators-list";
import { StudentsList as ManagerStudentsList } from "./manager/students-list";
import { EventInfo as ManagerEventInfo} from "./manager/event-info";
import { MyEventsList as ManagerEvents} from "./manager/my-events-list";
import { EventNavigation as ManagerEventNavigation} from "./manager/event-navigation";

// студент
import { MyEventsList as StudentEvents } from "./student/my-events-list";
import { MyEventInfo as StudentMyEventInfo } from "./student/my-event-info";
import { EventInfo as StudentEventInfo } from "./student/event-info";

export const App: React.FC = React.memo(() => {
    const [user, setUser] = useState(false)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Outlet />}>
                    <Route index element={user ?
                        <Navigate to={'/home'} /> :
                        <Authorization setUser={setUser} />}>
                    </Route>
                    <Route path="home" element={<Home />}>
                    </Route>
                    <Route path="register" element={user ?
                        <Navigate to={'/home'} /> :
                        <Registration />}>
                    </Route>
                    <Route path="register-with-token/:token" element={user ?
                        <Navigate to={'/home'} /> :
                        <RegistrationWithToken />}>
                    </Route>

                    <Route path="admin" element={
                        <>
                            <Header setUser={setUser} />
                            <main>
                                <Outlet />
                            </main>
                        </>}>
                        <Route element={<ProfileNavigation/>}>
                            <Route path="edit-profile" element={<AdminManagerEditProfile />}></Route>
                            <Route path="edit-email" element={<EditEmail />}></Route>
                            <Route path="edit-password" element={<EditPassword />}></Route>
                        </Route>
                        <Route element={<AdminNavigation/>}>
                            <Route path="events" element={<AdminEvents />}></Route>
                            <Route path="create" element={<CreateEvent />}></Route>
                            <Route path="invite-manager" element={<InviteManager />}></Route>
                        </Route>
                        <Route path="event/:id" element={<AdminEventNavigation />}>
                            <Route path="info" element={<AdminEventInfo />}></Route>
                            <Route path="curators" element={<AdminCuratirsList />}></Route>
                            <Route path="students" element={<AdminStudentsList />}></Route>
                            <Route path="messages" element={<CreateMessages />}></Route>
                            <Route path="settings" element={<EventSettings />}></Route>
                        </Route>
                    </Route>
    
                    <Route path="manager" element={
                        <>
                            <Header setUser={setUser} />
                            <main>
                                <Outlet />
                            </main>
                        </>}>
                        <Route element={<ProfileNavigation/>}>
                            <Route path="edit-profile" element={<AdminManagerEditProfile />}></Route>
                            <Route path="edit-email" element={<EditEmail />}></Route>
                            <Route path="edit-password" element={<EditPassword />}></Route>
                        </Route>
                        <Route element={<MainNavigation />}>
                            <Route path="events" element={<EventsList />}></Route>
                            <Route path="event/:id" element={<ManagerEventInfo />}></Route>
                            <Route path="my-events" element={<ManagerEvents />}></Route>
                        </Route>
                        <Route path="my-event/:id" element={<ManagerEventNavigation />}>
                            <Route path="info" element={<ManagerMyEventInfo />}></Route>
                            <Route path="curator-requests" element={<CuratorRequestsList />}></Route>
                            <Route path="student-requests" element={<StudentRequestsList />}></Route>
                            <Route path="curators" element={<ManagerCuratorsList />}></Route>
                            <Route path="students" element={<ManagerStudentsList />}></Route>
                        </Route>
                    </Route>
    
                    <Route path="curator" element={
                        <>
                            <Header setUser={setUser} />
                            <main>
                                <Outlet />
                            </main>
                        </>
                    }>
                        <Route element={<ProfileNavigation/>}>
                            <Route path="edit-profile" element={<StudentCuratorEditProfile />}></Route>
                            <Route path="edit-email" element={<EditEmail />}></Route>
                            <Route path="edit-password" element={<EditPassword />}></Route>
                        </Route>
                        <Route element={<MainNavigation />}>
                            <Route path="events" element={<EventsList />}></Route>
                            <Route path="event/:id" element={<CuratorEventInfo />}></Route>
                            <Route path="my-events" element={<CuratorEvents />}></Route>
                        </Route>
                        <Route path="my-event/:id" element={<CuratorEventNavigation />}>
                            <Route path="info" element={<CuratorMyEventInfo />}></Route>
                            <Route path="students" element={<CuratorStudentsList />}></Route>
                        </Route>
                    </Route>
    
                    <Route path="student" element={
                        <>
                            <Header setUser={setUser} />
                            <main>
                                <Outlet />
                            </main>
                        </>}>
                        <Route element={<ProfileNavigation/>}>
                            <Route path="edit-profile" element={<StudentCuratorEditProfile />}></Route>
                            <Route path="edit-email" element={<EditEmail />}></Route>
                            <Route path="edit-password" element={<EditPassword />}></Route>
                        </Route>
                        <Route element={<MainNavigation />}>
                            <Route path="events" element={<EventsList />}></Route>
                            <Route path="event/:id" element={<StudentEventInfo />}></Route>
                            <Route path="my-events" element={<StudentEvents />}></Route>
                            <Route path="my-event/:id" element={<StudentMyEventInfo />}></Route>
                        </Route>
                    </Route>
    
                    <Route path="*" element={<p className="not-found-message">Страница не найдена :&#40;</p>}></Route>
                </Route>
            </>
        )
    )

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