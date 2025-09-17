import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {getOrders} from "../http/BasketApi";
import {Button} from "react-bootstrap";
import axios from "axios";
import {$host} from "../http";

const ProfilePage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [order, setOrder] = useState([])

    function logOut () {

        const {data} = axios.post(
            process.env.REACT_APP_API_URL + '/user/logout',
            {},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        user.setUser({})
        user.setIsAuth(false)
        navigate(SHOP_ROUTE)
    }

    function sortOrdersByDate(orders) {
        return [...orders].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return  dateB - dateA
        });
    }

    const formatToMsk = (isoString) => {
        const date = new Date(isoString);
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}, ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const totalSum = order.reduce((sum, order) => {
        return sum + parseFloat(order.total_price);
    }, 0);

    useEffect(() => {
        getOrders(user.user.id).then((data) => {
            setOrder(sortOrdersByDate(data))
            console.log(data)
        }).catch(e => {
            console.error("Ошибка при загрузке товаров:", e);
        });
    }, [])

    return (
        <div style={{display: "flex", width: "80%"}}>
            <div style={{width: '130vh',
                height: '80%',
                marginLeft: '20vh',
                marginTop:'5px',
                display: "flex"
            }}>
                {order.length !== 0
                    ?
                    (
                        <div style={{width: '130%', marginTop:'5px', marginBottom:'5px'}}>
                            <h1>История заказов</h1>
                            {order.map((item) => (
                                <div key={item.id_order} className="card w-75">
                                    <div className="card-body">
                                        <h5 className="card-title">Заказ №{item.id_order}</h5>
                                        <p className="card-text">Дата заказа: {formatToMsk(item.date)}</p>
                                        <p className="card-text">Сумма заказа: {item.total_price} р.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    (
                        <div className="text-center py-5">
                            <h4 className="mt-3">Вы еще не делали заказы</h4>
                            <p className="text-muted">Оформите заказ в корзине</p>
                            <Button
                                variant="outline-primary"
                                onClick={() => navigate(SHOP_ROUTE)}
                            >
                                Перейти в магазин
                            </Button>
                        </div>
                    )
                }
            </div>
            <div style={{width:"70%", height:"100%",
                backgroundColor: "rgb(243,243,243)", borderRadius: '5px',
                padding: "10px", marginTop:'5px', marginBottom:'5vh', marginLeft: '20vh'
            }}>
                <h2>Профиль</h2>
                <h5>Имя: {user.user.name}</h5>
                <h5>email: {user.user.email}</h5>
                <h5>Кол-во заказов: {order.length}</h5>
                <h5>Сумма заказов: {totalSum} р.</h5>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                       logOut()
                    }}
                >
                    Выйти из аккаунта
                </Button>
            </div>
        </div>
    );
});

export default ProfilePage;