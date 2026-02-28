import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Team from "./pages/Team";
import Social from "./pages/Social";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/team" element={<Team />} />
      <Route path="/social" element={<Social />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
