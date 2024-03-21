import logo from "./logo.svg";
// import './App.css';
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashborad from "./js/Dashborad";
import Login from "./js/Login";
import Register from "./js/Register";
import NoPage from "./js/NoPage";
import Profile from "./js/Profile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "./js/User";
import NewUser from "./js/NewUser";
import WaitingList from "./js/WaitingList";

function App() {
  const loggedin = Boolean(localStorage.getItem("authToken"));
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {loggedin ? (
          <>
            <Route path="/Dashboard" element={<Dashborad />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/waitingList" element={<WaitingList />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate replace to="/" />} />
        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
