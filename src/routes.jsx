import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "views/Home";
import UserSignInPage from "layouts/user/sign-in";
import UserSignUpPage from "layouts/user/sign-up";
import TramiterSignInPage from "layouts/tramiter/sign-in";
import TramiterSignUpPage from "layouts/tramiter/sign-up";
import AvailableProceduresPage from "layouts/procedures/available-procedures";
import Profile from "views/Profile";
import NotFound from "views/NotFound";
import AuthContextProvider from "contexts/AuthContext";
import SolicitarTramite from "./views/SolicitarTramite";

export default function Router() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<UserSignInPage />} />
        <Route path="/sign-up" element={<UserSignUpPage />} />
        <Route path="/tramiter-sign-in" element={<TramiterSignInPage />} />
        <Route path="/tramiter-sign-up" element={<TramiterSignUpPage />} />
        <Route path="/available-procedures" element={<AvailableProceduresPage />} />
         <Route path="/solicitar-tramite" element={<SolicitarTramite />} />
      </Routes>
    </AuthContextProvider>
  );
}
