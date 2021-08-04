import { useReducer} from 'react';

export const PAGE_CONTROL = {
    INPUT: "input",
    SUBMIT: "submit",
    CHANNEL_CHANGE: "channel change",
    CONNECTION: "hub connection",
    CHANNEL_DATA: "database messages",
    USER_DATA: "database users",
    ACTIVE_USERS: "active users",
    CHANNEL_ID: "channel Id",
    LOGIN: "user login",
    TOKEN_CREATION: "save token"

};

const initialState = {
    channel: 'general',
    user: '',
    userId: '',
    channelId: '',
    message: '',
    messageList: [],
    activeUsers: [],
    hubConnection: null,
    loggedIn: false,
    jwToken: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case PAGE_CONTROL.INPUT:
            return (state = { ...state, message: action.value });

        case PAGE_CONTROL.SUBMIT:
            state.messageList.push(action.value);
            return (state = { ...state, message: '' });

        case PAGE_CONTROL.CHANNEL_CHANGE:
            return (state = { ...state, channel: action.value });

        case PAGE_CONTROL.CHANNEL_ID:
            state.channelId = action.value;
            return (state = { ...state });

        case PAGE_CONTROL.CONNECTION:
            state.hubConnection = action.value;
            return state;

        case PAGE_CONTROL.CHANNEL_DATA:
            state.messageList = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.USER_DATA:
            state.activeUsers = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.ACTIVE_USERS:
            state.activeUsers.push(action.value);
            return (state = { ...state });

        case PAGE_CONTROL.LOGIN:
            state.user = action.value.name;
            state.userId = action.value.id;
            return (state = { ...state });

        case PAGE_CONTROL.TOKEN_CREATION:
            state.jwToken = action.value;
            state.loggedIn = true;
            return (state = { ...state });

        default:
            return state;
    };
};

const useData = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);

    return [chatRoom, dispatch];
};

export default useData;
    

