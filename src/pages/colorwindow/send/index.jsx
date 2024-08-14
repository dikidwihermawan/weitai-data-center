import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconSquareRoundedCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ColorWindow from "..";

function SendColorWindow() {
  const redirect = useNavigate();
  const [colorWindows, setColorWindows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const getData = async () => {
    const response = await axios.get("colorwindow/send");
    setColorWindows(response.data.data);
  };

  const confirmData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to confirm data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`colorwindow/send/delete/${id}`);
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
          const response = await axios.delete(`colorwindow/send/delete/${id}`);
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
    if (action == "confirmed") {
      confirmData(id);
    } else if (action == "delete") {
      deleteData(id);
    }
  };

  const columns = [
    {
      name: "Material",
      selector: (row) => (
        <div
          style={{ fontSize: 10 }}
        >{`${row.colorwindow.material} ${row.colorwindow.color}`}</div>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Tujuan",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_customer}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_name}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Quantity",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_qty}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Kirim",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_date}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Kembali",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_return || "-"}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_status}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Keterangan",
      selector: (row) => (
        <div style={{ fontSize: 10 }}>{row.recipient_information}</div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => buttonAction(row._id),
      sortable: false,
      width: "160px",
    },
  ];

  const buttonAction = (id) => {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="px-2 py-2 text-xs rounded"
          title="Selesai"
        >
          <IconSquareRoundedCheck stroke={1} width={20} />
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
    console.log(showModal);
  }, [searchInput, showModal]);

  return (
    <>
      <ColorWindow tabActive="send">
        <>
          {/* Main modal */}
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${
              showModal ? "hidden" : null
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required=""
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <label
                          htmlFor="remember"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Create account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>

        <DataTable
          columns={columns}
          data={searchInput != "" ? filteredResults : colorWindows}
          fixedHeader={true}
          fixedHeaderScrollHeight="400px"
          pagination
          responsive
          striped
          pointerOnHover
        />
      </ColorWindow>
    </>
  );
}

export default SendColorWindow;
