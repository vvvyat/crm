import { createRoot } from "react-dom/client";
import { App } from "./components/router";

export const root = createRoot(document.getElementById("root")!);
root.render(<App />);