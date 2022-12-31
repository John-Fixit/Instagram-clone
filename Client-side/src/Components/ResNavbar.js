import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FaFacebookMessenger, FaPowerOff } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
function ResNavbar() {
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
  return (
    <>
            <footer>
                <NavLink >
                    
                </NavLink>
            </footer>
    </>
  )
}

export default ResNavbar