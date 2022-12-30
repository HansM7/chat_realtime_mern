import { GET_USERS, GET_USER } from "../Types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    // PAYLOAD DATA QUE SE RECIBE
    const { payload, type } = action;

    switch (type) {
        case GET_USERS:
        return {
            ...state,
            users: payload,
        };
        case GET_USER:
        return {
            ...state,
            selectedUser: payload,
        };
        default:
        return state;
    }
};