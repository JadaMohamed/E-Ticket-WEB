import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "../../img/logo.svg";
import "../../css/navbar.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../Constants";
import Search from "../../pages/Search/Search";
import LoginPopup from "./loginpopup";
import AuthContext from "../../Auth/AuthContext";
import { Image } from "cloudinary-react";
import SignUpNav from "./SignUpNav";
import SignUpClient from "./sign_up";
import Alert from "./alert";

function Navbar(props) {
  const { profile, isLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [popupLogin, setpoupLogin] = useState(false);
  const [popupSignUp, setpopupSignup] = useState(false);
  const [popupSignUpClient, setpopupSignUpClient] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const initialNumCartProducts = cart?.length ?? 0;

  const [numcartproducts, setNumcartproducts] = useState(
    initialNumCartProducts
  );
  const Nav = useNavigate();
  let menuRef = useRef();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setNumcartproducts(cart.length);
    }
  }, [localStorage.getItem("cart")]);
  const handleSearch = () => {
    // if (keyword?.length) Nav(`/search/${keyword}`, { replace: true });
    Nav(`/search/${keyword}`, { replace: true });
  };
  const logoutSubmit = async (event) => {
    logout();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  const [alert, setAlert] = useState(false);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <nav className="nav">
      <div className="nav-container">
        <Alert
          color={alertParams.color}
          msg={alertParams.msg}
          icon={alertParams.icon}
          setAlert={setAlert}
          alert={alert}
        />
        <a
          className="logoImage"
          onClick={() => Nav("/home", { replace: true })}
        >
          <img
            src={logo}
            alt="e-tickets.logo"
            className="Logo_"
            title="e-ticket.com"
          />
        </a>
        <div className="nav-search">
          <div className="nav-search-container">
            <input
              type="text"
              id="search"
              placeholder="Search E-tickets"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div onClick={handleSearch} className="btn" title="Search">
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className="navmenu">
          <div className="float-btns">
            <div className="float-btns-container">
              <div
                onClick={() => Nav("/home", { replace: true })}
                className="home-mobile btn"
              >
                <span className="material-symbols-outlined">home</span>
              </div>
              <div
                onClick={() => Nav("/cart", { replace: true })}
                className={`btn crt ${props.active === "cart" ? "active" : ""}`}
                id="cart"
                title="Cart"
              >
                {numcartproducts ? (
                  <div className="nbprd"> {numcartproducts} </div>
                ) : (
                  ""
                )}
                <span class="material-symbols-outlined">shopping_basket</span>
              </div>
              <div
                onClick={() => Nav("/mytickets", { replace: true })}
                className={`btn ${
                  props.active === "mytickets" ? "active" : ""
                }`}
                id="mytickets"
                title="My Tickets"
              >
                <span
                  class="material-symbols-outlined"
                  style={{ transform: "rotate(90deg)" }}
                >
                  confirmation_number
                </span>
              </div>
              {isLoggedIn ? (
                <div
                  className="btn menu-trigger user-infos"
                  onClick={() => {
                    setOpen(!open);
                  }}
                  id="me"
                  title={`${profile?.account?.first_name} ${profile?.account?.last_name}`}
                  ref={menuRef}
                >
                  <div className="user-infos-container">
                    <div className="avatar">
                      <Image
                        cloudName="djjwswdo4"
                        publicId={profile?.account?.avatar}
                      />
                    </div>
                    <div className="right-side"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* <div className="login-btn cta btn">Connexion</div>
                  <div className="logout-btn cta btn">Sign Up</div> */}
                  <div
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="btn menu-trigger"
                    id="me"
                    title="Me"
                    ref={menuRef}
                  >
                    <span className="material-symbols-outlined">login</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <div className="dropdown-items">
                <div className="user-infos">
                  <div className="label">ACCOUNT</div>
                  <div className="user-infos-container">
                    <div className="avatar">
                      <Image
                        cloudName="djjwswdo4"
                        publicId={profile?.account?.avatar}
                      />
                    </div>
                    <div className="right-side">
                      <div className="name-last">
                        {profile?.account?.first_name}{" "}
                        {profile?.account?.last_name}
                      </div>
                      <div className="email">{profile?.account?.email}</div>
                    </div>
                  </div>
                </div>
                {profile.account.account_type === "organizer" ? (
                  <>
                    <div
                      className="dropdown-item"
                      onClick={() => Nav("/home", { replace: true })}
                    >
                      <div>
                        <span className="material-symbols-outlined">home</span>
                      </div>
                      Home
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        Nav("/organizer/dashboard", { replace: true })
                      }
                    >
                      <div>
                        <span className="material-symbols-outlined">
                          dashboard
                        </span>
                      </div>
                      Dashboard
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div
                  className="dropdown-item"
                  onClick={() => Nav("/settings", { replace: true })}
                >
                  <div>
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </div>
                  Settings
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => {
                    logoutSubmit();
                  }}
                >
                  <div>
                    <span className="material-symbols-outlined">logout</span>
                  </div>
                  Sign Out
                </div>
              </div>
            </div>
          ) : (
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <div className="dropdown-items">
                {/* <div className="dropdown-item">
                  <div>
                    <span className="material-symbols-outlined">
                      contact_support
                    </span>
                  </div>
                  Support
                </div> */}
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setpopupSignup(true);
                  }}
                  // onClick={() => {
                  //   Nav("/registration", { replace: false });
                  // }}
                >
                  <div>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </div>
                  Sign Up
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setpoupLogin(true);
                  }}
                >
                  <div>
                    <span className="material-symbols-outlined">login</span>
                  </div>
                  Sign in
                </div>
              </div>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {popupLogin && (
        <LoginPopup setTrigger={setpoupLogin} signup={setpopupSignup} />
      )}
      {popupSignUp && (
        <SignUpNav
          setTrigger={setpopupSignup}
          signUpClient={setpopupSignUpClient}
        />
      )}
      {popupSignUpClient && (
        <SignUpClient
          setTrigger={setpopupSignUpClient}
          login={setpoupLogin}
          alert={alert}
          setAlert={setAlert}
          setAlertParams={setAlertParams}
        />
      )}
    </nav>
  );
}
export default Navbar;
