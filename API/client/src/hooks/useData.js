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
    TOKEN_CREATION: "save token",
    LOCAL_STORAGE: "loading storage",
    LOG_OUT: "logout",
    ADD_USER: "remove user"

};

const initialState = {
    channel: 'general',
    prevChannel: '',
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
            if (state.channel !== action.value) {
                state.prevChannel = state.channel;
            }
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
                state.activeUsers = [...action.value];

            return (state = { ...state });

        case PAGE_CONTROL.LOGIN:
            state.user = action.value.name;
            state.userId = action.value.id;
            return (state = { ...state });

        case PAGE_CONTROL.TOKEN_CREATION:
            state.jwToken = action.value;
            state.loggedIn = true;
            return (state = { ...state });

        case PAGE_CONTROL.LOCAL_STORAGE:
            return (state = { ...action.value });

        case PAGE_CONTROL.LOG_OUT:
            return (state = { ...initialState });

        case PAGE_CONTROL.ADD_USER:
            state.activeUsers.push(action.value);

        default:
            return state;
    };
};

const useData = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);

    return [chatRoom, dispatch];
};

export default useData;
    

