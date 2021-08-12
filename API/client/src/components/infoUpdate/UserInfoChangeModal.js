import React, { useContext, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../../App';
import useCrendetialManager from '../../hooks/useCredentialManager';
import { CRED_CONTROL } from '../../hooks/useCredentialManager';
import UserVerificationForm from './UserVerificationForm';
import UserModifyForm from './UserModifyForm';
import "./styling/ModifyUser.css";

export const FormChangeContext = React.createContext();

const UserInforChangeModal = () => {
    const chat = useContext(ChatContext);
    const [credentials, setCredentials] = useCrendetialManager();

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    useEffect(() => {
        const getUserInfo = async()=> {
            const userData = await authAxios.get(`/api/user/getuser/${chat.session.userId}`);
            const response = userData.data;
            setCredentials({ type: CRED_CONTROL.SAVE_USER_INFO, value: response });
        };
        getUserInfo();
    }, []);
    
    return (
        <Container className="outer-modal-background">
            <FormChangeContext.Provider value={{ credentials: credentials, setCredentials: setCredentials }}>
                {credentials.currentForm === "User Modify" ? <UserModifyForm  /> : <UserVerificationForm />}
            </FormChangeContext.Provider>
        </Container>
    );
}

export default UserInforChangeModal;