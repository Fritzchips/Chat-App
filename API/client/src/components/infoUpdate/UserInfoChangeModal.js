import React, { useContext, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { ChatContext } from '../../App';
import useCrendetialManager from '../../hooks/useCredentialManager';
import { CRED_CONTROL } from '../../hooks/useCredentialManager';
import UserVerificationForm from './UserVerificationForm';
import UserModifyForm from './UserModifyForm';


const outerModal = {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100vw"
};

export const FormChangeContext = React.createContext();

const UserInforChangeModal = ({ modalHandler }) => {
    const chat = useContext(ChatContext);
    const [credentials, setCredentials] = useCrendetialManager();

    const authAxios = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${chat.session.jwToken}`
        }
    });

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async()=> {
        const userData = await authAxios.get(`/api/user/getuser/${chat.session.userId}`);
        const response = userData.data;
        setCredentials({ type: CRED_CONTROL.SAVE_USER_INFO, value: response });
    };
        
    return (
        <Container style={outerModal}>
            <FormChangeContext.Provider value={{ credentials: credentials, setCredentials: setCredentials }}>
                
                {credentials.currentForm === "User Modify" ? <UserModifyForm modalHandler={modalHandler} /> : <UserVerificationForm modalHandler={ modalHandler}/>}
            </FormChangeContext.Provider>
        </Container>
    );
}

export default UserInforChangeModal;