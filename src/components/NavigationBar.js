import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import { FaBars, FaTimes } from "react-icons/fa"
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const NavigationBar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/">RestauFinder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleClick} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/RestaurantList" className="nav-link" onClick={() => setClick(false)}>ClientSide</Link>
                        <Link to="/Restaurants" className="nav-link" onClick={() => setClick(false)}>Restaurants</Link>
                        <Link to="/Ville" className="nav-link" onClick={() => setClick(false)}>Ville</Link>
                        <Link to="/Zone" className="nav-link" onClick={() => setClick(false)}>Zone</Link>
                        <Link to="/Serie" className="nav-link" onClick={() => setClick(false)}>Serie</Link>
                        <Link to="/Specialite" className="nav-link" onClick={() => setClick(false)}>Specialite</Link>
                        
                        <Link to="/About" className="nav-link" onClick={() => setClick(false)}>About</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <a className="btn btn-primary ms-md-2" role="button" href="/Login">
                            Login
                        </a>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
        </>
    )
}

export default NavigationBar


/*
<div className="hamburger" onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{ color: "#fff" }} />
                    ) : (<FaBars size={20} style={{ color: "#fff" }} />
                    )}
                </div>
*/