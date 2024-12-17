import React from "react";
import { Header } from "./header";
import { Outlet } from "react-router-dom";

export const Main: React.FC = React.memo(() => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
})

