import React, { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaTelegram, FaTelegramPlane, FaRegSmile, FaRegImage, FaRegHeart } from "react-icons/fa";
import img from "../Images/user.PNG";
// import io from "socket.io-client";
import Contact from "./Pages/Contact";
import {io} from 'socket.io-client'
import ChatContainer from "./Pages/ChatContainer";
import styled from "styled-components";

import axios from "axios";
import { baseUrl, sendMsg } from "./Utils/ApiRoutes";
// const socket = io.connect(baseUrl);
function Messanger({ allUsers, thisUserDetail }) {
  const [allMessage, setallMessage] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined)
  const [messageText, setmessageText] = useState('')
  const socket = useRef()
  useEffect(()=>{
    setcurrentUser(thisUserDetail)
  }, [])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(baseUrl)
      socket.current.emit('add_user', currentUser._id)
    }

  }, [currentUser])

  const sendMsg=(data)=>{
    console.log(data)
      // axios.post(sendMsg, data).then((res)=>{
      //   console.log(res)
      // })
  }

  const changeCurrentChat=(data)=>{
      console.log(thisUserDetail._id)
      console.log(data)
  }



  return (
    <Container>
      <div className="gen_body col-sm-7 mx-auto">
          <div className="row">
            <div className="contact col-5 border card">
             <Contact allUsers= {allUsers} changeCurrentChat={changeCurrentChat}/>
            </div>
            <div className="chatBody col-7">
              <ChatContainer sendMsg={sendMsg}/>
            </div>
          </div>
        </div>
    </Container>
  );
}

export default Messanger;

const Container= styled.div`
  height: 100vh;
  border: 1px solid red;
  @media only screen and (max-width: 768px) and (min-width: 50px){
    margin: 0;
  }
`
