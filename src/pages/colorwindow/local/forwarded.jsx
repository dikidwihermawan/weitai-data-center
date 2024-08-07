import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ForwardedColorWindow() {
  const params = useParams();

  const redirect = useNavigate();

  const [errors, setErrors] = useState([]);
  const [datas, setDatas] = useState([]);
  const [customer, setCustomer] = useState("");
  const [receiver, setReceiver] = useState("");
  const [qty, setQty] = useState("");
  const [information, setInformation] = useState("");
  const [date, setDate] = useState("");

  const data = { customer, receiver, qty, information, date };

  const getData = async () => {
    const response = await axios.get(`colorwindow/local/forward/${params.id}`);
    setDatas(response.data.data);
    console.log(response.data);
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
          const response = await axios.post(
            `colorwindow/local/forward/${params.id}`,
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
        <h1 className="text-xl font-semibold">Forwarded Color Window</h1>
        <Link
          to="/colorwindow"
          className="px-4 py-2 rounded text-xs text-white bg-green-600"
        >
          Back
        </Link>
      </div>
      <div className="px-4 space-y-4">
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="col-span-2">
            <label
              htmlFor="data_target"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
            >
              Color Window yang ingin dikirim
            </label>
            <input
              type="text"
              disabled
              id="data_target"
              name="data_target"
              value={`${datas.customer} - ${datas.material} ${datas.color}`}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="data_target"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
            >
              Total Quantity
            </label>
            <input
              type="text"
              disabled
              id="data_target"
              name="data_target"
              value={`${datas.qty}`}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          <div className="px-4 space-y-4">
            <div className="grid gap-6 mb-6 md:grid-cols-12">
              <div className="col-span-3">
                <label
                  htmlFor="customer"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Customer
                </label>
                <select
                  id="customer"
                  name="customer"
                  value={customer}
                  onChange={(e) => {
                    setCustomer(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.customer ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                >
                  <option value="" disabled>
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
                  <span className="text-red-600 text-xs">
                    {errors.customer}
                  </span>
                ) : null}
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="receiver"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Penerima
                </label>
                <input
                  type="text"
                  id="receiver"
                  name="receiver"
                  value={receiver}
                  onChange={(e) => {
                    setReceiver(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.receiver ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.receiver ? (
                  <span className="text-red-600 text-xs">
                    {errors.receiver}
                  </span>
                ) : null}
              </div>
              <div className="col-span-3">
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
                  min={1}
                  max={datas.qty}
                  value={qty}
                  autoComplete="off"
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.qty ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.qty ? (
                  <span className="text-red-600 text-xs">{errors.qty}</span>
                ) : null}
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="date"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Tanggal Pinjam
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
                  } text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.date ? (
                  <span className="text-red-600 text-xs">{errors.date}</span>
                ) : null}
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="information"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Informasi
                </label>
                <textarea
                  value={information}
                  onChange={(e) => {
                    setInformation(e.target.value);
                  }}
                  className={`resize-none bg-gray-50 border ${
                    errors.information ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                  name="information"
                  id="information"
                  placeholder="Masukkan Keterangan"
                ></textarea>
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
    </div>
  );
}

export default ForwardedColorWindow;
