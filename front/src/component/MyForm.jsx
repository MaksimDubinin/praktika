import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const MyForm = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})/
    const emailRegex = /([a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+)/

    const click = async (e) => {
        try {
            e.preventDefault();
            let data;
            if (location.pathname === LOGIN_ROUTE) {
                if (emailRegex.test(email) && passRegex.test(password)) {
                    data = await login(email, password);
                } else {
                    console.log("email or password is incorrect")
                    return
                }
            } else {
                if (emailRegex.test(email) && passRegex.test(password)) {
                    data = await registration(username, email, password);
                } else {
                    console.log("email or password is incorrect")
                    return
                }
            }
            user.setUser({...data})
            user.setIsAuth(true)
            console.log(user.user)
            await new Promise(resolve => setTimeout(resolve, 0));
            navigate(SHOP_ROUTE);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form style={{
            border: "2px solid",
            borderRadius: "5px",
            borderColor: 'rgba(151,47,227,0.5)',
            width: "100%",
        }}>
            {location.pathname === REGISTRATION_ROUTE
                ?
                (<div style={{padding: '10px 20px 0 20px'}}>
                    <label htmlFor="Username">Имя</label>
                    <input type="Username" className="form-control"
                       id="Username" aria-describedby="emailHelp"
                       placeholder="Максим"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                    />
                </div>)
                : <></>
            }
            <div style={{padding: '10px 20px 5px 20px'}}>
                <div className="form-group">
                    <label htmlFor="Email">Почта</label>
                    <input type="email" className="form-control"
                           id="Email" aria-describedby="emailHelp"
                           placeholder="example@gmail.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Пароль</label>
                    <input
                        type="password" className="form-control"
                        id="Password" placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <small id="emailHelp" className="form-text text-muted">Пароль должен быть не менее 8 символов.</small>
                </div>
            </div>
            <div style={{
                marginLeft: '5px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginRight: '10px', marginBottom: '5px'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {location.pathname === LOGIN_ROUTE
                        ?
                        (<>
                            <p style={{marginRight: "5px", marginLeft:"20px"}}>Нет аккаунта?</p>
                            <Link to={"/registration"}>Зарегистрируйся</Link>
                        </>)
                        :
                        (<>
                            <p style={{marginRight: "5px", marginLeft:"20px"}}>Есть аккаунт?</p>
                            <Link to={"/login"}>Войдите</Link>
                        </>)
                    }
                </div>
                <button
                    style={{}}
                    onClick={click}
                >
                    {location.pathname === LOGIN_ROUTE
                        ? (<>Войти</>)
                        : (<>Зарегистрироваться</>)
                    }
                </button>
            </div>
        </form>
    );
});

export default MyForm;