
import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewSerie = () => {
    const [series, setSeries] = useState({
        nom: "",
        
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadSeries();
      }, []);
    
      const loadSeries = async () => {
        const result = await axios.get(`http://localhost:8082/series/${id}`);
        setSeries(result.data);
      };
    
  return (
    <div>
        <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Details sur la Serie des Restaurants</h2>

          <div className="card">
            <div className="card-header">
              Details Sur la serie avec l'id : {series.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom de la serie:</b>
                  {series.nom}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/serie"}>
            Retourner a la page precedente
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ViewSerie

