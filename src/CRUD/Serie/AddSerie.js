import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



export default function AddSerie() {

    let navigate = useNavigate();
  
    const [series, setSeries] = useState({
      nom: "",
      
    });
  
    const { nom, } = series;
  
    const onInputChange = (e) => {
        setSeries({ ...series, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8082/series/save", series);
      navigate("/serie");
    };
  
    
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Ajouter Serie de restaurants</h2>
  
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your name"
                  name="nom"
                  value={nom}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              
              <button type="submit" className="btn btn-outline-primary">
                Ajouter
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/Serie">
                Annuler
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
