export default class DemoAction {
    static setUserCity(city: string) {
        return {
            type: "SET_USER_CITY",
            payload: city,
        };
    }
}
