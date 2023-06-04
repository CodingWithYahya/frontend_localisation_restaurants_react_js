import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import NavigationBar from '../components/NavigationBar'

const Specialite = () => {
    const [specialites, setSpecialites] = useState([]);

    //const { id } = useParams();

    useEffect(() => {
        loadSpecialites();
    }, []);

    const loadSpecialites = async () => {
        const result = await axios.get("http://localhost:8082/specialites/all");
        setSpecialites(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8082/specialites/delete/${id}`);
        loadSpecialites();
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
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialites.map((specialite, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{specialite.nom}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/ViewSpecialite/${specialite.id}`}
                                        >
                                            Afficher
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/EditSpecialite/${specialite.id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(specialite.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-success mx-2" to="/AddSpecialite">
                    Ajouter
                </Link>
            </div>
        </div>
    )
}

export default Specialite