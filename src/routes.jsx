import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "views/Home";
import UserSignInPage from "layouts/user/sign-in";
import UserSignUpPage from "layouts/user/sign-up";
import TramiterSignInPage from "layouts/tramiter/sign-in";
import TramiterSignUpPage from "layouts/tramiter/sign-up";
import TramiterProceduresPage from "layouts/tramiter/my-procedures";
import Profile from "views/Profile";
import NotFound from "views/NotFound";
import SolicitarTramite from "views/SolicitarTramite";
import UserProcedureInfoPage from "layouts/user/procedure-info";
import TramiterProcedureInfoPage from "layouts/tramiter/procedure-info";
import EditPaymentInfo from "views/EditPaymentInfo";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-in" element={<UserSignInPage />} />
      <Route path="/sign-up" element={<UserSignUpPage />} />
      <Route path="/tramiter-sign-in" element={<TramiterSignInPage />} />
      <Route path="/tramiter-sign-up" element={<TramiterSignUpPage />} />
      <Route path="/request-procedure" element={<SolicitarTramite />} />
      <Route path="/tramiter-procedures" element={<TramiterProceduresPage />} />
      <Route path="/user-procedure-info" element={<UserProcedureInfoPage />} />
      <Route path="/tramiter-procedure-info" element={<TramiterProcedureInfoPage />} />
      <Route path="/edit-payment-info" element={<EditPaymentInfo />} />
    </Routes>
  );
}
