import { useReducer} from 'react';

export const PAGE_CONTROL = {

    ADD_NEW_MESSAGE: "push new message",
    CHANGE_CHANNEL: "channel change",
    SAVE_HUB_CONNECTION: "hub connection",
    LOAD_CHANNEL_MESSAGES: "database messages",
    LOAD_ACTIVE_USERS: "active users",
    SAVE_CHANNEL_ID: "channel Id",
    SAVE_USER_INFO: "user login",
    SAVE_TOKEN: "save token",
    LOAD_LOCAL_STORAGE: "loading storage",
    LOG_OUT: "logout",

};

const initialState = {
    currentChannel: 'general',
    previousChannel: '',
    userName: '',
    userId: '',
    channelId: '',
    messageList: [],
    activeUsersList: [],
    hubConnection: null,
    loggedIn: false,
    jwToken: null
};

const reducer = (state, action) => {
    switch (action.type) {

        case PAGE_CONTROL.ADD_NEW_MESSAGE:
            state.messageList.push(action.value);
            return (state = { ...state });

        case PAGE_CONTROL.CHANGE_CHANNEL:
            if (state.currentChannel !== action.value) {
                state.previousChannel = state.currentChannel;
            };
            state.currentChannel = action.value;
            return (state = { ...state});

        case PAGE_CONTROL.SAVE_HUB_CONNECTION:
            state.hubConnection = action.value;
            return (state = { ...state});

        case PAGE_CONTROL.LOAD_CHANNEL_MESSAGES:
            state.messageList = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.LOAD_ACTIVE_USERS:
                state.activeUsersList = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.SAVE_CHANNEL_ID:
            state.channelId = action.value;
            return (state = { ...state});

        case PAGE_CONTROL.SAVE_USER_INFO:
            state.userName = action.value.name;
            state.userId = action.value.id;
            return (state = { ...state });

        case PAGE_CONTROL.SAVE_TOKEN:
            state.jwToken = action.value;
            state.loggedIn = true;
            return (state = { ...state });

        case PAGE_CONTROL.LOAD_LOCAL_STORAGE:
            return (state = { ...action.value, loggedIn: false, jwToken: null });

        case PAGE_CONTROL.LOG_OUT:
            return (state = { ...initialState });

        default:
            return state;
    };
};

const useSessionData = () => {
    const [session, dispatch] = useReducer(reducer, initialState);

    return [session, dispatch];
};

export default useSessionData;
    

