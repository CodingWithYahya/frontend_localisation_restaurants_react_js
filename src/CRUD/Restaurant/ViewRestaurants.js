import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewRestaurant = () => {
    const [restaurant, setRestaurant] = useState({});
    const { id } = useParams();

    useEffect(() => {
        loadRestaurant();
    }, []);

    const loadRestaurant = async () => {
        const response = await axios.get(`http://localhost:8082/restaurants/${id}`);
            setRestaurant(response.data);
    };

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/Restaurants">
                Retour
            </Link>
            <h1 className="display-4">Détails du restaurant</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">Nom : {restaurant.nom}</li>
                <li className="list-group-item">Adresse : {restaurant.adresse}</li>
                <li className="list-group-item">Description : {restaurant.description}</li>
                <li className="list-group-item">Latitude : {restaurant.latitude}</li>
                <li className="list-group-item">Longitude : {restaurant.longitude}</li>
                <li className="list-group-item">Heure d'ouverture : {restaurant.hourOpened}</li>
                <li className="list-group-item">Heure de fermeture : {restaurant.hourClosed}</li>
                <li className="list-group-item">Zone : {restaurant.zone && restaurant.zone.nom}</li>
                <li className="list-group-item">Ville : {restaurant.zone && restaurant.zone.ville && restaurant.zone.ville.nom}</li>
                <li className="list-group-item">Serie : {restaurant.serie && restaurant.serie.nom}</li>
            </ul>
        </div>
    );
};

export default ViewRestaurant;

