import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { Navbar } from "../components/molecules";

export default function Router() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
