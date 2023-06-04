import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddSpecialite() {

  let navigate = useNavigate();

  const [specialite, setSpecialite] = useState({
    nom: "",
    
  });

  const { nom, } = specialite;

  const onInputChange = (e) => {
    setSpecialite({ ...specialite, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8082/specialites/save", specialite);
    navigate("/specialite");
  };

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter specialite: </h2>

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
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/specialite">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

