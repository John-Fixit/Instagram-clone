import React, { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaTelegram, FaTelegramPlane, FaRegSmile, FaRegImage, FaRegHeart } from "react-icons/fa";
import img from "../Images/user.PNG";
import Contact from "./Pages/Contact";
import { io } from 'socket.io-client'
import ChatContainer from "./Pages/ChatContainer";
import styled from "styled-components";

import axios from "axios";
import { baseUrl } from "./Utils/ApiRoutes";
const socket = io.connect(baseUrl);
function Messanger({ allUsers, thisUserDetail }) {
const [currentChat, setcurrentChat] = useState(undefined)

useEffect(()=>{
  if(thisUserDetail){
    socket.emit('add_user', thisUserDetail._id)
  }
}, [thisUserDetail])

  const changeCurrentChat=(data)=>{
      setcurrentChat(data)
  }



  return (
    <Container>
      <div className="my-3 col-sm-10 mx-auto">
          <div className="row">
            <div className="contact col-5">
             <Contact allUsers= {allUsers} changeCurrentChat={changeCurrentChat} currentUser={thisUserDetail}/>
            </div>
            <div className="chatBody col-7">
              <ChatContainer currentChat={currentChat} currentUser={thisUserDetail} socket={socket}/>
            </div>
          </div>
        </div>
    </Container>
  );
}

export default Messanger;

const Container= styled.div`
  overflow: hidden;
  height: 100vh;
  width: 80vw;

  @media only screen and (max-width: 768px) and (min-width: 50px){
    margin: 0;
  }
`
