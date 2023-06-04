import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditSpecialite() {

  let navigate = useNavigate();

  const { id } = useParams();

  const [specialite, setSpecialite] = useState({
    nom: "",

  });



  const { nom, } = specialite;

  const onInputChange = (e) => {
    setSpecialite({ ...specialite, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSpecialite();
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8082/specialites/${id}`, specialite);
    navigate("/specialite");
  };

  const loadSpecialite = async () => {
    const result = await axios.get(`http://localhost:8082/specialites/${id}`);
    setSpecialite(result.data);
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Specialite</h2>

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
            <Link className="btn btn-outline-danger mx-2" to="/Specialite">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}