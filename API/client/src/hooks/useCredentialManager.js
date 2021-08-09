import { useReducer } from 'react';

export const CRED_CONTROL = {
    SAVE_USER_INFO: 'Save User Information',
    CHANGE_OUTCOME: 'Result Outcome',
    CHANGE_FORM: 'Change Form',
    CHANGE_MODIFIEDFIELD: 'Change Selected Field',
    SET_UPDATE_USER: 'Save User Update',
    CLEAR_INPUT: 'Clear Input',
    NAME_INPUT: 'Name Input',
    PASSWORD_INPUT: 'Password Input'
};

const initialState = {
    currentForm: 'User Modify',
    savedName: '',
    savedPassword: '',
    name: '',
    password: '',
    outcome: '',
    selectedField: 'Name',
    updatedUser: ''
};

const reducer = (state, action) => {
    switch (action.type) {

        case CRED_CONTROL.SAVE_USER_INFO:
            state.savedName = action.value.name;
            state.savedPassword = action.value.password;
            return state = { ...state };

        case CRED_CONTROL.CHANGE_OUTCOME:
            state.outcome = action.value;
            return state = { ...state };

        case CRED_CONTROL.CHANGE_FORM:
            state.currentForm = action.value;
            return state = { ...state };

        case CRED_CONTROL.CHANGE_MODIFIEDFIELD:
            state.selectedField = action.value;
            return state = { ...state };

        case CRED_CONTROL.SET_UPDATE_USER:
            state.updatedUser = action.value;
            state.outcome = '';
            return state = { ...state };

        case CRED_CONTROL.CLEAR_INPUT:
            state.name = action.value;
            state.password = action.value;
            return state = { ...state };

        case CRED_CONTROL.NAME_INPUT:
            state.name = action.value;
            return state = { ...state };

        case CRED_CONTROL.PASSWORD_INPUT:
            state.password = action.value;
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


