import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Carousel from 'react-bootstrap/Carousel';
import './Restaurants.css'; // Import the CSS file


const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [series, setSeries] = useState([]);
  //const [specialites, setSpecialites] = useState([]);
  //const [photos, setPhotos] = useState([]);

  const loadZones = async () => {
    const result = await axios.get('http://localhost:8082/zones/all');
    setZones(result.data);
  };

  const loadVilles = async () => {
    const result = await axios.get('http://localhost:8082/villes/all');
    setVilles(result.data);
  };

  /*const loadPhotos = async () => {
    const result = await axios.get('http://localhost:8082/photos/all');
    setPhotos(result.data);
  };*/

  const loadSeries = async () => {
    const result = await axios.get('http://localhost:8082/series/all');
    setSeries(result.data);
  };

  /*const loadSpecialites = async () => {
    const result = await axios.get('http://localhost:8082/specialites/all');
    setSpecialites(result.data);
  };*/

  //const { id } = useParams();

  useEffect(() => {
    loadRestaurants();
    loadZones();
    loadVilles();
    //loadPhotos();
    loadSeries();
    //loadSpecialites();
  }, []);

  const loadRestaurants = async () => {
    const result = await axios.get('http://localhost:8082/restaurants/all');
    setRestaurants(result.data);
  };

  const deleteRestaurants = async (id) => {
    await axios.delete(`http://localhost:8082/restaurants/delete/${id}`);
    loadRestaurants();
  };

  return (
    <div>
      <NavigationBar />
      <div>
        <div>
          <div className="py-2 ">
            <div className="table-container">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Description</th>
                  <th scope="col">Latitude</th>
                  <th scope="col">Longitude</th>
                  <th scope="col">Heure d'ouverture</th>
                  <th scope="col">Heure de fermeture</th>
                  <th scope="col">Zone</th>
                  <th scope="col">Ville</th>
                  <th scope="col">Serie</th>
                  <th scope="col">Photos</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => {
                  const zone = zones.find((zone) => restaurant.zone && zone.id === restaurant.zone.id);
                  const ville = villes.find((ville) => zone.ville && ville.id === zone.ville.id);
                  const serie = series.find((serie) => restaurant.serie && serie.id === restaurant.serie.id);
                  //const specialite = specialites.find((specialite) => restaurant.specialite && specialite.id === restaurant.specialite.id);

                  //const restaurantPhotos = photos.filter((photo) => restaurant.photo === photos.id);//restaurant.photo && photo.id === restaurant.photo.id
                  //const restaurantPhotos2 = photos.find((photo) => restaurant.photo && photo.id === restaurant.photo.id);


                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{restaurant.nom}</td>
                      <td className="description-cell">{restaurant.adresse}</td>
                      <td className="description-cell">{restaurant.description}</td>
                      <td>{restaurant.latitude}</td>
                      <td>{restaurant.longitude}</td>
                      <td>{restaurant.hourOpened}</td>
                      <td>{restaurant.hourClosed}</td>
                      <td>{zone && zone.nom}</td>
                      <td>{ville && ville.nom}</td>
                      <td>{serie && serie.nom}</td>
                      <td>
                        <Carousel>
                          {restaurant.photos.map((photo) => (
                            <Carousel.Item key={photo.id}>
                              <img className="restaurant-carousel-image" src={photo.url} alt="Restaurant Photo" />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </td>
                      <td>
                        <Link className="btn btn-primary mx-2" to={`/ViewRestaurant/${restaurant.id}`}>
                          View
                        </Link>
                        <Link className="btn btn-outline-primary mx-2" to={`/EditRestaurant/${restaurant.id}`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteRestaurants(restaurant.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <Link className="btn btn-success mx-2" to="/AddRestaurant">
            Ajouter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
