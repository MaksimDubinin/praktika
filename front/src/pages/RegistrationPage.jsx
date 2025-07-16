import React from 'react';
import MyForm from "../component/MyForm";
import {observer} from "mobx-react-lite";

const RegistrationPage = observer(() => {
    return (
        <div style={{width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            padding: '20px',
            gap: '15px'
        }}>
            <MyForm/>
        </div>
    );
});

export default RegistrationPage;