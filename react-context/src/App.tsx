import React, { useContext } from "react";
import "./App.css";
import { DemoContext } from "./contexts/DemoContext";

const Textbox: React.FC = () => {
    const demoContext = useContext(DemoContext);
    return (
        <div className="grid grid-cols-1 gap-1">
            <span>
                First name: <b>{demoContext?.firstName}</b>
            </span>
        </div>
    );
};
const Navbar: React.FC = () => {
    return <div className="bg-blue-300">Navbar</div>;
};
const Sidebar: React.FC = () => {
    const demoContext = useContext(DemoContext);
    return (
        <div className="bg-black/25">
            {" "}
            Last name: <b>{demoContext?.lastName}</b>
        </div>
    );
};
const Content: React.FC<React.PropsWithChildren> = () => {
    const demoContext = useContext(DemoContext);
    return (
        <div className="bg-gray-400">
            <Textbox />
            <button
                onClick={() =>
                    demoContext?.setState?.((prev) => {
                        prev.lastName = Math.random().toString();
                        return { ...prev };
                    })
                }
            >
                Change last name
            </button>
        </div>
    );
};

const App = () => {
    return (
        <div className="h-screen w-screen bg-gray-200 flex flex-col p-4 gap-4">
            <Navbar />
            <div className="flex-1 grid grid-cols-[1fr_3fr] gap-4">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
};

export default App;
