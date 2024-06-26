import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
function Sidebar() {
  const location = useLocation();
  const [currentActiveTab, setCurrentActiveTab] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setCurrentActiveTab(location.pathname);
    var role = sessionStorage.getItem("role");
    if (role == "Admin") {
      setIsAdmin(true);
    }
  }, []);
  return (
    <>
      {" "}
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a class="sidebar-brand d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Frost</div>
        </a>

        <hr class="sidebar-divider my-0"></hr>

        <li
          class={`nav-item ${
            currentActiveTab === "/Dashboard" ? "active" : ""
          }`}
        >
          <a class="nav-link" href="/Dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <hr class="sidebar-divider"></hr>

        <div class="sidebar-heading">Interface</div>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Components:</h6>
              <a class="collapse-item">Buttons</a>
              <a class="collapse-item">Cards</a>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i class="fas fa-fw fa-wrench"></i>
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            class="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Utilities:</h6>
              <a class="collapse-item">Colors</a>
              <a class="collapse-item">Borders</a>
              <a class="collapse-item">Animations</a>
              <a class="collapse-item">Other</a>
            </div>
          </div>
        </li>

        <hr class="sidebar-divider"></hr>

        <div class="sidebar-heading">Addons</div>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </a>
          <div
            id="collapsePages"
            class="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Login Screens:</h6>
              <a class="collapse-item">Login</a>
              <a class="collapse-item">Register</a>
              <a class="collapse-item">Forgot Password</a>
              <div class="collapse-divider"></div>
              <h6 class="collapse-header">Other Pages:</h6>
              <a class="collapse-item">404 Page</a>
              <a class="collapse-item">Blank Page</a>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Charts</span>
          </a>
        </li>

        {/* <hr class="sidebar-divider d-none d-md-block"></hr> */}
        <hr class="sidebar-divider"></hr>
        {isAdmin ? (
          <>
            <div class="sidebar-heading">Admin</div>
            <li
              class={`nav-item ${currentActiveTab === "/users" ? "active" : ""}`}
            >
              <a class="nav-link" href="/users">
                <i class="fas fa-fw fa-table"></i>
                <span>User</span>
              </a>
            </li>
          </>
        ) : null}
      </ul>
    </>
  );
}

export default Sidebar;
