import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Authorization } from "./authorization";
import { Header } from "./header";

// профиль
import { ProfileNavigation } from "./profile/profile-navigation";
import { EditProfile } from "./profile/edit-profile";
import { EditEmail } from "./profile/edit-email";
import { EditPassword } from "./profile/edit-password";

// админ
import { EventsList as AdminEvents } from "./administrator/events-list";
import { CreateEvent } from "./administrator/create-event";
import { EventInfo as AdminEventInfo } from "./administrator/event-info";
import { EventSettings } from "./administrator/event-settings";
import { MainNavigation as AdminNavigation } from "./administrator/main-navigation";
import { EventNavigation as AdminEventNavigation } from "./administrator/event-navigation";

import { KanbanBoard } from "./administrator/kanban-board";
import { StudentDataForms } from "./administrator/student-data-forms";
import { RobotsTriggersSettings } from "./administrator/robots-triggers-settings";

// студент
import { EventInfo as StudentEventInfo } from "./student-event-info";
import { EventsList } from "./events-list";

export const App: React.FC = React.memo(() => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <div className="container">
              <Outlet />
            </div>
          }
        >
          <Route
            element={
              <>
                <Header />
                <main className="main">
                  <Outlet />
                </main>
              </>
            }
          >
            <Route index element={<EventsList />}></Route>
            <Route path="event/:id" element={<StudentEventInfo />}></Route>
          </Route>

          <Route
            path="admin"
            element={
              <>
                <Header />
                <main className="admin-main main">
                  <Outlet />
                </main>
              </>
            }
          >
            <Route element={<ProfileNavigation />}>
              <Route path="edit-profile" element={<EditProfile />}></Route>
              <Route path="edit-email" element={<EditEmail />}></Route>
              <Route path="edit-password" element={<EditPassword />}></Route>
            </Route>

            <Route element={<AdminNavigation />}>
              <Route path="events" element={<AdminEvents />}></Route>
              <Route path="create-event" element={<CreateEvent />}></Route>
            </Route>

            <Route path="event/:id" element={<AdminEventNavigation />}>
              <Route path="info" element={<AdminEventInfo />}></Route>
              <Route path="crm" element={<KanbanBoard />}></Route>
              <Route path="settings" element={<EventSettings />}></Route>
              <Route
                path="student-data-forms"
                element={<StudentDataForms />}
              ></Route>
              <Route
                path="setting-up-robots-and-triggers"
                element={<RobotsTriggersSettings />}
              ></Route>
            </Route>
          </Route>

          <Route path="authorization" element={<Authorization />}></Route>

          <Route
            path="*"
            element={
              <p className="not-found-message">Страница не найдена :&#40;</p>
            }
          ></Route>
        </Route>
      </>
    )
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
});
