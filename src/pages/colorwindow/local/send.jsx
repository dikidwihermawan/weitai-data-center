import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CreateSendColorWindow() {
  const params = useParams();

  const redirect = useNavigate();

  const [errors, setErrors] = useState([]);
  const [datas, setDatas] = useState([]);
  const [recipient_customer, setRecipientCustomer] = useState("");
  const [recipient_name, setRecipientName] = useState("");
  const [recipient_qty, setRecipientQty] = useState("");
  const [recipient_information, setRecipientInformation] = useState("");
  const [recipient_date, setRecipientDate] = useState("");
  const [recipient_status, setRecipientStatus] = useState("");

  const data = {
    recipient_customer,
    recipient_name,
    recipient_qty,
    recipient_information,
    recipient_date,
    recipient_status,
  };

  const getData = async () => {
    const response = await axios.get(`colorwindow/local/send/${params.id}`);
    setDatas(response.data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Do you want to create data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.post(
            `colorwindow/local/send/${params.id}`,
            data
          );
          swal(response.data.success, {
            icon: "success",
          });
          redirect("/colorwindow/send");
        } catch (e) {
          swal("You must fill in any fields", {
            icon: "error",
          });
          let data = e.response.data.data;
          let arrayBuffer = [];
          data.forEach((element) => {
            arrayBuffer[element.path] = element.msg;
          });
          setErrors(arrayBuffer);
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
        <h1 className="text-xl font-semibold">Send Color Window</h1>
        <Link
          to="/colorwindow"
          className="px-4 py-2 rounded text-xs text-white bg-green-600"
        >
          Back
        </Link>
      </div>
      <div className="px-4 space-y-4">
        <div className="grid grid-cols-10 gap-3 p-4">
          <div className="col-span-7">
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
          <div className="col-span-3">
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
            <div className="grid gap-6 mb-6 md:grid-cols-10">
              <div className="col-span-2">
                <label
                  htmlFor="recipient_customer"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Customer
                </label>
                <select
                  id="recipient_customer"
                  name="recipient_customer"
                  value={recipient_customer}
                  onChange={(e) => {
                    setRecipientCustomer(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.recipient_customer
                      ? "border-red-600"
                      : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                >
                  <option value="" disabled>
                    PILIH CUSTOMER
                  </option>
                  <option selected value="WEITAI VN">
                    WEITAI VN
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
                {errors.recipient_customer ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_customer}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="recipient_name"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Penerima
                </label>
                <input
                  type="text"
                  id="recipient_name"
                  name="recipient_name"
                  value={recipient_name}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.recipient_name ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.recipient_name ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_name}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="recipient_qty"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="recipient_qty"
                  name="recipient_qty"
                  min={1}
                  max={datas.qty}
                  value={recipient_qty}
                  autoComplete="off"
                  onChange={(e) => {
                    setRecipientQty(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.recipient_qty ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.recipient_qty ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_qty}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="recipient_date"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Tanggal Pinjam
                </label>
                <input
                  type="date"
                  id="recipient_date"
                  name="recipient_date"
                  value={recipient_date}
                  onChange={(e) => {
                    setRecipientDate(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.recipient_date ? "border-red-600" : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                />
                {errors.recipient_date ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_date}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="recipient_status"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  id="recipient_status"
                  name="recipient_status"
                  value={recipient_status}
                  onChange={(e) => {
                    setRecipientStatus(e.target.value);
                  }}
                  className={`bg-gray-50 border ${
                    errors.recipient_status
                      ? "border-red-600"
                      : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                >
                  <option value="" disabled>
                    PILIH STATUS
                  </option>
                  <option selected value="DIPINJAMKAN">
                    DIPINJAMKAN
                  </option>
                  <option selected value="DIKEMBALIKAN">
                    DIKEMBALIKAN
                  </option>
                  <option value="KIRIM">KIRIM</option>
                </select>
                {errors.recipient_status ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_status}
                  </span>
                ) : null}
              </div>
              <div className="col-span-10">
                <label
                  htmlFor="recipient_information"
                  className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                >
                  Informasi
                </label>
                <textarea
                  value={recipient_information}
                  onChange={(e) => {
                    setRecipientInformation(e.target.value);
                  }}
                  className={`resize-none bg-gray-50 border ${
                    errors.recipient_information
                      ? "border-red-600"
                      : "border-gray-300"
                  } text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-500`}
                  name="recipient_information"
                  id="recipient_information"
                  placeholder="Masukkan Keterangan"
                ></textarea>
                {errors.recipient_information ? (
                  <span className="text-red-600 text-xs">
                    {errors.recipient_information}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          {datas.qty == 0 ? (
            <div className="flex items-center text-red-600 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
              Stock Color Window tidak cukup, silahkan cek color window yang
              dikirim !
            </div>
          ) : (
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateSendColorWindow;
