import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditColorWindow() {
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
      text: "Do you want to edit data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.post("/colorwindow/edit", data);
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
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Color Window</h1>
        <Link
          to="/colorwindow"
          className="px-4 py-2 rounded text-sm text-white bg-green-600"
        >
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="px-4 space-y-4">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditColorWindow;
