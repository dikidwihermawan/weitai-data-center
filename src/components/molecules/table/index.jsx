import axios from "axios";
import { useEffect, useState } from "react";

function Tables() {
  const [colorWindows, setColorWindows] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("colorwindow");
      setColorWindows(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <div>
          <a
            href="/colorwindow/create"
            className="px-4 py-2 rounded text-sm text-white bg-green-600"
          >
            Create New Sample
          </a>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Material
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              CS Date
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {colorWindows.map((colorWindow, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={index}
              >
                <td className="px-6 py-4">{colorWindow.material} </td>
                <td className="px-6 py-4">{colorWindow.code}</td>
                <td className="px-6 py-4">{colorWindow.color}</td>
                <td className="px-6 py-4">{colorWindow.date}</td>
                <td className="px-6 py-4">{colorWindow.csdate}</td>
                <td className="px-6 py-4">{colorWindow.qty}</td>
                <td className="px-6 py-4">{colorWindow.customer}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <form action="edit" method="post">
                      <button className="px-4 py-2 bg-blue-600 text-xs rounded text-white">
                        Edit
                      </button>
                    </form>
                    <form action="delete" method="post">
                      <button className="px-4 py-2 bg-red-600 text-xs rounded text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
