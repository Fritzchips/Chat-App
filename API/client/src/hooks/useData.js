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
    user: '',
    userId: '',
    channelId: '',
    message: '',
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
                state.prevChannel = state.currentChannel;
            }
            return (state = { ...state, currentChannel: action.value });

        case PAGE_CONTROL.SAVE_HUB_CONNECTION:
            return (state = { ...state, hubConnection: action.value });

        case PAGE_CONTROL.LOAD_CHANNEL_MESSAGES:
            state.messageList = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.LOAD_ACTIVE_USERS:
                state.activeUsersList = [...action.value];
            return (state = { ...state });

        case PAGE_CONTROL.SAVE_CHANNEL_ID:
            return (state = { ...state, channelId: action.value });

        case PAGE_CONTROL.SAVE_USER_INFO:
            state.user = action.value.name;
            state.userId = action.value.id;
            return (state = { ...state });

        case PAGE_CONTROL.SAVE_TOKEN:
            state.jwToken = action.value;
            state.loggedIn = true;
            return (state = { ...state });

        case PAGE_CONTROL.LOAD_LOCAL_STORAGE:
            return (state = { ...action.value });

        case PAGE_CONTROL.LOG_OUT:
            return (state = { ...initialState });

        default:
            return state;
    };
};

const useData = () => {
    const [chatRoom, dispatch] = useReducer(reducer, initialState);

    return [chatRoom, dispatch];
};

export default useData;
    

