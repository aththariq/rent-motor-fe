import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cards from "./pages/ProductCard"
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors /> {/* Initialize Toaster */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Cards />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
