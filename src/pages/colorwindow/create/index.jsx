import React, { useState } from "react";
import axios from "axios";

function CreateColorWindow() {
  const [customer, setCustomer] = useState("");
  const [material, setMaterial] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [csdate, setCsDate] = useState("");
  const [qty, setQty] = useState("");

  const data = { customer, material, code, color, date, csdate, qty };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div className="m-10">
      <h1 className="font-bold uppercase mb-10">Create new color window</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-12">
          <div className="col-span-4">
            <label
              htmlFor="material"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Material Name
            </label>
            <select
              id="material"
              name="material"
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Choose a material
              </option>
              <option defaultValue="HAMMER II">HAMMER II</option>
              <option value="VELVET">VELVET</option>
              <option value="BEYOND">BEYOND</option>
              <option value="PLATINUM">PLATINUM</option>
              <option value="ROADTRIP">ROADTRIP</option>
              <option value="TEASEL">TEASEL</option>
              <option value="NB VELVET">NB VELVET</option>
            </select>
          </div>
          <div className="col-span-4">
            <label
              htmlFor="material"
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
              Customer Name
            </label>
            <select
              id="customer"
              name="customer"
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Choose a Customer
              </option>
              <option value="tsh">TAH SUNG HUNG</option>
              <option value="pci">POUCHEN INDONESIA</option>
              <option value="nikomas">NIKOMAS ADIDAS</option>
              <option value="panarub">PANARUB</option>
            </select>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-36 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateColorWindow;
