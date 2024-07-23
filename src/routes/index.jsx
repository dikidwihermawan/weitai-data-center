import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ColorWindow from "../pages/colorwindow";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/colorwindow" element={<ColorWindow />} />
      </Routes>
    </div>
  );
}
