import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './RestaurantList.css';
import { Link } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [zones, setZones] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        loadZones();
        loadPhotos();
        loadSeries();
    }, []);

    const loadZones = async () => {
        try {
            const response = await axios.get('http://localhost:8082/zones/all');
            setZones(response.data);
            loadRestaurants(response.data, series);
        } catch (error) {
            console.error('Error loading zones:', error);
        }
    };

    const loadSeries = async () => {
        try {
            const response = await axios.get('http://localhost:8082/serie/all');
            setSeries(response.data);
            loadRestaurants(zones, response.data);
        } catch (error) {
            console.error('Error loading series:', error);
        }
    };

    const loadRestaurants = async (zonesData, seriesData) => {
        try {
            const response = await axios.get('http://localhost:8082/restaurants/all');
            const restaurantsData = response.data;

            // Récupérer les zones, séries et spécialités associées à chaque restaurant
            const updatedRestaurants = restaurantsData.map((restaurant) => {
                const zone = zonesData.find((zone) => restaurant.zone && zone.id === zone.id);
                const serie = seriesData.find((serie) => restaurant.serie && serie.id === serie.id);

                return {
                    ...restaurant,
                    zone: zone ? zone.nom : '',
                    serie: serie ? serie.nom : '',
                };
            });

            setRestaurants(updatedRestaurants);
        } catch (error) {
            console.error('Error loading restaurants:', error);
        }
    };

    const loadPhotos = async () => {
        try {
            const response = await axios.get('http://localhost:8082/photos/all');
            setPhotos(response.data);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <h1>Liste des restaurants</h1>
            <div className="row justify-content-center m-4">
                {restaurants.map((restaurant) => {
                    return (
                        <div key={restaurant.id} className="col-md-4">
                            <div className="card mb-4">
                                <Carousel>
                                    {restaurant.photos.map((photo) => (
                                        <Carousel.Item key={photo.id}>
                                            <div className="card-img-container">
                                                <img src={photo.url} alt="Restaurant" className="card-img-top" />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <div className="card-body">
                                    <h5 className="card-title text-center" style={{ fontSize: '1.8rem' }}>{restaurant.nom}</h5>
                                    <p className="card-text text-dark description-cell"> <span style={{ fontWeight: 'bold' }}>Description :</span> {restaurant.description}</p>
                                    <p className="card-text text-dark description-cell"><span style={{ fontWeight: 'bold' }}>Adresse :</span> {restaurant.adresse}</p>
                                    <p className="card-text text-dark"><span style={{ fontWeight: 'bold' }}>Heure d'ouverture :</span> {restaurant.hourOpened}</p>
                                    <p className="card-text text-dark"><span style={{ fontWeight: 'bold' }}>Heure de fermeture :</span> {restaurant.hourClosed}</p>
                                    <p className="card-text text-dark"><span style={{ fontWeight: 'bold' }}>Zone :</span> {restaurant.zone}</p>
                                    <p className="card-text text-dark"><span style={{ fontWeight: 'bold' }}>Serie :</span> {restaurant.serie}</p>
                                    {/* Afficher d'autres détails du restaurant si nécessaire */}
                                    <div className="map-container">
                                        <iframe
                                            title="Restaurant Location"
                                            width="100%"
                                            height="200"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0"
                                            src={`https://maps.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=15&output=embed`}
                                        ></iframe>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantList;


/* 
<Link
                                        className="btn btn-primary"
                                        to={`/restaurants/${restaurant.id}`}
                                    >Voir plus</Link>
*/ 