import React, { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [alertMessage, setAlertMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuRef = useRef(null); // ✅ Ref for user-menu
  const sidebarRef = useRef(null); // ✅ Ref for sidebar

  const logoutHandler = () => {
    dispatch(logout());
    setAlertMessage("Logged out successfully!");
    setTimeout(() => setAlertMessage(""), 3000);
    navigate("/");
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // ✅ Close user menu
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); // ✅ Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      {/* Alert message */}
      {alertMessage && (
        <div className="alert alert-success">{alertMessage}</div>
      )}

      <div className="header">
        {/* Menu button */}
        <div className="menu">
          <button id="menu" onClick={() => setSidebarOpen(true)}>
            <img src="/images/menu.svg" alt="menu" />
          </button>
        </div>

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </div>

        {/* Navbar */}
        <div className="main-nav">
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/study-material">Study Material</Link>
            <Link to="/hall-of-achiver">Hall of Achievers</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`} ref={sidebarRef}>
          <button id="cancel" onClick={() => setSidebarOpen(false)}>
            <img src="/images/cancel.svg" alt="cancel" />
          </button>
          <Link to="/">Home</Link>
          <Link to="/study-material">Study Material</Link>
          <Link to="/hall-of-achiver">Hall of Achievers</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Login Section */}
        <div className="login-header">
          {loading && !user ? (
            <p>Loading...</p> // ✅ Show loading state
          ) : user ? (
            <div className="user-menu" ref={menuRef}>
              <button
                className="user-button"
                onClick={() => setIsOpen((prev) => !prev)} // ✅ Toggle menu on click
              >
                <img src="images/user.svg" alt="user" />
              </button>

              {isOpen && (
                <div className="submenu">
                  <Link to="/profile">User Profile</Link>
                  <button onClick={logoutHandler} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
