import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type DemoState = {
    firstName: string;
    lastName: string;
};
type SetStatePayload = {
    name: keyof DemoState;
    value: string;
};
const initialState: DemoState = {
    firstName: "Shin",
    lastName: "",
};
export const demoSlice = createSlice({
    name: "demo",
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<SetStatePayload>) => {
            const fieldName = action.payload.name as keyof DemoState;
            state[fieldName] = action.payload.value;
        },
    },
});

export const { setState } = demoSlice.actions;
export default demoSlice.reducer;
