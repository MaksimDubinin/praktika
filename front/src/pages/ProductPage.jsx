import React, {useContext, useEffect, useState} from "react";
import {getOneProduct, sendReview} from "../http/ProductApi";
import {useNavigate, useParams} from "react-router-dom";
import {addToBasket} from "../http/BasketApi";
import {Context} from "../index";
import {Button} from "react-bootstrap";


const ProductPage = () => {
    const [product, setProduct] = useState([])
    const {user} = useContext(Context)
    const hasReviews = Array.isArray(product?.ratings) && product.ratings.length > 0;
    const {id} = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getOneProduct(id).then((data) => {
            setProduct(data)
            console.log(data)
        }).catch(e => {
            console.error("Ошибка при загрузке товара:", e);
        })
    }, []);
    return (
        <div className="product-page" style={{maxWidth: "1200px", margin: "0 auto", padding: "20px"}}>

            <div className="product-container" style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px"}}>
                <div className="gallery">
                    <div className="main-image" style={{
                        height: "400px",
                        marginBottom: "10px"
                    }}>
                        <img
                            src={`http://localhost:5000/${product.img}`}
                            style={{width: "70%", margin: "10%"}}
                            alt={""}
                        />
                    </div>

                </div>

                <div className="product-info">
                    <h1 style={{fontSize: "28px", marginBottom: "10px"}}>{product.name}</h1>

                    <div className="rating" style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
                        <div className="stars" style={{color: "#ffb400", fontSize:"30px"}}>{product.rating} ★</div>
                        <span style={{marginLeft: "10px", color: "#666"}}></span>
                    </div>

                    <div className="price" style={{fontSize: "24px", fontWeight: "bold", margin: "20px 0"}}>
                        <span>{product.price} р.</span>
                    </div>

                    <div className="actions" style={{marginBottom: "30px"}}>
                        <button style={{
                            background: "rgba(142,73,221, 0.8)",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginRight: "15px"
                        }}
                            onClick={async () => {
                                if(user.isAuth) {
                                    await addToBasket(product.id, user.user.id, 1)
                                }
                            }}
                        >
                            Добавить в корзину
                        </button>
                        {hasReviews && user.isAuth ?
                            (
                                <button style={{
                                    background: "rgba(142,73,221, 0.8)",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 24px",
                                    borderRadius: "6px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    marginRight: "15px"
                                }}
                                        onClick={() => {
                                            if (user.isAuth) {
                                                setIsModalOpen(true)
                                            }
                                        }}
                                >
                                    Оставить отзыв
                                </button>
                            )
                            :
                            (<></>)
                        }
                    </div>

                    <div className="specs">
                        <h3 style={{marginBottom: "15px"}}>Характеристики</h3>
                        <table style={{width: "100%", borderCollapse: "collapse"}}>
                            <tbody>
                                <tr style={{borderBottom: "1px solid #eee"}}>
                                    <td style={{padding: "8px 0", color: "#666"}}>Производитель</td>
                                    <td style={{padding: "8px 0", fontWeight: "500"}}>Акконд</td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #eee"}}>
                                    <td style={{padding: "8px 0", color: "#666"}}>Вес</td>
                                    <td style={{padding: "8px 0", fontWeight: "500"}}>
                                        {product.type === "Шоколад" ? "100 г." : "250 г."}
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #eee"}}>
                                    <td style={{padding: "8px 0", color: "#666"}}>Тип товара </td>
                                    <td style={{padding: "8px 0", fontWeight: "500"}}>{product.type}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <section>
                {hasReviews
                    ?
                    (
                    <section style={{marginTop: "60px"}}>
                        <h2 style={{marginBottom: "20px"}}>Количество отзывов: {product.ratings.length}</h2>
                        <div className="reviews-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px"
                        }}>
                            {product.ratings.map(item => (
                                <div key={item.id} style={{
                                    background: "#fff",
                                    borderRadius: "8px",
                                    padding: "20px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                }}>
                                    <div style={{display: "flex", marginBottom: "10px"}}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30" height="30" fill="gray"
                                            className="bi bi-person-circle" viewBox="0 0 16 16"
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                            <path fillRule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                        </svg>
                                        <div style={{marginLeft:"10px"}}>{item.user.username}</div>
                                    </div>
                                    <div style={{color: "#ffb400"}}>
                                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                                    </div>
                                    <p style={{marginTop: "10px", lineHeight: "1.5"}}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                    )
                    :
                    (
                        <div className="text-center py-5">
                            <h4 className="mt-3">Отзывов на данный товар нету</h4>
                            <p className="text-muted">Будьте первым, кто оставит отзыв</p>
                            <Button
                                variant="outline-primary"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Оставить отзыв
                            </Button>
                        </div>
                    )
                }
            </section>
            {isModalOpen && (
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
                            onClick={() => setIsModalOpen(false)}
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

                        <h4>Отзывы о {product.name}</h4>
                        <div style={{marginBottom: "15px"}}>
                            <label>Комментарий:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value)
                                }}
                                style={{
                                    width: "100%",
                                    minHeight: "100px",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                    marginTop: "5px"
                                }}
                                placeholder="Напишите ваш отзыв..."
                            />
                        </div>
                        <div style={{display: "flex", gap: "10px", marginTop: "5px"}}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        color: rating >= star ? "#ffb400" : "#ddd"
                                    }}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <button style={{
                            background: "rgba(142,73,221, 0.8)",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginRight: "15px"
                        }}
                                onClick={async () => {
                                    if(user.isAuth) {
                                        await sendReview(id, rating, comment, user.user.id)
                                        navigate(0);
                                    }
                                }}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;