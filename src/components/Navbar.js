import { Link } from "react-router-dom"
import "./NavbarStyle.css"

import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <div className="header">
            <Link to="/">
                <h1>RestauFinder</h1>
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"} >
                <li>
                    <Link to="/"> Home </Link>
                </li>
                <li>
                    <Link to="/Restaurants"> Restaurants </Link>
                </li>

                <li>
                    <Link to="/Ville"> Ville </Link>
                </li>
                <li>
                    <Link to="/Zone"> Zone </Link>
                </li>
                <li>
                    <Link to="/Serie"> Serie </Link>
                </li>
                <li>
                    <Link to="/Specialite"> Specialite </Link>
                </li>

                <li>
                    <Link to="/About"> About </Link>
                </li>
            </ul>

        </div>
    )
}

export default Navbar


/* 
<div className="hamburger" onClick={handleClick}>

                {click ? (<FaTimes size={20} style={{ color: "#fff" }} />
                ) : (<FaBars size={20} style={{ color: "#fff" }} />
                )}

            </div>
*/