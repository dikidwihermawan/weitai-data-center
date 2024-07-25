import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ColorWindow from "../pages/colorwindow";
import CreateColorWindow from "../pages/colorwindow/create";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="colorwindow" element={<ColorWindow />} />
        <Route path="colorwindow/create" element={<CreateColorWindow />} />
      </Routes>
    </div>
  );
}
