import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/molecules";
import Home from "../pages/home";
import CreateColorWindow from "../pages/colorwindow/create";
import ColorWindow from "../pages/colorwindow";

export default function Router() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/colorwindow" element={<ColorWindow />} />
        <Route
          exact
          path="/colorwindow/create"
          element={<CreateColorWindow />}
        />
      </Routes>
    </div>
  );
}
