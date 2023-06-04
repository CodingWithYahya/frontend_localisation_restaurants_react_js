
import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewSpecialite = () => {
    const [specialite, setSpecialite] = useState({
        nom: "",
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadSpecialite();
      }, []);
    
      const loadSpecialite = async () => {
        const result = await axios.get(`http://localhost:8082/specialites/${id}`);
        setSpecialite(result.data);
      };
    
  return (
    <div>
        <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Specialite Details</h2>

          <div className="card">
            <div className="card-header">
              Details Sur Specialite avec l'id : {specialite.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom :</b>
                  {specialite.nom}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/specialite"}>
            Retourner a la page precedente
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ViewSpecialite

