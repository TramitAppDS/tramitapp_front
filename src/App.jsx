import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "contexts/AuthContext";
import Router from "./routes";
import Navbar from "./components/Navbar";
import "bulma/css/bulma.min.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
