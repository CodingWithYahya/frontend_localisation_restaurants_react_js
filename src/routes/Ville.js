import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';



const Ville = () => {

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/villes/all");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8082/villes/delete/${id}`);
    loadUsers();
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
              {users.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.nom}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/ViewVille/${user.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/EditVille/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="btn btn-success mx-2" to="/AddVille">
          Ajouter
        </Link>
      </div>
    </div>


  )
}

export default Ville