import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../sidebar";

function CreateStock() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initialData = {
    material: "",
    name: "",
    lot_number: "",
    rack: "",
    qty: "",
    entry_date: "",
    description: "",
  };

  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    swal({
      title: "Apakah Anda yakin?",
      text: "Ingin menambahkan data stok baru ini?",
      icon: "info",
      buttons: ["Batal", "Ya, Simpan"],
      dangerMode: false,
    }).then(async (willSubmit) => {
      if (willSubmit) {
        setErrors({});

        try {
          await axios.post("/stocks", data);

          swal("Berhasil!", "Data stok berhasil ditambahkan.", {
            icon: "success",
          });

          // Reset nilai field state ke semula
          setData(initialData);

          navigate("/stocks");
        } catch (e) {
          if (e.response && e.response.status === 422) {
            const validationErrors = e.response.data.detail;
            const newErrors = {};

            if (Array.isArray(validationErrors)) {
              validationErrors.forEach((err) => {
                const fieldName = err.loc[err.loc.length - 1];
                newErrors[fieldName] = err.msg.replace("Value error, ", "");
              });

              setErrors(newErrors);

              swal(
                "Validasi Gagal!",
                "Mohon periksa kembali inputan form Anda.",
                {
                  icon: "error",
                },
              );
            }
          } else {
            swal("Error!", "Terjadi kesalahan server/jaringan.", {
              icon: "error",
            });
          }
        }
      }
    });
  };

  return (
    <Sidebar>
      <div className="max-w-screen-xl mx-auto">
        <div className="px-4 pt-4 pb-12 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create new Stock</h1>
          <Link
            to="/stocks"
            className="px-4 py-2 rounded text-xs text-white bg-green-600 hover:bg-green-800"
          >
            Back
          </Link>
        </div>
        {/* Tambahkan autoComplete="off" di tag form */}
        <form onSubmit={handleSubmit} method="POST" autoComplete="off">
          <div className="px-4 space-y-4">
            <div className="grid gap-6 mb-6 md:grid-cols-12">
              {/* Material */}
              <div className="col-span-4">
                <label
                  htmlFor="material"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  autoComplete="off"
                  value={data.material}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.material ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.material && (
                  <span className="text-red-600 text-xs">
                    {errors.material}
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="col-span-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  value={data.name}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.name && (
                  <span className="text-red-600 text-xs">{errors.name}</span>
                )}
              </div>

              {/* Lot Number */}
              <div className="col-span-4">
                <label
                  htmlFor="lot_number"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Lot Number
                </label>
                <input
                  type="text"
                  id="lot_number"
                  name="lot_number"
                  autoComplete="off"
                  value={data.lot_number}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.lot_number ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.lot_number && (
                  <span className="text-red-600 text-xs">
                    {errors.lot_number}
                  </span>
                )}
              </div>

              {/* Rack */}
              <div className="col-span-2">
                <label
                  htmlFor="rack"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Rack
                </label>
                <select
                  id="rack"
                  name="rack"
                  value={data.rack}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.rack ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                >
                  <option value="">Rak</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="6A">6A</option>
                  <option value="6B">6B</option>
                  <option value="6C">6C</option>
                </select>
                {errors.rack && (
                  <span className="text-red-600 text-xs">{errors.rack}</span>
                )}
              </div>

              {/* Quantity */}
              <div className="col-span-2">
                <label
                  htmlFor="qty"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  min="0.01"
                  step="any"
                  placeholder="Min 0.01"
                  autoComplete="off"
                  value={data.qty}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.qty ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.qty && (
                  <span className="text-red-600 text-xs">{errors.qty}</span>
                )}
              </div>

              {/* Entry Date */}
              <div className="col-span-2">
                <label
                  htmlFor="entry_date"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Entry Date
                </label>
                <input
                  type="date"
                  id="entry_date"
                  name="entry_date"
                  value={data.entry_date}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.entry_date ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.entry_date && (
                  <span className="text-red-600 text-xs">
                    {errors.entry_date}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="col-span-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  autoComplete="off"
                  value={data.description}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.description ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.description && (
                  <span className="text-red-600 text-xs">
                    {errors.description}
                  </span>
                )}
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
    </Sidebar>
  );
}

export default CreateStock;
