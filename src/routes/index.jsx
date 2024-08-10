import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LocalColorWindow from "../pages/colorwindow/local";
import CreateColorWindow from "../pages/colorwindow/local/create";
import EditColorWindow from "../pages/colorwindow/local/edit";
import CreateSendToColorWindow from "../pages/colorwindow/local/send";
import IncomingColorWindow from "../pages/colorwindow/incoming";
import SendColorWindow from "../pages/colorwindow/send";

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
          path="colorwindow/local/send/:id"
          element={<CreateSendToColorWindow />}
        />
        <Route path="colorwindow/send" element={<SendColorWindow />} />
        <Route path="colorwindow/incoming" element={<IncomingColorWindow />} />
      </Routes>
    </div>
  );
}
