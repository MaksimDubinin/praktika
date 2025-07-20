import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getProducts} from "../http/ProductApi";
import ProductPage from "./ProductPage";
import {Button, Card, Col, Dropdown, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {addToBasket} from "../http/BasketApi";

const Home = observer(() => {
    const {products} = useContext(Context)
    const {user} = useContext(Context)
    const [type, setType] = useState('Все типы')
    const [text, setText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate();
    const shtuka = "За 1 шт. "
    const grammi = "За 250 г. "

    function search () {
        setSearchQuery(text)
    }
    useEffect(() => {
        getProducts(type).then(data => {
            products.setProducts(data);
        }).catch(error => {
            console.error("Ошибка при загрузке товаров:", error);
        });
    }, []);

    useEffect(() => {
        getProducts(type).then(data => {
            products.setProducts(data);
        }).catch(error => {
            console.error("Ошибка при загрузке товаров:", error);
        });
    }, [type]);


    useEffect(() => {
        getProducts(type).then(data => {
            const filtered = data.filter(product =>
                product.name.toLowerCase().includes(text.toLowerCase())
            );
            products.setProducts(filtered);
        }).catch(console.error);
    }, [searchQuery])

    useEffect(() => {
        if (text === '') {
            setSearchQuery('')
        }
    })

    const productMass = products.getProducts;
    return (
        <div style={{
            width: '80%',
            margin: '0 auto',
            marginTop:'15px'
        }}>
            <div style={{display: 'flex'}}>
                <Dropdown style={{marginLeft: "30px"}}>
                    <Dropdown.Toggle variant="secondary" style={{minWidth: '150px'}}>
                        {'Все типы' && type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setType('Шоколад')
                            setText('')
                        }}>Шоколад</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setType('Печенье')
                            setText('')
                        }}>Печенье</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setType('Конфеты')
                            setText('')
                        }}>Конфеты</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setType('Все типы')
                            setText('')
                        }}>Все типы</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input style={{
                    maxWidth: "60%", marginLeft: "3%",
                    borderColor: "rgb(142,73,221)", borderWidth: "2px"
                }}
                       type="Query" className="form-control"
                       id="Query" aria-describedby="emailHelp"
                       placeholder="Поиск..."
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16"
                     style={{marginLeft: "6px", marginTop: "6px", cursor: "pointer"}}
                    onClick={search}
                    >
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>

            <div className="container mt-4">
                {productMass.length > 0 ? (
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {productMass.map(product => (
                            <Col key={product.id}>
                                <Card
                                    style={{
                                        marginBottom: "15px", borderColor: "rgb(142,73,221)",
                                        cursor: "pointer", minHeight: "500px",
                                        maxHeight: "500px",
                                    }}
                                >
                                    <Card.Img style={{minWidth: "253px", minHeight: "253px"}} variant="top"
                                              src={`http://localhost:5000/${product.img}`}
                                              onClick={() => {
                                                  navigate(`/shop/${product.id}`)
                                              }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.name} </Card.Title>
                                        <Card.Text>Тип "{product.type}"</Card.Text>
                                        <Card.Text>
                                            {product.rating}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"
                                                 style={{marginLeft:"5px", paddingBottom:"5px", color: "#ffb400",}}>
                                                <path
                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                        </Card.Text>
                                        <Card.Text>{product.type === "Шоколад" ? shtuka : grammi} - {product.price} р.</Card.Text>
                                    </Card.Body>
                                    <div style={{
                                        marginTop: "10px", display: "flex",
                                        padding: "10px", justifyContent: "center",
                                        marginBottom: "10px"
                                    }}>
                                        <Button
                                            onClick={() => {
                                                if(user.isAuth) {
                                                    addToBasket(product.id, user.user.id, 1)
                                                }
                                            }}
                                            style={{
                                            background: "rgba(142,73,221, 0.8)", borderColor: "rgb(142,73,221)"
                                        }}>
                                            Добавить в корзину
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        <h4 className="mt-3">Товары не найдены</h4>
                        <p className="text-muted">Попробуйте изменить параметры поиска</p>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                setType("Все типы")
                                setSearchQuery('')
                                setText('')
                            }}
                        >
                            Сбросить фильтры
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Home;