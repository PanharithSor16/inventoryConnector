import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreateAccount from "./pages/CreateAccount";
import MasterItem from "./pages/MasterItem";
import SearchTransition from "./pages/Transition"; 
import Transfer from "./pages/Transfer";
import Balance from "./pages/Balance";
import Login from "./pages/Login"; 
import { AuthContext, AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';



export default function App() {

  return (
    <div className="KIT_Connector">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<SearchTransition />} />
              <Route path="/masterItem" element={<MasterItem />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/createAccount" element={<CreateAccount />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
