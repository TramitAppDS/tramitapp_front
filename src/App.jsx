import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import Navbar from "./components/Navbar";
import "bulma/css/bulma.min.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
