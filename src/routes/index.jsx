import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ColorWindow from "../pages/colorwindow/local";
import CreateColorWindow from "../pages/colorwindow/local/create";
import EditColorWindow from "../pages/colorwindow/local/edit";
import ForwardedToColorWindow from "../pages/colorwindow/forwarded";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="colorwindow" element={<ColorWindow />} />
        <Route path="colorwindow/create" element={<CreateColorWindow />} />
        <Route path="colorwindow/edit/:id" element={<EditColorWindow />} />
        <Route
          path="colorwindow/forward/:id"
          element={<ForwardedToColorWindow />}
        />
      </Routes>
    </div>
  );
}
