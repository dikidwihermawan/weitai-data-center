import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconEdit, IconTransferOut, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ColorWindow() {
  const redirect = useNavigate();
  const [colorWindows, setColorWindows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [checkMenu, setCheckMenu] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get("colorwindow");
      setColorWindows(response.data.data);
    } catch (err) {
      console.log(err);
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
          const response = await axios.delete(`colorwindow/delete/${id}`);
          swal(response.data.success, {
            icon: "success",
          });
          getData();
        } catch (e) {
          swal("Data can't deleted!", {
            icon: "error",
          });
          console.log(e);
        }
      }
    });
  };

  const handleClick = (id, action) => {
    if (action == "edit") {
      redirect(`edit/${id}`);
    } else if (action == "view") {
      redirect(`forward/${id}`);
    } else if (action == "delete") {
      deleteData(id);
    }
  };

  const columns = [
    {
      name: "Material",
      selector: (row) => row.material,
      sortable: true,
      width: "150px",
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      width: "150px",
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
      width: "200px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      width: "130px",
    },
    {
      name: "CS Date",
      selector: (row) => row.csdate,
      sortable: true,
      width: "130px",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: true,
      width: "100px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => buttonAction(row._id),
      sortable: false,
    },
  ];
  const columns2 = [
    {
      name: "Material Asal",
      selector: (row) => row.material,
      sortable: true,
      width: "150px",
    },
    {
      name: "Dipinjamkan untuk",
      selector: (row) => row.code,
      sortable: true,
      width: "250px",
    },
    {
      name: "Penerima",
      selector: (row) => row.color,
      sortable: true,
      width: "250px",
    },
    {
      name: "Dari Tanggal",
      selector: (row) => row.date,
      sortable: true,
      width: "150px",
    },
    {
      name: "CS Date",
      selector: (row) => row.csdate,
      sortable: true,
      width: "130px",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: true,
      width: "100px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => buttonAction(row._id),
      sortable: false,
    },
  ];

  const buttonAction = (id) => {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleClick(id, "edit")}
          className="px-2 py-2 text-xs rounded"
          title="Edit"
        >
          <IconEdit stroke={1} width={20} />
        </button>
        <button
          onClick={() => handleClick(id, "view")}
          className="px-2 py-2 text-xs rounded"
          title="Pinjamkan"
        >
          <IconTransferOut stroke={1} width={20} />
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
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between p-4">
        <div className="text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => {
                  setCheckMenu(true);
                }}
                className={`inline-block p-4  border-b ${
                  checkMenu
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300"
                } rounded-t-lg`}
                aria-current="page"
              >
                Data Color Window
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => {
                  setCheckMenu(false);
                }}
                className={`inline-block p-4  border-b ${
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
      <DataTable
        columns={checkMenu ? columns : columns2}
        data={searchInput != "" ? filteredResults : colorWindows}
        fixedHeader={true}
        fixedHeaderScrollHeight="400px"
        pagination
        responsive
        striped
        pointerOnHover
      />
    </div>
  );
}

export default ColorWindow;
