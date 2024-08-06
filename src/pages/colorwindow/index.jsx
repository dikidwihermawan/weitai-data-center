import React from "react";

function index(props) {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm font-medium text-gray-500">
            <ul className="flex flex-wrap space-x-4">
              <li>
                <button
                  onClick={() => {
                    setCheckMenu(true);
                  }}
                  className={`inline-block pb-4 border-b ${
                    checkMenu
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300"
                  } rounded-t-lg`}
                  aria-current="page"
                >
                  Data Color Window
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCheckMenu(false);
                  }}
                  className={`inline-block pb-4 border-b ${
                    checkMenu
                      ? "border-gray-300"
                      : "border-blue-600 text-blue-600"
                  } rounded-t-lg`}
                  aria-current="page"
                >
                  Color Window yang dikeluarkan
                </button>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
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
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>
            <Link
              to="/colorwindow/create"
              className="px-4 py-2 rounded text-sm text-white bg-green-600"
            >
              Create New Sample
            </Link>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
}

export default index;
