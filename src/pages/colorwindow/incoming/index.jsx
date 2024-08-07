import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconEdit, IconTransferOut, IconTrash } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ColorWindow from "..";

function IncomingColorWindow() {
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
      selector: (row) => <div style={{ fontSize: 11 }}>{row.material}</div>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Code",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.code}</div>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Color",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.color}</div>,
      sortable: true,
      width: "200px",
    },
    {
      name: "Date",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.date}</div>,
      sortable: true,
      width: "130px",
    },
    {
      name: "CS Date",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.csdate}</div>,
      sortable: true,
      width: "130px",
    },
    {
      name: "Qty",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.qty}</div>,
      sortable: true,
      width: "100px",
    },
    {
      name: "Customer",
      selector: (row) => <div style={{ fontSize: 11 }}>{row.customer}</div>,
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
    console.log(colorWindows);
  }, [searchInput]);

  return (
    <>
      <ColorWindow tabActive="incoming">
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

export default IncomingColorWindow;
