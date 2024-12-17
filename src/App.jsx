import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cards from "./pages/ProductCard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Cards />} />
      </Routes>
    </Router>
  );
}

export default App;
