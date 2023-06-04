import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditSerie() {

  let navigate = useNavigate();

  const { id } = useParams();

  const [series, setSeries] = useState({
    nom: "",

  });



  const { nom, } = series;

  const onInputChange = (e) => {
    setSeries({ ...series, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSeries();
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8082/series/${id}`, series);
    navigate("/Serie");
  };

  const loadSeries = async () => {
    const result = await axios.get(`http://localhost:8082/series/${id}`);
    setSeries(result.data);
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Serie</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Nom de Serie
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
            <Link className="btn btn-outline-danger mx-2" to="/serie">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}