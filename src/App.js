import React from "react";
import "./index.css";
import About from "./routes/About";
//import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Restaurants from "./routes/Restaurants";
import Ville from "./routes/Ville";
import Zone from "./routes/Zone";
import Serie from "./routes/Serie";
import Specialite from "./routes/Specialite"
import { Route, Routes } from "react-router-dom";

import RestaurantDetails from "./ClientSide/RestaurantDetails";

import 'bootstrap/dist/css/bootstrap.min.css';
import AddVille from "./CRUD/Ville/AddVille";
import AddZone from "./CRUD/Zone/AddZone";
import AddSerie from "./CRUD/Serie/AddSerie";
import AddSpecialite from "./CRUD/Specialite/AddSpecialite";
import AddRestaurant from "./CRUD/Restaurant/AddRestaurant";


import EditVille from "./CRUD/Ville/EditVille";
import EditZone from "./CRUD/Zone/EditZone";
import EditSerie from "./CRUD/Serie/EditSerie";
import EditSpecialite from './CRUD/Specialite/EditSpecialite';
import EditRestaurant from "./CRUD/Restaurant/EditRestaurants";

import ViewVille from "./CRUD/Ville/ViewVille";
import ViewZone from "./CRUD/Zone/ViewZone";
import ViewSerie from "./CRUD/Serie/ViewSerie";
import ViewSpecialite from "./CRUD/Specialite/ViewSpecialite";
import ViewRestaurant from "./CRUD/Restaurant/ViewRestaurants";
import RestaurantList from "./ClientSide/RestaurantList";
import Login from "./components/Login";




function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/Restaurants" element={ <Restaurants/> } />
      <Route path="/Ville" element={ <Ville/> } />
      <Route path="/Zone" element={ <Zone/> } />
      <Route path="/Serie" element={ <Serie/> } />
      <Route path="/Specialite" element={ <Specialite/> } />
      <Route path="/About" element={ <About/> } />
      <Route path="/Login" element={ <Login/> } />
    
      
      <Route path="/AddVille" element={ <AddVille/> } />
      <Route path="/AddZone" element={ <AddZone/> } />
      <Route path="/AddSerie" element={ <AddSerie/> } />
      <Route path="/AddSpecialite" element={ <AddSpecialite/> } />
      <Route path="/AddRestaurant" element={ <AddRestaurant/> } />

      <Route path="/EditVille/:id" element={ <EditVille/> } />
      <Route path="/EditZone/:id" element={ <EditZone/> } />
      <Route path="/EditSerie/:id" element={ <EditSerie /> } />
      <Route path="/EditSpecialite/:id" element={ <EditSpecialite /> } />
      <Route path="/EditRestaurant" element={ <EditRestaurant/> } />

      <Route path="/ViewVille/:id" element={ <ViewVille /> } />
      <Route path="/ViewZone/:id" element={ <ViewZone /> } />
      <Route path="/ViewSerie/:id" element={ <ViewSerie /> } />
      <Route path="/ViewSpecialite/:id" element={ <ViewSpecialite /> } />
      <Route path="/ViewRestaurants/:id" element={ <ViewRestaurant/> } />

      <Route path="/RestaurantList" element={ <RestaurantList /> } />
      <Route path="/restaurants/:id" component={< RestaurantDetails />} />

    </Routes>
    </>
  );
}

export default App;
