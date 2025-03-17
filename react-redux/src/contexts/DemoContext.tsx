import React, { createContext, useState } from "react";

type DemoContextType = {
    firstName: string;
    lastName: string;
};
type DemoContextStateType = DemoContextType & {
    setState: React.Dispatch<React.SetStateAction<DemoContextType>>;
};

export const DemoContext = createContext<DemoContextStateType | null>(null);

const DemoContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, setState] = useState<DemoContextType>({
        firstName: "",
        lastName: "",
    });
    return (
        <DemoContext.Provider
            value={{
                firstName: state.firstName,
                lastName: state.lastName,
                setState,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
};

export default DemoContextProvider;
