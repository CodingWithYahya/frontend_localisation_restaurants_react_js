import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditZone = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [zone, setZone] = useState({
    nom: "",
    ville: {
      id: ""
    }
  });

  const { nom, ville } = zone;

  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchZone() {
      const response = await axios.get(`http://localhost:8082/zones/${id}`);
      setZone(response.data);
    }
    fetchZone();
  }, [id]);

  useEffect(() => {
    async function fetchCities() {
      const response = await axios.get("http://localhost:8082/villes/all");
      setCities(response.data);
    }
    fetchCities();
  }, []);

  const onInputChange = (e) => {
    if (e.target.name === "nom") {
      setZone({ ...zone, nom: e.target.value });
    } else if (e.target.name === "villenom") {
      const city = cities.find((c) => c.id === e.target.value);
      setZone((prev) => ({ ...prev, ville: { id: e.target.value } }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/zones/${id}`, zone);
      navigate("/Zone");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifier Zone</h2>

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
                value={ville.id}
                onChange={(e) => onInputChange(e)}
              >
                <option disabled selected>Choisir votre ville</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nom}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Modifier
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/Zone">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditZone;
