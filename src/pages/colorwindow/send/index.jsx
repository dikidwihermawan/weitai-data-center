import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconEdit, IconTransferOut, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ColorWindow from "..";

function SendColorWindow() {
  const redirect = useNavigate();
  const [colorWindows, setColorWindows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

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
          const response = await axios.delete(`colorwindow/local/delete/${id}`);
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
      redirect(`local/edit/${id}`);
    } else if (action == "view") {
      redirect(`local/forward/${id}`);
    } else if (action == "delete") {
      deleteData(id);
    }
  };

  const columns = [
    {
      name: "Material yang dikirim",
      selector: (row) => (
        <div
          style={{ fontSize: 11 }}
        >{`${row.colorwindow.material} ${row.colorwindow.color}`}</div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Tujuan",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_customer}</div>
      ),
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_name}</div>
      ),
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_qty}</div>
      ),
      sortable: true,
    },
    {
      name: "Tanggal Kirim",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_send}</div>
      ),
      sortable: true,
    },
    {
      name: "Tanggal Kembalikan",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_return || "-"}</div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_status}</div>
      ),
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: (row) => (
        <div style={{ fontSize: 11 }}>{row.recipient_information}</div>
      ),
      sortable: true,
      width: "300px",
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
          title="Kirim"
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
    <>
      <ColorWindow tabActive="send">
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
