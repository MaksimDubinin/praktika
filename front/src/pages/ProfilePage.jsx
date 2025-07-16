import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";

const ProfilePage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    function logOut () {
        user.setUser(false)
        user.setIsAuth(false)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("isAuth")
        navigate(SHOP_ROUTE)
    }

    return (
        <div style={{marginTop: "5px"}}>
            <button onClick={logOut}>
                Выйти из аккаунта
            </button>
        </div>
    );
});

export default ProfilePage;