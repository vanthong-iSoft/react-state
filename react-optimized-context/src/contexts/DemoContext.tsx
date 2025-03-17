import createOptimizedContext from "../createOptimizedContext";

type UserAddress = {
    city: string;
};
type UserInfo = {
    firstName: string;
    lastName: string;
    address: UserAddress;
};
export type UserStoreType = {
    user: UserInfo;
};
const initialState = {
    user: { firstName: "Shin", lastName: "", address: { city: "HCM" } },
};

export const {
    OptimizedContextProvider,
    useOptimizedContext,
    useOptimizedDispatch,
} = createOptimizedContext(initialState, {
    persistKey: "userStore",
});
