
import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewVille = () => {
    const [user, setUser] = useState({
        nom: "",
        username: "",
        email: "",
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadUser();
      }, []);
    
      const loadUser = async () => {
        const result = await axios.get(`http://localhost:8082/villes/${id}`);
        setUser(result.data);
      };
    
  return (
    <div>
        <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ville Details</h2>

          <div className="card">
            <div className="card-header">
              Details Sur Ville avec l'id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom :</b>
                  {user.nom}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/ville"}>
            Retourner a la page precedente
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ViewVille

