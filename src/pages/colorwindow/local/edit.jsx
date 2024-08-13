import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditColorWindow() {
  const params = useParams();

  const redirect = useNavigate();

  const [errors, setErrors] = useState([]);
  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [qty, setQty] = useState("");

  const data = { customer, material, color, type, date, qty };

  const getData = async () => {
    const response = await axios.get(`colorwindow/local/edit/${params.id}`);
    setCustomer(response.data.data.customer);
    setMaterial(response.data.data.material);
    setType(response.data.data.type);
    setColor(response.data.data.color);
    setDate(response.data.data.date);
    setQty(response.data.data.qty);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Do you want to update data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.put(
            `colorwindow/local/update/${params.id}`,
            data
          );
          swal(response.data.success, {
            icon: "success",
          });
          redirect("/colorwindow");
        } catch (e) {
          let data = e.response.data.data;
          let arrayBuffer = [];
          data.forEach((element) => {
            arrayBuffer[element.path] = element.msg;
          });
          setErrors(arrayBuffer);
          swal("You must fill in any fields", {
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Color Window</h1>
        <Link
          to="/colorwindow"
          className="px-4 py-2 rounded text-sm text-white bg-green-600"
        >
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} method="PUT">
        <div className="px-4 space-y-4">
          <div className="grid gap-6 mb-6 md:grid-cols-10">
            <div className="col-span-5">
              <label
                htmlFor="customer"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Customer
              </label>
              <select
                onChange={(e) => {
                  setCustomer(e.target.value);
                }}
                name="customer"
                value={customer}
                id="customer"
                className={`bg-gray-50 border ${
                  errors.customer ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              >
                <option value="" selected disabled>
                  PILIH CUSTOMER
                </option>
                <option selected value="TAH SUNG HUNG">
                  TAH SUNG HUNG
                </option>
                <option value="ADIS DIMENSION FOOTWEAR">
                  ADIS DIMENSION FOOTWEAR
                </option>
                <option value="NIKOMAS ADIDAS">NIKOMAS ADIDAS</option>
                <option value="POUCHEN INDONESIA">POUCHEN INDONESIA</option>
                <option value="SEJIN FASHION INDONESIA">
                  SEJIN FASHION INDONESIA
                </option>
                <option value="PARKLAND WORLD INDONESIA I">
                  PARKLAND WORLD INDONESIA I
                </option>
                <option value="PARKLAND WORLD INDONESIA II">
                  PARKLAND WORLD INDONESIA II
                </option>
                <option value="PUMA">PUMA</option>
              </select>
              {errors.customer ? (
                <span className="text-red-600 text-xs">{errors.customer}</span>
              ) : null}
            </div>
            <div className="col-span-5">
              <label
                htmlFor="material"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Material
              </label>
              <select
                onChange={(e) => {
                  setMaterial(e.target.value);
                }}
                name="material"
                value={material}
                id="material"
                className={`bg-gray-50 border ${
                  errors.material ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              >
                <option value="" selected disabled>
                  PILIH MATERIAL
                </option>
                <option value="HAMMER II">HAMMER II</option>
                <option value="VELVET">VELVET</option>
                <option value="BEYOND">BEYOND</option>
                <option value="ROADTRIP">ROADTRIP</option>
                <option value="PLATINUM">PLATINUM</option>
                <option value="VINTAGE">VINTAGE</option>
                <option value="NB VELVET">NB VELVET</option>
                <option value="PUMA">PUMA</option>
              </select>

              {errors.material ? (
                <span className="text-red-600 text-xs">{errors.material}</span>
              ) : null}
            </div>
            <div className="col-span-4">
              <label
                htmlFor="color"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
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
                className={`bg-gray-50 border ${
                  errors.color ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              />
              {errors.color ? (
                <span className="text-red-600 text-xs">{errors.color}</span>
              ) : null}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="type"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                JENIS
              </label>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                }}
                name="type"
                value={type}
                id="type"
                className={`bg-gray-50 border ${
                  errors.type ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              >
                <option value="" selected disabled>
                  PILIH JENIS
                </option>
                <option selected value="COLOR WINDOW">
                  COLOR WINDOW
                </option>
                <option value="COLOR SWATCH">COLOR SWATCH</option>
                <option value="SAMPLE">SAMPLE</option>
              </select>
              {errors.type ? (
                <span className="text-red-600 text-xs">{errors.type}</span>
              ) : null}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="qty"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                autoComplete="off"
                type="number"
                id="qty"
                name="qty"
                min={1}
                max={30}
                placeholder="Min 1"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                className={`bg-gray-50 border ${
                  errors.qty ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              />
              {errors.qty ? (
                <span className="text-red-600 text-xs">{errors.qty}</span>
              ) : null}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="date"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Tanggal Kedatangan
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className={`bg-gray-50 border ${
                  errors.date ? "border-red-600" : "border-gray-300"
                } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
              />
              {errors.date ? (
                <span className="text-red-600 text-xs">{errors.date}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditColorWindow;
