import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../sidebar";

function ViewStock() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initialData = {
    material: "",
    name: "",
    rack: "",
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

              {/* Rack */}
              <div className="col-span-3">
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
              <div className="col-span-1">
                <label
                  htmlFor="submit"
                  className="block mb-1 font-medium text-gray-900 dark:text-white"
                ></label>
                <div className="flex justify-center p-4 md:p-5 rounded-b dark:border-gray-600 ">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}

export default ViewStock;
