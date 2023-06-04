import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddRestaurant() {
  let navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    nom: "",
    adresse: "",
    description: "",
    latitude: "",
    longitude: "",
    hourOpened: "",
    hourClosed: "",
    zone: {
      id: "",
    },
    serie: {
      id: "",
    },
    specialite: [],
  });
  const { nom, adresse, description, latitude, longitude, hourOpened, hourClosed, zone, serie, specialite } = restaurant;

  const [zones, setZones] = useState([]);
  const [series, setSeries] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  const onInputChange = (e) => {
    if (e.target.name === "nom") {
      setRestaurant({ ...restaurant, nom: e.target.value });
    } else if (e.target.name === "adresse") {
      setRestaurant({ ...restaurant, adresse: e.target.value });
    } else if (e.target.name === "description") {
      setRestaurant({ ...restaurant, description: e.target.value });
    } else if (e.target.name === "latitude") {
      setRestaurant({ ...restaurant, latitude: e.target.value });
    } else if (e.target.name === "longitude") {
      setRestaurant({ ...restaurant, longitude: e.target.value });
    } else if (e.target.name === "hourOpened") {
      setRestaurant({ ...restaurant, hourOpened: e.target.value });
    } else if (e.target.name === "hourClosed") {
      setRestaurant({ ...restaurant, hourClosed: e.target.value });
    } else if (e.target.name === "zonenom") {
      const zone1 = zones.find((c) => c.id === e.target.value);
      console.log(e.target.value);
      setRestaurant({ ...restaurant, zone: { id: e.target.value } });
      console.log(zone1);
    } else if (e.target.name === "serienom") {
      const serie1 = series.find((c) => c.id === e.target.value);
      console.log(e.target.value);
      setRestaurant({ ...restaurant, serie: { id: e.target.value } });
      console.log(serie1);
    } else if (e.target.name === "specialitenom") {
      const specialite1 = specialites.find((c) => c.id === e.target.value);
      console.log(e.target.value);
      setRestaurant({ ...restaurant, specialite: [{ id: e.target.value }] });
      console.log(specialite1);
    } 
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/restaurants/save", restaurant);
      navigate("/Restaurants");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    async function fetchZones() {
      const response = await axios.get("http://localhost:8082/zones/all");
      setZones(response.data);
    }
    async function fetchSeries() {
      const response = await axios.get("http://localhost:8082/series/all");
      setSeries(response.data);
    }
    async function fetchSpecialites() {
      const response = await axios.get("http://localhost:8082/specialites/all");
      setSpecialites(response.data);
    }
    fetchZones();
    fetchSeries();
    fetchSpecialites();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Ajouter Restaurant</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le nom de la zone"
                  name="nom"
                  value={nom}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="adresse" className="form-label">
                  Adresse
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez l'adresse du restaurant"
                  name="adresse"
                  value={adresse}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez la description du restaurant"
                  name="description"
                  value={description}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="latitude" className="form-label">
                  Latitude
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez la latitude du restaurant"
                  name="latitude"
                  value={latitude}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="longitude" className="form-label">
                  Longitude
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez la longitude du restaurant"
                  name="longitude"
                  value={longitude}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hourOpened" className="form-label">
                  HourOpened
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez l'heure d'ouverture du restaurant"
                  name="hourOpened"
                  value={hourOpened}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hourClosed" className="form-label">
                  HourClosed :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez l'heure de fermeture du restaurant"
                  name="hourClosed"
                  value={hourClosed}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="zonenom" className="form-label">
                  Zone nom:
                </label>
                <select
                  className="form-control"
                  name="zonenom"
                  value={zone.id}
                  onChange={(e) => onInputChange(e)}
                >
                  <option disabled value="">Choisir Votre Zone :</option>
                  {zones.map((zone1) => (
                    <option key={zone1.id} value={zone1.id}>
                      {zone1.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="serienom" className="form-label">
                  Serie nom:
                </label>
                <select
                  className="form-control"
                  name="serienom"
                  value={serie.id}
                  onChange={(e) => onInputChange(e)}
                >
                  <option disabled value="">Choisir votre serie</option>
                  {series.map((serie1) => (
                    <option key={serie1.id} value={serie1.id}>
                      {serie1.nom}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Ajouter
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/Restaurants">
                Annuler
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
