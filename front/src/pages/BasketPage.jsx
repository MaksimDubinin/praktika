import React, {useContext, useEffect, useState} from 'react';
import {createOrder, deleteFromBasket, getBasketContent} from "../http/BasketApi";
import {Context} from "../index";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";


const BasketPage = () => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const navigate = useNavigate();
    const [content, setContent] = useState([])

    useEffect(() => {
        getBasketContent(user.user.id).then((data) => {
            basket.setBasket(data);
            setContent(data)
            console.log(data)
        }).catch(e => {
            console.error("Ошибка при загрузке товаров:", e);
        });
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {content.length === 0
                ?
                (
                <div className="text-center py-5">
                    <h4 className="mt-3">Ваша корзина пуста</h4>
                    <p className="text-muted">Загляните на главную и добавьте товары в корзину</p>
                    <Button
                        variant="outline-primary"
                        onClick={() => navigate(SHOP_ROUTE)}
                    >
                        Перейти в магазин
                    </Button>
                </div>
                )
                :
                (
                <div>
                    <div style={{
                        width: '130vh',
                        height: '80%',
                        margin: '0 auto',
                        marginTop:'5px',
                        alignItems:'space-between',
                        display: "flex"
                    }}>
                        <div style={{width:"50%", marginLeft: '50px', height:"50%"}}>
                            <h1>Корзина</h1>
                            <h4>Количество позиций: {content.length}</h4>
                            {content.map((item) => (
                                <div key={item.id} className="card mb-3" style={{maxWidth: "540px", backgroundColor: "rgb(254,254,254)", marginBottom:"5px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={`http://localhost:5000/${item.product.img}`} className="card-img" alt="..."
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    navigate(`/shop/${item.product.id}`)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.product.name}</h5>
                                                <p className="card-text">Рейтинг: {item.product.rating}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="currentColor" className="bi bi-star-fill"
                                                         viewBox="0 0 16 16"
                                                         style={{marginLeft: "5px", paddingBottom: "5px", color:"rgb(244,219,90)"}}>
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                    </svg>
                                                </p>
                                                <p className="card-text">Количество: {item.product.type === "Шоколад" ? `${item.quantity}` : `${item.quantity * 250} г.`}</p>
                                                <p className="card-text">Цена: {item.quantity * item.product.price} р.</p>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "end"}}>
                                                <Button
                                                    style={{marginBottom:"10px", marginRight:"10px",
                                                        background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"
                                                    }}
                                                    onClick={async () => {
                                                        await deleteFromBasket(item.product.id, user.user.id)
                                                        navigate(0)
                                                    }}>
                                                    Удалить
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{width:"50%", marginLeft: '50px', height:"50%",
                            backgroundColor: "rgb(250,250,250)", borderRadius: '5px'
                            , boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop:'10px'
                        }} >
                            <h1 style={{padding:"10px"}}>Итого</h1>
                            <h3 style={{padding:"10px"}}>Товары, {content.length} шт.</h3>
                            <h3 style={{padding:"10px"}}>К оплате: {content[0].basket.total_price} р.</h3>
                            <div style={{display: "flex", justifyContent: "end"}}>
                                <Button style={{
                                    marginRight:"10px", marginBottom:"10px",
                                    background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"
                                }}
                                    onClick={async () => {
                                        await createOrder(user.user.id)
                                        navigate(0);
                                    }}
                                >
                                Оформить заказ</Button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default BasketPage;