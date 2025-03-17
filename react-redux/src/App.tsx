import React from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { setState } from "./stores/slice";

const Textbox: React.FC = () => {
    const firstName = useAppSelector((state) => state.demo.firstName);
    return (
        <div className="grid grid-cols-1 gap-1">
            <span>
                First name: <b>{firstName}</b>
            </span>
        </div>
    );
};
const Navbar: React.FC = () => {
    return <div className="bg-blue-300">Navbar</div>;
};
const Sidebar: React.FC = () => {
    const lastName = useAppSelector((state) => state.demo.lastName);
    return (
        <div className="bg-black/25">
            Last name: <b>{lastName}</b>
        </div>
    );
};
const Content: React.FC<React.PropsWithChildren> = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="bg-gray-400">
            <Textbox />
            <button
                onClick={() => {
                    dispatch(
                        setState({
                            name: "lastName",
                            value: Math.random().toString(),
                        })
                    );
                }}
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
