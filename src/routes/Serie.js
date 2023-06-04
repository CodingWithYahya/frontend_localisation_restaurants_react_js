import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar'

const Serie = () => {
    const [series, setSeries] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = async () => {
        const result = await axios.get("http://localhost:8082/series/all");
        setSeries(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8082/series/delete/${id}`);
        loadSeries();
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
                                <th scope="col">Nom De Serie</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {series.map((serie, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{serie.nom}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/ViewSerie/${serie.id}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/EditSerie/${serie.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(serie.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-success mx-2" to="/AddSerie">
                    Ajouter
                </Link>
            </div>
        </div>
    )
}

export default Serie