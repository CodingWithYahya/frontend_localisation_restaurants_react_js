import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';

const Zone = () => {

  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadZones();
    loadVilles();
  }, []);

  const loadZones = async () => {
    const result = await axios.get("http://localhost:8082/zones/all");
    setZones(result.data);
  };

  const loadVilles = async () => {
    const result = await axios.get("http://localhost:8082/villes/all");
    setVilles(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8082/zones/delete/${id}`);
    loadZones();
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Ville</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone, index) => {
                const ville = villes.find(ville => zone.ville && ville.id === zone.ville.id);
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{zone.nom}</td>
                    <td>{ville && ville.nom}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/ViewZone/${zone.id}`}>View</Link>
                      <Link className="btn btn-outline-primary mx-2" to={`/EditZone/${zone.id}`}>Edit</Link>
                      <button className="btn btn-danger mx-2" onClick={() => deleteUser(zone.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link className="btn btn-success mx-2" to="/AddZone">Ajouter</Link>
      </div>
    </div>
  )
}

export default Zone;
