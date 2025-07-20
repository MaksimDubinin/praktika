import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button} from "react-bootstrap";

import {createProduct, getProducts} from "../http/ProductApi";
import {getAllOrder, getOrders} from "../http/BasketApi";
import {useNavigate} from "react-router-dom";

const Admin = () => {
    const {products} = useContext(Context);
    const {user} = useContext(Context);
    const [activeSection, setActiveSection] = useState("products")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productMass, setProductMass] = useState([])
    const [orderMass, setOrderMass] = useState([])
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [type, setType] = useState("")
    const [file, setFile] = useState(null)

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
        }
    };

    useEffect(() => {
        getProducts("Все типы").then(data => {
            products.setProducts(data)
            setProductMass(products.getProducts)
            console.log(data)
        }).catch(error => {
            console.error("Ошибка при загрузке товаров:", error);
        });
    }, []);

    useEffect(() => {
        getAllOrder().then(data => {
            setOrderMass(sortOrdersByDate(data))
            console.log(data)
        }).catch(error => {
            console.error("Ошибка при загрузке заказов:", error);
        });
    }, [])

    const sendReq = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                type, name, price,
                img: file
            };

            await createProduct(productData);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error creating product:', err);
        }
    }

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
                (<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {productMass.map((product) => (
                        <div key={product.id} className="card" style={{width: "18rem"}}>
                            <img className="card-img-top" onClick={() => navigate(`/shop/${product.id}`)}
                                 src={`http://localhost:5000/${product.img}`}
                                 alt="Card image cap"
                                style={{cursor: "pointer"}}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Тип: {product.type}</li>
                                <li className="list-group-item">Производитель: Акконд</li>
                                <li className="list-group-item">Оценка: {product.rating}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"
                                         style={{marginLeft: "5px", paddingBottom: "5px", color: "#ffb400",}}>
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </li>
                                <li className="list-group-item">Число отзывов: {product.ratings.length}</li>
                                <li className="list-group-item">Цена за единицу товара: {product.price}</li>
                                <li className="list-group-item">Число товара на складе: {product.quantity}</li>
                            </ul>
                        </div>
                    ))}
                </div>)
                :
                (<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {orderMass.map((item) => (
                        <div key={item.id_order} className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Заказ №: {item.id_order}</h5>
                                <p>Дата: {formatToMsk(item.date)}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Имя пользователя: {item.user.username}</li>
                                <li className="list-group-item">Почта: {item.user.email}</li>
                                <li className="list-group-item">Сумма заказа: {item.total_price}</li>
                            </ul>
                        </div>
                    ))}
                </div>)
            }
            {isModalOpen ? (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "2rem",
                        borderRadius: "8px",
                        maxWidth: "500px",
                        width: "90%",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        position: "relative"
                    }}>
                        <button
                            onClick={() => {
                                setIsModalOpen(false)
                                setName('')
                                setType('')
                                setPrice()
                                setFile(null)
                            }}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "none",
                                border: "none",
                                fontSize: "1.5rem",
                                cursor: "pointer"
                            }}
                        >
                            ×
                        </button>
                        <form onSubmit={sendReq}>
                            <div style={{marginBottom: "1rem"}}>
                                <label htmlFor="name" style={{display: "block", marginBottom: "0.5rem"}}>
                                    Название продукта
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd"
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <label htmlFor="name" style={{display: "block", marginBottom: "0.5rem"}}>
                                    Цена продукта
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd"
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <label style={{display: "block", marginBottom: "0.5rem"}}>
                                    Тип продукта
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value)
                                    }}
                                    name="type"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd"
                                    }}
                                >
                                    <option value="">Выберите тип</option>
                                    <option value="Конфеты">Конфеты</option>
                                    <option value="Шоколад">Шоколад</option>
                                    <option value="Печенье">Печенье</option>
                                </select>
                            </div>
                            <div style={{marginBottom: "1.5rem"}}>
                                <label style={{display: "block", marginBottom: "0.5rem"}}>
                                    Фотография продукта
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{width: "100%"}}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "rgb(185,90,234)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Создать товар
                            </button>
                        </form>
                    </div>
                </div>)
                :
                (<></>)}
        </div>
    );
};

export default Admin;