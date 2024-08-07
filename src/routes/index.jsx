import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import CreateColorWindow from "../pages/colorwindow/local/create";
import EditColorWindow from "../pages/colorwindow/local/edit";
import CreateForwardedToColorWindow from "../pages/colorwindow/forwarded/create";
import LocalColorWindow from "../pages/colorwindow/local";
import IncomingColorWindow from "../pages/colorwindow/incoming";
import ForwardedColorWindow from "../pages/colorwindow/forwarded";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="colorwindow" element={<LocalColorWindow />} />
        <Route path="colorwindow/local" element={<LocalColorWindow />} />

        <Route
          path="colorwindow/local/create"
          element={<CreateColorWindow />}
        />
        <Route
          path="colorwindow/local/edit/:id"
          element={<EditColorWindow />}
        />
        <Route
          path="colorwindow/forward/:id"
          element={<CreateForwardedToColorWindow />}
        />

        <Route path="colorwindow/incoming" element={<IncomingColorWindow />} />
        <Route
          path="colorwindow/forwarded"
          element={<ForwardedColorWindow />}
        />
      </Routes>
    </div>
  );
}
