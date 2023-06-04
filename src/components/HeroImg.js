import "./HeroImgStyles.css"
import introImg from "../assets/intro-bg.jpg"
import React from 'react'
import { Link } from "react-router-dom"

const HeroImg = () => {
  return (
    <div className="hero">
        <div className="mask">
            <img className="into-img" src={`https://media-cdn.tripadvisor.com/media/photo-s/15/47/e7/4c/4k-cafe-x2-vibe-bangkok.jpg`} alt="IntroImg" />
        </div>

        <div className="content">
            <p>Hi , Welcome to RestauFinder</p>
            <h1>Find the best restaurants near your location by city</h1>
            <div>
                <Link to="/RestaurantList" className="btn btn-dark" > Restaurants </Link>
                <Link to="/About" className="btn btn-light" > About </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroImg