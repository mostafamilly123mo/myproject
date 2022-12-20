import React, { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Data from "./components/data";
import Addgroup from "./components/addgroup";
import AddUser from "./components/AddUser";
// import  DeleteGroup from './components/DeleteGroup';
import { DataContainer } from "./components/DataContainer";
import Grouppage from "./components/grouppage";
import ShowMember from "./components/ShowMember";
import Filehistory from "./components/Filehistory";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/login/register" element={<Register />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/addgroup" element={<Addgroup />}></Route>
        <Route path="/data" element={<DataContainer />}>
          <Route index element={<Data />} />
          <Route path="addgroup" element={<Addgroup />}></Route>
          <Route path="addgroup" element={<Addgroup />}></Route>
        </Route>
        <Route path="/grouppage" element={<Grouppage />}></Route>
        <Route path="/adduser" element={<AddUser />}></Route>D{" "}
        <Route path="/showmember" element={<ShowMember />}></Route>
        <Route path="/filehistory" element={<Filehistory />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
