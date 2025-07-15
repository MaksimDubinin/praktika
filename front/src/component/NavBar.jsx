import React, {useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Navbar style={{backgroundColor:"purple", opacity:"70%", height:"8vh"}}>
            <Container>
                <NavDropdown title="Dropdown" style={{marginLeft:"10vh"}}>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>


                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{marginRight: "15vh"}}>
                    <Nav>
                        {user.isAuth
                            ?
                            (<>
                                <svg
                                    onClick={()=> navigate('/basket')}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35px" height="35px" fill="black"
                                    className="bi bi-cart4" viewBox="0 0 16 16"
                                    cursor={"pointer"}
                                    style={{marginRight: "30px"}}
                                >
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35" height="35" fill="black"
                                    className="bi bi-person-circle" viewBox="0 0 16 16"
                                    onClick={()=> navigate('/profile')}
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fillRule="evenodd"
                                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </>)
                            :
                            (<Link to="/registration">Войти</Link>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;