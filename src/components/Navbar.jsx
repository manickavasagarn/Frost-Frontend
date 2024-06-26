import React, { useEffect, useState } from "react";
import profile from "../img/undraw_profile.svg";
import axios from "axios";
import { toast } from "react-toastify";
function Navbar() {
  const [info, setInfo] = useState({});
  const [waiting, setWaiting] = useState([]);
  const redirectToLogin = () => {
    window.location.href = "/";
    localStorage.removeItem("authToken");
  };

  const getWaitingList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/waitingUpdate`
      );
      setWaiting(data);
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

  const getDetail = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/myDetail`
      );
      console.log(data);
      setInfo(data);
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
    getDetail();
    var role = sessionStorage.getItem("role");
    if (role == "Admin") {
      getWaitingList();
    }
  }, []);

  return (
    <>
      {" "}
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          class="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i class="fa fa-bars"></i>
        </button>

        <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div class="input-group">
            <input
              type="text"
              class="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">
                <i class="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown no-arrow d-sm-none">
            <a
              class="nav-link dropdown-toggle"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-search fa-fw"></i>
            </a>

            <div
              class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form class="form-inline mr-auto w-100 navbar-search">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li class="nav-item dropdown no-arrow mx-1">
            <a
              class="nav-link dropdown-toggle"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-bell fa-fw"></i>
              {waiting.length != 0 ? (
                <span class="badge badge-danger badge-counter">
                  {waiting.length}
                </span>
              ) : null}
            </a>

            <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 class="dropdown-header">Waiting List</h6>
              <a
                class="dropdown-item d-flex align-items-center"
                href="/waitinglist"
              >
                <div class="mr-3">
                  <div class="icon-circle bg-warning">
                    <i class="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  Edit requested for item {waiting?.length}. Please review and
                  make the necessary changes.
                </div>
              </a>
              <a class="dropdown-item text-center small text-gray-500">
                Show All Alerts
              </a>
            </div>
          </li>

          <li class="nav-item dropdown no-arrow mx-1">
            <a
              class="nav-link dropdown-toggle"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-envelope fa-fw"></i>

              <span class="badge badge-danger badge-counter">7</span>
            </a>

            <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 class="dropdown-header">Message Center</h6>
              <a class="dropdown-item d-flex align-items-center">
                <div class="dropdown-list-image mr-3">
                  <img class="rounded-circle" src={profile} alt="..." />
                  <div class="status-indicator bg-success"></div>
                </div>
                <div class="font-weight-bold">
                  <div class="text-truncate">
                    Hi there! I am wondering if you can help me with a problem
                    I've been having.
                  </div>
                  <div class="small text-gray-500">Emily Fowler · 58m</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="img/undraw_profile_2.svg"
                    alt="..."
                  />
                  <div class="status-indicator"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    I have the photos that you ordered last month, how would you
                    like them sent to you?
                  </div>
                  <div class="small text-gray-500">Jae Chun · 1d</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="img/undraw_profile_3.svg"
                    alt="..."
                  />
                  <div class="status-indicator bg-warning"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    Last month's report looks great, I am very happy with the
                    progress so far, keep up the good work!
                  </div>
                  <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                    alt="..."
                  />
                  <div class="status-indicator bg-success"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    Am I a good boy? The reason I ask is because someone told me
                    that people say this to all dogs, even if they aren't
                    good...
                  </div>
                  <div class="small text-gray-500">Chicken the Dog · 2w</div>
                </div>
              </a>
              <a class="dropdown-item text-center small text-gray-500">
                Read More Messages
              </a>
            </div>
          </li>

          <div class="topbar-divider d-none d-sm-block"></div>

          <li class="nav-item dropdown no-arrow">
            <a
              class="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                {info?.USERNAME}
              </span>
              <img class="img-profile rounded-circle" src={profile} />
            </a>

            <div
              class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a class="dropdown-item " href="/profile">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a class="dropdown-item">
                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a class="dropdown-item">
                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <div
          class="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">Are you sure you want to quit?</div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a class="btn btn-primary" onClick={() => redirectToLogin()}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
