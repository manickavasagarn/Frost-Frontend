import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import apiclient from "./Apiclient";
import { selectEmployees } from "../stores/employeeSlice";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { useDispatch} from "react-redux"
import { fetchAllEmployees } from "../stores/employeeSlice";
function User() {
  const employees = useSelector(selectEmployees);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
      console.log("ffff");
      dispatch(fetchAllEmployees())
      console.log("ffff");
  }, [dispatch])

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
        width: 80,
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
          return (
            moment(params.row?.DOB).format("DD-MMM-YYYY") || "-"
          );
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
    ];
    let modifiedData = employees?.filter((ele)=>ele.IS_ADMIN != "Yes");
    console.log(modifiedData);
    setRows(modifiedData);
    setColumns(empTableColumns);
  };

  useEffect(() => {
    getEmployeeDetails();
    console.log(employees);
  }, [employees]);

  return (
    <>
      <div>
        <div id="wrapper">
          <Sidebar />

          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Navbar />

              <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Users</h1>
                  <a
                   href="/newUser"
                   class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                 >
                   <i class="fas fa-plas fa-sm text-white-50"></i> New User
                 </a>
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

export default User;
