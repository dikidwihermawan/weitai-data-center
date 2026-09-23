import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import PurchaseOrder from "../pages/purchaseorder";
import LocalColorWindow from "../pages/colorwindow/local";
import CreateColorWindow from "../pages/colorwindow/local/create";
import EditColorWindow from "../pages/colorwindow/local/edit";
import CreateSendToColorWindow from "../pages/colorwindow/send/create";
import SendColorWindow from "../pages/colorwindow/send";
import BorrowColorWindow from "../pages/colorwindow/borrow";
import NotFound from "../error/404";
import Stock from "../pages/stock";
import CreateStock from "../pages/stock/local/create";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="purchaseorder" element={<PurchaseOrder />} />
        <Route path="stocks" element={<Stock />} />
        <Route path="stocks/create" element={<CreateStock />} />
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
        <Route path="colorwindow/borrow" element={<BorrowColorWindow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
