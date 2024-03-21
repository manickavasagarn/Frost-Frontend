import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import Spinner from "./Spinner";
function WaitingList() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loader, setLoader] = useState(false);

  const getWaitingList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/waitingUpdate`
      );
      setRows(data);
      console.log(data);
      setRows(data);
      toast.success(data?.data?.message);
    } catch (error) {
      console.log(error);
      // let errmsg = (error?.response?.data?.message) ? (error?.response?.data?.message) : (`${error?.response?.status} - ${error?.response?.statusText}`)
      let errmsg = error?.response
        ? error?.response?.data?.message
          ? error?.response?.data?.message
          : `${error?.response?.status} - ${error?.response?.statusText}`
        : "Something went wrong. Please try again later";
      toast.error(errmsg);
    }
  };
  useEffect(() => {
    getWaitingList();
  }, []);

  const rejectEdit = async (id) => {
    setLoader(true);
    try {
      let data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/rejectionUpdate`,
        { ID: id }
      );
      toast.success(data?.data?.message, { autoClose: 3000 });
      getWaitingList();
    } catch (error) {
      console.error(error);
      let errmsg = error?.response
        ? error?.response?.data?.message
          ? error?.response?.data?.message
          : `${error?.response?.status} - ${error?.response?.statusText}`
        : "Something went wrong. Please try again later";
      toast.error(errmsg);
    }
    setLoader(false);
  };

  const acceptEdit = async (id) => {
    setLoader(true);
    try {
      let data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/acceptUpdate`,
        { ID: id }
      );
      toast.success(data?.data?.message, { autoClose: 3000 });
      getWaitingList();
    } catch (error) {
      console.error(error);
      let errmsg = error?.response
        ? error?.response?.data?.message
          ? error?.response?.data?.message
          : `${error?.response?.status} - ${error?.response?.statusText}`
        : "Something went wrong. Please try again later";
      toast.error(errmsg);
    }
    setLoader(false);
  };

  const getEmployeeDetails = () => {
    let empTableColumns = [
      {
        headerName: "USERNAME",
        field: "USERNAME",
        sortable: true,
        width: 100,
      },
      {
        headerName: "MAIL",
        field: "MAIL",
        sortable: true,
        width: 200,
      },
      {
        headerName: "FIRST_NAME",
        field: "FIRST_NAME",
        sortable: true,
        width: 250,
      },
      {
        headerName: "LAST_NAME",
        field: "LAST_NAME",
        sortable: true,
        width: 150,
      },
      {
        headerName: "PHONE_NUMBER",
        field: "PHONE_NUMBER",
        sortable: true,
        width: 180,
      },
      {
        headerName: "GENDER",
        field: "GENDER",
        sortable: true,
        width: 80,
      },
      {
        headerName: "ADDRESS",
        field: "ADDRESS",
        sortable: true,
        width: 150,
      },
      {
        headerName: "DOB",
        field: "DOB",
        sortable: true,
        width: 120,
        valueGetter: (params) => {
          return moment(params.row?.DOB).format("DD-MMM-YYYY") || "-";
        },
      },
      {
        headerName: "CREATED_DATE",
        field: "CREATED_DATE",
        sortable: true,
        width: 120,
        valueGetter: (params) => {
          return moment(params.row?.CREATED_DATE).format("DD-MMM-YYYY") !=
            "Invalid date"
            ? moment(params.row?.CREATED_DATE).format("DD-MMM-YYYY")
            : "-";
        },
      },
      {
        headerName: "Action",
        field: "LEAVE_ACTION",
        sortable: true,
        width: 90,
        renderCell: (params) => (
          <span>
            <Tooltip title="Accept">
              <i
                className="fa fa-check"
                style={{
                  color: "green",
                  cursor: "pointer",
                  marginRight: "6px",
                }}
                onClick={() => acceptEdit(params.row?.update_id)}
              ></i>
            </Tooltip>
            <Tooltip title="Reject">
              <i
                className="fa fa-times"
                aria-hidden="true"
                style={{
                  color: "#d90101",
                  cursor: "pointer",
                  marginRight: "6px",
                }}
                onClick={() => rejectEdit(params.row?.update_id)}
              ></i>
            </Tooltip>
          </span>
        ),
      },
    ];
    setColumns(empTableColumns);
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <>
      <div>
        <div id="wrapper">
          <Sidebar />

          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Navbar />
              {loader ? (
                <div className="position-relative">
                  <div className="backdrop"></div>
                  <div className="spinner-container">
                    <Spinner />
                  </div>
                </div>
              ) : null}
              <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Users</h1>
                </div>
              </div>
              <div class="row mx-4">
                <div class="col-lg-12">
                  <div class="card o-hidden border-0 shadow-lg">
                    <div class="card-body p-0">
                      <div class="p-5">
                        <div class="text-center"></div>
                        <DataGrid
                          //   className={classes.root}
                          getRowId={(row) => row.ID}
                          rows={rows}
                          columns={columns}
                          autoHeight
                          slots={{
                            toolbar: GridToolbar,
                          }}
                          initialState={{
                            pagination: {
                              paginationModel: { pageSize: 10, page: 0 },
                            },
                          }}
                          pageSizeOptions={[10, 25, 50]}
                          hideFooterSelectedRowCount
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>

        <a class="scroll-to-top rounded">
          <i class="fas fa-angle-up"></i>
        </a>
      </div>
    </>
  );
}

export default WaitingList;
