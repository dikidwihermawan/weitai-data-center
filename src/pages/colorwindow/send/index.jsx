import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconSquareRoundedCheck, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ColorWindow from "..";
import Modal from "react-modal";

function SendColorWindow() {
  const redirect = useNavigate();
  const [colorWindows, setColorWindows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [returned, setReturned] = useState("");
  const [errors, setErrors] = useState([]);
  let subtitle;

  const getData = async () => {
    const response = await axios.get("colorwindow/send");
    setColorWindows(response.data.data);
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
      openModal();
      setDataUpdate(id);
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
          onClick={() => handleClick(id, "confirmed")}
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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      transform: "translate(-50%, -50%)",
    },
  };

  const confirmData = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to confirm data?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.post(
            `colorwindow/send/confirm/${dataUpdate}`,
            { returned: returned }
          );
          swal(response.data.success, {
            icon: "success",
          });
          closeModal();
          getData();
        } catch (e) {
          let data = e.response.data.data;
          let arrayBuffer = [];
          data.forEach((element) => {
            arrayBuffer[element.path] = element.msg;
          });
          setErrors(arrayBuffer);
          swal("Data can't confirmed!", {
            icon: "error",
          });
          console.log(e);
        }
      }
    });
  };

  useEffect(() => {
    getData();
    handleInputChange();
  }, [searchInput]);

  return (
    <>
      <ColorWindow tabActive="send">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="confirmModal"
        >
          <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
              Kembalikan Color Window
            </h3>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="mb-4">
              <label
                htmlFor="returned"
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Tanggal Kembali
              </label>
              <input
                type="date"
                name="returned"
                id="returned"
                onChange={(e) => setReturned(e.target.value)}
                value={returned}
                className={`${
                  errors.returned ? "border-red-600" : "border-gray-300"
                } bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              />
              {errors.returned ? (
                <span className="text-red-600 text-xs">{errors.returned}</span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={confirmData}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </button>
          </div>
        </Modal>
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
