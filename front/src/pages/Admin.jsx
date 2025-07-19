import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button} from "react-bootstrap";

import {getProducts} from "../http/ProductApi";
import {getAllOrder, getOrders} from "../http/BasketApi";

const Admin = () => {
    const {products} = useContext(Context);
    const {user} = useContext(Context);
    const [activeSection, setActiveSection] = useState("products")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productMass, setProductMass] = useState([])
    const [orderMass, setOrderMass] = useState([])

    useEffect(() => {
        getProducts("Все типы").then(data => {
            products.setProducts(data)
            setProductMass(products.getProducts)
        }).catch(error => {
            console.error("Ошибка при загрузке товаров:", error);
        });
    }, []);

    useEffect(() => {
        getAllOrder().then(data => {
            setOrderMass(data)
            console.log(data)
        }).catch(error => {
            console.error("Ошибка при загрузке заказов:", error);
        });
    }, [])

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px'}}>
            <h1 style={{ marginBottom: '24px' }}>Админ-панель</h1>
            <div>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '24px',
                    paddingBottom: '15px'
                }}>
                    <Button style={{background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"}}
                        onClick={() => setActiveSection('products')}
                    >
                        Товары
                    </Button>
                    <Button style={{background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"}}
                        onClick={() => setActiveSection('orders')}
                    >
                        Заказы
                    </Button>
                    <Button style={{background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"}}
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Создать товар
                    </Button>
                </div>
            </div>
            {activeSection === 'products' ?
                (<div>
                    {productMass.map((product) => (
                        <h1 key={product.id}>{product.name}</h1>
                    ))}
                </div>)
                :
                (<div>
                    {orderMass.map((order) => (
                        <h1 key={order.id_order}>{order.id_order}</h1>
                    ))}
                </div>)
            }
            {isModalOpen ? (<div>1</div>) : (<></>)}
        </div>
    );
};

export default Admin;