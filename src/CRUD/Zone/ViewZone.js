
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewZone = () => {

  
  const [zone, setZone] = useState({
    nom: "",
    ville: {
      id: ""
    }
  });
  //const { nom, ville } = zone;

  const { id } = useParams();

  useEffect(() => {
    loadUser(id);
  }, [id]);

  const [ville, setVille] = useState("");

  const loadVille = async () => {
    const result = await axios.get(`http://localhost:8082/villes/${zone.ville.id}`);
    setVille(result.data.nom);
    console.log(result.data.nom);
  };

  useEffect(() => {
    loadVille();
  }, [zone.ville.id]);

  const loadUser = async () => {
    console.log("Fetching zone details for id:", id);
    const result = await axios.get(`http://localhost:8082/zones/${id}`);
    setZone(result.data);
    console.log(result.data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Zone Details</h2>

            <div className="card">
              <div className="card-header">
                Details Sur Zone avec l'id : {zone.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Nom Zone :</b>
                    {zone.nom}
                  </li>
                  <li className="list-group-item">
                    <b>Nom Ville:</b>
                    {ville}
                  </li>

                </ul>
              </div>
            </div>
            <Link className="btn btn-primary my-2" to={"/zone"}>
              Retourner a la page precedente
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewZone

