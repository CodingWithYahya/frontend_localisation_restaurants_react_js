import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const ViewRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const [zone, setZone] = useState({});
  const [ville, setVille] = useState({});
  const [photos, setPhotos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/restaurants/${id}`);
      const data = response.data;
      setRestaurant(data);

      if (data.zone) {
        const zoneResponse = await axios.get(`http://localhost:8082/zones/${data.zone.id}`);
        setZone(zoneResponse.data);

        if (zoneResponse.data.ville) {
          const villeResponse = await axios.get(`http://localhost:8082/villes/${zoneResponse.data.ville.id}`);
          setVille(villeResponse.data);
        }
      }

      if (data.photos) {
        const photosResponse = await axios.get(`http://localhost:8082/photos/${data.photos.id}`);
        setPhotos(photosResponse.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const deleteRestaurant = async () => {
    try {
      await axios.delete(`http://localhost:8082/restaurants/delete/${id}`);
      console.log('Restaurant deleted successfully.');
      // Rediriger ou effectuer d'autres actions après la suppression
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Restaurant Details</h2>

            <div className="card">
              <div className="card-header">
                Details du restaurant avec l'id : {restaurant.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Nom :</b> {restaurant.nom}
                  </li>
                  <li className="list-group-item">
                    <b>Adresse :</b> {restaurant.adresse}
                  </li>
                  <li className="list-group-item">
                    <b>Description :</b> {restaurant.description}
                  </li>
                  <li className="list-group-item">
                    <b>Latitude :</b> {restaurant.latitude}
                  </li>
                  <li className="list-group-item">
                    <b>Longitude :</b> {restaurant.longitude}
                  </li>
                  <li className="list-group-item">
                    <b>Heure d'ouverture :</b> {restaurant.hourOpened}
                  </li>
                  <li className="list-group-item">
                    <b>Heure de fermeture :</b> {restaurant.hourClosed}
                  </li>
                  <li className="list-group-item">
                    <b>Zone :</b> {zone && zone.nom}
                  </li>
                  <li className="list-group-item">
                    <b>Ville :</b> {ville && ville.nom}
                  </li>
                  <li className="list-group-item">
                    <b>Photos :</b>
                    <div>
                      {photos &&
                        photos.map((photo) => (
                          <img
                            key={photo.id}
                            src={photo.url}
                            alt="Restaurant Photo"
                            style={{ width: '250px' }}
                          />
                        ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <Link className="btn btn-primary my-2" to="/restaurants">
              Retourner à la page précédente
            </Link>
            <button className="btn btn-danger mx-2" onClick={deleteRestaurant}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRestaurant;
