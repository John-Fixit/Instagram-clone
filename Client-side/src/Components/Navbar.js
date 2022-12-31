import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/word.PNG";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FaFacebookMessenger, FaPowerOff } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { BiCertification } from "react-icons/bi";
import { MdAutorenew } from "react-icons/md";
import style from "./style.css";
import userProfile from "../Images/user.PNG";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrHomeRounded } from "react-icons/gr";
function Navbar({ thisUserDetail }) {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/signin");
  };

  const navMenus = [
    {
      name: "Home",
      icon: <GrHomeRounded size={"3.5vh"} />,
      link: "/homepage/home",
    },
    {
      name: "Messages",
      icon: <FaFacebookMessenger size={"3.5vh"} />,
      link: "/homepage/chat",
    },
    {
      name: "Create",
      icon: <FaRegPlusSquare size={"3.5vh"} />,
      link: "/homepage/home",
    },
    {
      name: "Explore",
      icon: <FaCompass size={"3.5vh"} />,
      link: "/homepage/home",
    },
    {
      name: "Notifications",
      icon: <FaRegHeart size={"3.5vh"} />,
      link: "/homepage/home",
    },
  ];

  const navigateToProfile =()=>{
    console.log(thisUserDetail)
      if(thisUserDetail){
        navigate(`/homepage/${thisUserDetail.username}`);
      }
  }


  return (
    <>
      <NavbarComponent>
        <div>
          <NavLink activeClassName="active" to="/homepage/home">
            <img
              src={logo}
              alt="profile"
              style={{ width: "17vh" }}
              className="mt-2"
            />
          </NavLink>
          <div className="nav-menu">
            {navMenus.map((nav, index) => {
              return (
                <NavLink
                  activeClassName="active"
                  to={nav.link}
                  key={index}
                  className={`nav-link text-decoration-none text-dark`}
                >
                  <p className="nav_icon">{nav.icon}</p>
                  <p className="nav_name fw-light">{nav.name}</p>
                </NavLink>
              );
            })}
          </div>
          <div className="profile_div" onClick={navigateToProfile}>
            <img
              src={
                thisUserDetail && !!thisUserDetail.profilePicture
                  ? thisUserDetail.profilePicture
                  : userProfile
              }
              alt="profile"
              className="card-img-top rounded-circle"
              style={{ width: "5vh", height: "5vh" }}
            />
            <p>Profile</p>
          </div>
        </div>
        <div className="log_out" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <FaPowerOff size={'5vh'} className="text-danger"/>
              <p>Log Out</p>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-danger mx-auto" id="exampleModalLabel">Are You Sure to Log Out?</h5>
                    </div>
                    
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={logOut}>Continue and Log out</button>
                    </div>
                  </div>
                </div>
              </div> 
        </div>
      </NavbarComponent>
    </>
  );
}

export default Navbar;

const NavbarComponent = styled.div`
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nav-link {
    display: flex;
    gap: 1rem;
    transition: all 0.5s ease;
    margin: 0.5rem 0;
  }
  .profile_div, .log_out{
    display: flex;
    gap: 1rem;
    cursor: pointer;
  }
`;
