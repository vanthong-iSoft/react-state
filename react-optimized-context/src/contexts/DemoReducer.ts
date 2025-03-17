import { UserStoreType } from "./DemoContext";

type Action = { type: string; payload?: unknown };

export default function DemoReducer(state: UserStoreType, action: Action) {
    switch (action.type) {
        case "SET_USER_CITY":
            state.user.address.city = action.payload as string;
            break;
        default:
            break;
    }
}
