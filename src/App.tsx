import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/main/Layout";
import Home from "./components/main/Home";
import Login from "./components/main/Login";
import Admin from "./components/main/Admin";
import Delivery from "./components/main/Delivery";
import Pantry from "./components/main/Pantry";
import Patients from "./components/helpers/Patients";
import Analytics from "./components/helpers/Analytics";
import Pantrymanager from "./components/helpers/PantryManager";
import CreateAdmin from "./components/main/CreateAdmin";
import Protected from "./components/helpers/Protected";

const App: React.FC<any> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="admin" element={<Protected element={ <Admin/> }/>}>
              <Route index element={<Patients />}></Route>
              <Route path="patients" element={<Patients />}></Route>
              <Route path="analytics" element={<Analytics />}></Route>
              <Route path="pantry" element={<Pantrymanager />}></Route>
            </Route>
            <Route path="delivery" element={<Protected element={ <Delivery/> }/>}></Route>
            <Route path="pantry" element={<Protected element={ <Pantry/> }/>}></Route>
            <Route path="adminonetwothreefour" element={<CreateAdmin/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;