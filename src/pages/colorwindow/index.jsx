import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../header/sidebar";

function ColorWindow(props) {
  const [active, setActive] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (props.tabActive == "local") {
      setActive("local");
    } else if (props.tabActive == "send") {
      setActive("send");
    } else if (props.tabActive == "borrow") {
      setActive("borrow");
    }
  }, [searchInput]);
  return (
    <Sidebar>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-end space-x-4 py-4">
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
              name="search"
              className="block p-1.5 ps-10 text-sm placeholder:text-xs text-gray-900 border border-gray-300 rounded-lg w-64 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Search for items"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            <Link
              to="/colorwindow"
              aria-current="page"
              className={`px-4 py-2 text-xs font-medium ${
                active == "local" ? "text-blue-600" : "text-gray-900"
              } bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Lokal
            </Link>
            <Link
              to="/colorwindow/send"
              className={`px-4 py-2 text-xs font-medium ${
                active == "send" ? "text-blue-600" : "text-gray-900"
              } bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Kirim
            </Link>
            <Link
              to="/colorwindow/borrow"
              className={`px-4 py-2 text-xs font-medium ${
                active == "borrow" ? "text-blue-600" : "text-gray-900"
              } bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Pinjam
            </Link>
          </div>
          <Link
            to={
              active == "borrow"
                ? "/colorwindow/borrow/create"
                : "/colorwindow/local/create"
            }
            className="px-4 py-2 text-white bg-blue-600 focus:outline-none hover:bg-blue-400 rounded-xl text-xs"
          >
            Create new data
          </Link>
        </div>
        {props.children}
      </div>
    </Sidebar>
  );
}

export default ColorWindow;
