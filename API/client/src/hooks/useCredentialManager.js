import { useReducer } from 'react';

export const CRED_CONTROL = {
    SAVE_USER_INFO: 'Save Info',
    CHANGE_OUTCOME: 'SetOutcome',
    CHANGE_FORM: 'SetChangeForm',
    CHANGE_MODIFIEDFIELD: 'setChangeField',
    SET_UPDATE_USER: 'UpdatedInfo',
    CLEAR_INPUT: 'Reset New',
    NAME_INPUT: 'change newname',
    PASSWORD_INPUT: 'change newpassword'
};

const initialState = {
    changeForm: 'unconfirmed',
    name: '',
    password: '',
    newName: '',
    newPassword: '',
    outcome: '',
    changeField: 'Name',
    item: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case CRED_CONTROL.SAVE_USER_INFO:
            state.name = action.value.name;
            state.password = action.value.password;
            return state = { ...state };
        case CRED_CONTROL.CHANGE_OUTCOME:
            state.outcome = action.value;
            return state = { ...state };
        case CRED_CONTROL.CHANGE_FORM:
            state.changeForm = action.value;
            return state = { ...state };

        case CRED_CONTROL.CHANGE_MODIFIEDFIELD:
            state.changeField = action.value;
            return state = { ...state };

        case CRED_CONTROL.SET_UPDATE_USER:
            state.item = action.value;
            state.outcome = '';
            return state = { ...state };

        case CRED_CONTROL.CLEAR_INPUT:
            state.newName = action.value;
            state.newPassword = action.value;
            return state = { ...state };

        case CRED_CONTROL.NAME_INPUT:
            state.newName = action.value;
            return state = { ...state };

        case CRED_CONTROL.PASSWORD_INPUT:
            state.newPassword = action.value;
            return state = { ...state };

        default:
            return state;
    };

};

const useCrendetialManager = () => {
    const [credentials, setCredentials] = useReducer(reducer, initialState);

    return [credentials, setCredentials];
};

export default useCrendetialManager;


