import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Button } from "@material-tailwind/react";

const CreateModal = ({ isOpen, onClose }) => {
  const redirect = useNavigate();

  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [csdate, setCsDate] = useState("");
  const [qty, setQty] = useState("");

  const data = { customer, material, code, color, date, csdate, qty };
  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Do you want to add data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.post("/colorwindow", data);
          swal(response.data.success, {
            icon: "success",
          });
          redirect("/colorwindow");
        } catch (e) {
          swal("You must fill in any fields", {
            icon: "error",
          });
        }
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="grid place-content-center min-h-screen">
        <div className="relative p-4 w-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Modal
              </h3>
              <button
                onClick={handleClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="grid gap-6 mb-6 md:grid-cols-12">
                <div className="col-span-4">
                  <label
                    htmlFor="material"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Material
                  </label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={material}
                    onChange={(e) => {
                      setMaterial(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="code"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Material Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Material Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="csdate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CS Date
                  </label>
                  <input
                    type="date"
                    id="csdate"
                    name="csdate"
                    value={csdate}
                    onChange={(e) => {
                      setCsDate(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="qty"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="qty"
                    name="qty"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="customer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer
                  </label>
                  <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={customer}
                    onChange={(e) => {
                      setCustomer(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
