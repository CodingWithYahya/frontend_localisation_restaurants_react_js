import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddZone() {
  let navigate = useNavigate();

  const [zone, setZone] = useState({
    nom: "",
    ville: {
      id: ""
    }
  });

  const { nom, ville } = zone;

  const [cities, setCities] = useState([]);

  const onInputChange = (e) => {
    if (e.target.name === "nom") {
      setZone({ ...zone, nom: e.target.value });
    } else if (e.target.name === "villenom") {
      const city = cities.find((c) => c.id === e.target.value);
      console.log(e.target.value);
      setZone((prev) => ({ ...prev, ville: { id: e.target.value } }));
      console.log(zone);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/zones/save", zone);
      navigate("/Zone");
    } catch (error) {
      console.error(error.response.data);
    }
  };
  

  useEffect(() => {
    async function fetchCities() {
      const response = await axios.get("http://localhost:8082/villes/all");
      setCities(response.data);
    }
    fetchCities();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter Zone</h2>

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
              <label htmlFor="city" className="form-label">
                Ville
              </label>
              <select
                className="form-control"
                name="villenom"
                value={ville.nom}
                onChange={(e) => onInputChange(e)}
              >
                <option disabled selected >Choisir votre ville  </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nom}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Ajouter
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/Zone">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
