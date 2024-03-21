import React, { useState } from "react";
import axios from "axios";

const init = {
  username: "",
  firstname: "",
  lastname: "",
  mail: "",
  number: "",
  address: "",
  dob: "",
  gender: "",
  password: "",
  repeatPassword: "",
};
function Register() {
  const [state, setState] = useState(init);
  const [error, setError] = useState("");
  const [disable,setDisable] = useState(false)

  const handleState = (e) => {
    let { value, name } = e.target;
    let temp = { ...state };
    temp[name] = value;
    console.log(temp);
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
        if (value.length != 10)
          setError("Please enter a valid number.");
      }
  };

  const handleSubmit = async() => {
    if (error == "") {
      let check = Object.keys(init)?.filter((ele) => {
        if (state[ele] == "") {
          return true;
        }
      });
      if(check.length){
        setError("Please fill in all fields")
        return 0;
      }
      setDisable(true)
      try {
        let data = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`,{...state});
        setState(init);
        window.location.href="/";
      } catch (error) {
        console.error(error);
      }
      setDisable(false)
    }
  };
  return (
    <>
      <div class="bg-gradient-primary " style={{ minHeight: "100vh" }}>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div
                class="card o-hidden border-0 shadow-lg"
                style={{ marginTop: "14%" }}
              >
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">
                            Create an Account!
                          </h1>
                        </div>
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
                          <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                              <input
                                type="password"
                                class="form-control form-control-user"
                                id="exampleInputPassword"
                                placeholder="Password"
                                name="password"
                                value={state?.password}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
                            </div>
                            <div class="col-sm-6">
                              <input
                                type="password"
                                class="form-control form-control-user"
                                id="exampleRepeatPassword"
                                placeholder="Repeat Password"
                                name="repeatPassword"
                                value={state?.repeatPassword}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                              />
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
                            Register Account
                          </a>
                        </div>
                        <hr />

                        <div class="text-center">
                          <a class="small" href="/">
                            Already have an account? Login!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
