import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DemoContextProvider from "./contexts/DemoContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DemoContextProvider>
            <App />
        </DemoContextProvider>
    </StrictMode>
);
