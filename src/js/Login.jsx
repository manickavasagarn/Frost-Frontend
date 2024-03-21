import axios from "axios";
import React, { useState } from "react";
const init = {
  username: "john_doe",
  password: "password123",
};
function Login() {
  const [state, setState] = useState(init);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const togglePassword = () => {
    setIsPassword(!isPassword);
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

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth`,
          {
            ...state,
          }
        );
        setSubmitting(false);
        setTimeout(() => {
          window.location.href = "/Dashboard";
          sessionStorage.setItem("role", data?.role);
          localStorage.setItem("authToken", data?.token);
        }, 1000);
      } catch (error) {
        setSubmitting(false);
        console.error(error);
        alert("Error! Login failed wrong user credentials");
      }
    }
  };

  const handleState = (e) => {
    let { value, name } = e.target;
    let temp = { ...state };
    temp[name] = value;
    console.log(temp);
    setState(temp);
    setError("");
  };
  return (
    <>
      <div class="bg-gradient-primary " style={{ minHeight: "100vh" }}>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div
                class="card o-hidden border-0 shadow-lg"
                style={{ marginTop: "20%" }}
              >
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <div class="user">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter User Name..."
                              name="username"
                              value={state?.username}
                              onChange={(e) => {
                                handleState(e);
                              }}
                            />
                          </div>
                          <div class="form-group row">
                            <div
                              className="col-10"
                              style={{ paddingRight: "0" }}
                            >
                              <input
                                type={isPassword ? "text" : "password"}
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
                            <div
                              className="col-2 ps-0"
                              style={{ paddingLeft: "0" }}
                            >
                              <div
                                className="form-control"
                                onClick={() => {
                                  togglePassword()
                                }}
                              >
                                {isPassword ? (
                                  <i className="fa-solid fa-eye"></i>
                                ) : (
                                  <i className="fa-solid fa-eye-slash"></i>
                                )}
                              </div>
                            </div>
                          </div>
                          {error != "" ? (
                            <div>
                              <p className=" mt-2 text-danger">{error}</p>
                            </div>
                          ) : null}
                          <div class="form-group">
                            <div class="custom-control custom-checkbox small">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>

                          <a
                            class="btn btn-primary btn-user btn-block"
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            Login
                          </a>
                          <hr />
                        </div>

                        <div class="text-center">
                          <a class="small">Forgot Password?</a>
                        </div>
                        <div class="text-center">
                          <a class="small" href="/Register">
                            Create an Account!
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

export default Login;
