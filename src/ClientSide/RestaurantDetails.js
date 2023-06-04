import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error loading restaurant details:', error);
    }
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h1>{restaurant.nom}</h1>
          <div className="row">
            <div className="col-md-6">
              <h2>Informations du restaurant</h2>
              <p>Description : {restaurant.description}</p>
              <p>Adresse : {restaurant.adresse}</p>
              <p>Heure d'ouverture : {restaurant.hourOpened}</p>
              <p>Heure de fermeture : {restaurant.hourClosed}</p>
              {/* Autres informations du restaurant */}
            </div>
          </div>
          <div>
            <h2>Photos du restaurant</h2>
            <div className="row">
              {restaurant.photos.map((photo) => (
                <div className="col-md-4" key={photo.id}>
                  <img src={photo.url} alt="Restaurant" className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement des détails du restaurant...</p>
      )}
    </div>
  );
};

export default RestaurantDetails;
