import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/NavBar";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";

const App = observer( ()=> {

    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false );

    const checkAuth = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API_URL + '/user/auth',
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                user.setUser(response.data);
                user.setIsAuth(true)
                console.log("Работает при перезагрузке");
            }
        } catch (e) {
            console.log(e.status, e.message)
        } finally {
            setLoading(true)
        }
    }

    useEffect(() => {
        checkAuth().then()
    }, []);

    if (!loading) {
        return <div>Проверка авторизации...</div>;
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    )
});

export default App;
