import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import apiclient from "./Apiclient";
import Spinner from "./Spinner";

const init = {
  username: "",
  firstname: "",
  lastname: "",
  mail: "",
  number: "",
  address: "",
  dob: "",
  gender: "",
};
function NewUser() {
  const [state, setState] = useState(init);
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleState = (e) => {
    let { value, name } = e.target;
    let temp = { ...state };
    temp[name] = value;
    setState(temp);
    setError("");
    if (name == "mail") {
      let pattern = /^[^\s@]+@(gmail|frost)\.com$/;
      let resultePattern = pattern.test(value);
      if (!resultePattern) setError("Please enter a valid email address");
    }
    if (name == "password" || name == "repeatPassword") {
      if (temp?.password != temp?.repeatPassword)
        setError("Passwords do not match.");
    }
    if (name == "number") {
      if (value.length != 10) setError("Please enter a valid number.");
    }
  };

  const handleSubmit = async () => {
    if (error == "") {
      let check = Object.keys(init)?.filter((ele) => {
        if (state[ele] == "") {
          return true;
        }
      });
      if (check.length) {
        setError("Please fill in all fields");
        return 0;
      }
      setLoader(true)
      try {
        let data = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/admin/userCreation`,
          { ...state }
        );
        setState(init);
        toast.success(data?.data?.message, { autoClose: 3000 })
        setTimeout(() => {
            window.location.href = "/User"
        }, 3000);
      } catch (error) {
        console.error(error);
        let errmsg = error?.response
        ? error?.response?.data?.message
          ? error?.response?.data?.message
          : `${error?.response?.status} - ${error?.response?.statusText}`
        : "Something went wrong. Please try again later";
      toast.error(errmsg);
      }
      setDisable(false);
      setLoader(false)
    }
  };

 

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
                  <h1 class="h3 mb-0 text-gray-800">New User</h1>
                </div>
              </div>
              <div class="row">
                <div className="col-lg-3"></div>
                <div class="col-lg-6">
                  <div class="card o-hidden border-0 shadow-lg">
                    <div class="card-body p-0">
                      <div class="p-5">
                        <div class="text-center"></div>
                        <div class="user">
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <input
                                type="text"
                                class="form-control form-control-user"
                                id="exampleFirstName"
                                placeholder="First Name"
                                name="firstname"
                                value={state?.firstname}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="text"
                                class="form-control form-control-user"
                                id="exampleLastName"
                                placeholder="Last Name"
                                name="lastname"
                                value={state?.lastname}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Email"
                              name="mail"
                              value={state?.mail}
                              onChange={(e) => {
                                handleState(e);
                              }}
                            />
                          </div>
                          <div class="form-group">
                            <textarea
                              class="form-control form-control-user"
                              id="exampleInputAddress"
                              placeholder="Address"
                              name="address"
                              value={state?.address}
                              onChange={(e) => {
                                handleState(e);
                              }}
                            ></textarea>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <input
                                type="text"
                                class="form-control form-control-user"
                                id="exampleInputUsername"
                                placeholder="User Name"
                                name="username"
                                value={state?.username}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="number"
                                class="form-control form-control-user"
                                id="exampleInputNumber"
                                placeholder="Phone Number"
                                name="number"
                                value={state?.number}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <input
                                type="date"
                                class="form-control form-control-user"
                                id="exampleInputDate"
                                placeholder="DOB"
                                name="dob"
                                value={state?.dob}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                            <div class="col-sm-6">
                              <select
                                class="form-control form-control-user"
                                name="gender"
                                value={state?.gender}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              >
                                <option value="" selected>
                                  select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                          </div>

                          {error != "" ? (
                            <div>
                              <p className=" mt-2 text-danger">{error}</p>
                            </div>
                          ) : null}
                          <a
                            class="btn btn-primary btn-user btn-block"
                            disable={disable}
                            onClick={handleSubmit}
                          >
                            Save
                          </a>
                        </div>
                        <hr />
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

export default NewUser;
