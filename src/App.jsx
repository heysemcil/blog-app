import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Add, Details, Home, Login, Profile, Register } from "./pages/Index";
import PrivateRouter from "./Router/PrivateRouter";

const App = () => {

 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/post/add" element={<Add />} />
        <Route path="/post/edit/:id" element={<Add />} />
        <Route path="/post/details/:id" element={<Details />} />
        <Route path="/post/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
