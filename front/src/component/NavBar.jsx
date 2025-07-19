import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Navbar style={{
            background: "linear-gradient(to right, rgba(102, 0, 204, 0.7), rgba(153, 0, 255, 0.7))",
            height: "10vh",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(5px)",
            width: "100%",
        }}
            >
            <Container>
                <a
                    style={{fontSize:"25px", fontWeight:"bold", color:"white", cursor:"pointer"}}
                    onClick={() => {
                        navigate("/shop")
                    }}
                >
                    Карамелька
                </a>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{marginRight: ""}}>
                    <Nav>
                        {user.isAuth
                            ?
                            (<>
                                {user.user.role === "ADMIN" ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                         fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16"
                                         style={{color:"black", marginRight:"30px", paddingTop:"5px",
                                        cursor:"pointer"
                                    }}
                                         onClick={()=> navigate('/profile/admin')}
                                    >
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
                                    </svg>
                                    )
                                    :
                                    (<></>)
                                }
                                <svg
                                    onClick={()=> navigate('/basket')}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40" height="40" fill="black"
                                    className="bi bi-cart4" viewBox="0 0 16 16"
                                    cursor={"pointer"}
                                    style={{marginRight: "30px"}}
                                >
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40" height="40" fill="black"
                                    className="bi bi-person-circle" viewBox="0 0 16 16"
                                    style={{cursor:"pointer"}}
                                    onClick={() => navigate('/profile')}
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fillRule="evenodd"
                                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </>)
                            :
                            (<Button variant="primary" size="lg"
                                     style={{
                                         borderRadius: "10px",
                                         background: "linear-gradient(to left, rgba(102, 0, 204, 0.7), rgba(153, 0, 255, 0.7))",
                                         border: "none",
                            }}
                                    onClick={() => {
                                        navigate("/login")}
                                    }
                            >
                                Войти в аккаунт
                            </Button>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;