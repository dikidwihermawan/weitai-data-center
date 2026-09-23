import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar";
import axios from "axios";
import DataTable from "react-data-table-component";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import swal from "sweetalert";

function Stock() {
  const redirect = useNavigate();
  const [active, setActive] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [stocks, setStocks] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("/stocks");
      setStocks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`colorwindow/local/delete/${id}`);
          swal(response.data.success, {
            icon: "success",
          });
          getData();
        } catch (e) {
          swal("Data can't deleted!", {
            icon: "error",
          });
        }
      }
    });
  };

  const handleClick = (id, action) => {
    if (action == "view") {
      redirect(`view/${id}`);
    } else if (action == "delete") {
      deleteData(id);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => <div style={{ fontSize: 12 }}>{index + 1}</div>,
      sortable: false, // Disarankan false karena nomor urut bergantung pada posisi baris
      width: "70px",
    },
    {
      name: "Material",
      selector: (row) => <div style={{ fontSize: 12 }}>{row.material}</div>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row) => <div style={{ fontSize: 12 }}>{row.name}</div>,
      sortable: true,
      width: "250px",
    },
    {
      name: "Rak",
      selector: (row) => <div style={{ fontSize: 12 }}>{row.rack}</div>,
      sortable: true,
      width: "100px",
    },
    {
      name: "Qty",
      selector: (row) => (
        <div style={{ fontSize: 12 }}>
          {!row.total_qty || Number(row.total_qty) === 0 ? "-" : row.total_qty}
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Usage",
      selector: (row) => <div style={{ fontSize: 12 }}>{row.usage || "-"}</div>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Balance",
      selector: (row) => (
        <div style={{ fontSize: 12 }}>{row.qty - row.usage || "-"}</div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => buttonAction(row.id),
      sortable: false,
    },
  ];

  const buttonAction = (id) => {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleClick(id, "view")}
          className="px-2 py-2 text-xs rounded"
          title="View"
        >
          <IconEye stroke={1} width={20} />
        </button>
        <button
          onClick={() => handleClick(id, "delete")}
          className="px-2 py-2 text-xs rounded"
          title="Hapus"
        >
          <IconTrash stroke={1} width={20} />
        </button>
      </div>
    );
  };

  const handleInputChange = () => {
    if (searchInput !== "") {
      const filteredData = colorWindows.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  };

  useEffect(() => {
    getData();
    handleInputChange();
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
            to="/stocks/create"
            className="px-4 py-2 text-white bg-blue-600 focus:outline-none hover:bg-blue-400 rounded-xl text-xs"
          >
            Create new data
          </Link>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={searchInput != "" ? filteredResults : stocks}
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            pagination
            responsive
            striped
            pointerOnHover
          />
        </div>
      </div>
    </Sidebar>
  );
}

export default Stock;
