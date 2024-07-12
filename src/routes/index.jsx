import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/molecules";
import Home from "../pages/home";
import ColorWindow from "../pages/colorwindow";

export default function Router() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/colorwindow" element={<ColorWindow />} />
      </Routes>
    </div>
  );
}
