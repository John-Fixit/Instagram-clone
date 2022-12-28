import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FaRegSmile,
  FaRegImage,
  FaRegHeart,
  FaTelegramPlane,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import styled from "styled-components";
import user from "../../Images/user.PNG";
import { getMsg, sendMsg } from "../Utils/ApiRoutes";
import { useRef } from "react";
function ChatContainer({ currentUser, currentChat, socket }) {
  const [messageText, setmessageText] = useState("");
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setarrivalMessage] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  let currentTime = new Date();
  const scrollRef = useRef();
  useEffect(() => {
    setisLoading(true);
    if (currentChat) {
      axios
        .post(getMsg, { from: currentUser._id, to: currentChat._id })
        .then((data) => {
          setisLoading(false);
          setmessages(data.data.formatedMessage);
        });
    }
  }, [currentChat]);

  const sendMessage = () => {
    if (currentChat) {
      let data = {
        from: currentUser._id,
        to: currentChat._id,
        message: messageText,
      };
      axios.post(sendMsg, data);
      socket.current.emit("send_msg", data);
      let newMsg = {
        fromSelf: true,
        message: messageText,
        time:
          currentTime.toDateString() + " " + currentTime.toLocaleTimeString(),
      };
      setmessages((prev) => [...prev, newMsg]);
      setmessageText("");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("recieve_msg", (data) => {
        console.log(data);
        let newMsgRecieved = {
          fromSelf: false,
          message: data,
          time: currentTime.toLocaleTimeString(),
        };
        console.log(newMsgRecieved);
        setarrivalMessage(newMsgRecieved);
        // if(!!data){
        //     setmessages((prev)=>[...prev, newMsgRecieved])
        // }
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setmessages((prev) => [prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      <ChatStyleContainer>
        {currentChat ? (
          <div>
            <div className="header p-3 border-bottom">
              <div className="user_avatar">
                <img
                  src={
                    currentChat && !!currentChat.profilePicture
                      ? currentChat.profilePicture
                      : user
                  }
                  alt="loading"
                  className=""
                />
                <span className="mx-2 fw-bold username">
                  {currentChat ? currentChat.username : "username"}
                </span>
              </div>
            </div>
            <div className="message_container">
              <div className="all_messages_container">
                {isLoading ? (
                  <div className="mx-auto">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : messages.length ? (
                  messages.map((message, i) => {
                    return (
                      <div ref={scrollRef} key={i} className="">
                        <div
                          className={`message mt-1 ${
                            message.fromSelf && "sender"
                          }`}
                        >
                          <span
                            className="text-center"
                            style={{ fontSize: "11px" }}
                          >
                            {message.time}
                          </span>
                          <div
                            className={`content px-2 ${
                              message.fromSelf && "ms-auto"
                            }`}
                          >
                            <span
                              className={`text-start px-3 ${
                                message.fromSelf
                                  ? "ms-auto border-0"
                                  : "border reciever"
                              }`}
                            >
                              {message.message}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center">
                    No messages yet! start messaging
                  </div>
                )}
              </div>
              <div className="message-form border rounded-pill px-2">
                <FaRegSmile size="3.5vh" />
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Message..."
                  onChange={(e) => setmessageText(e.target.value)}
                  value={messageText}
                  onKeyPress={(event) => event.key == "Enter" && sendMessage()}
                />
                {messageText == "" ? (
                  <div className="d-flex">
                    <FaRegImage size="3.5vh" className="mx-1" />
                    <FaRegHeart size="3.5vh" />
                  </div>
                ) : (
                  <button
                    className="btn bg-white text-info"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center init_Msg">
            <div
              className="mx-auto border border-dark text-center align-items-center d-flex justify-content-center border-2 rounded-circle "
              style={{ height: "15vh", width: "15vh" }}
            >
              <FiSend size={"10vh"} className="fw-light" />
            </div>
            <span style={{ fontSize: "3vh", fontWeight: "lighter" }}>
              Your Messages
            </span>
            <p
              style={{ fontSize: "2vh", fontWeight: "400" }}
              className="text-muted"
            >
              Send private photos and messages to a friend
            </p>
          </div>
        )}
      </ChatStyleContainer>
    </>
  );
}

export default ChatContainer;

const ChatStyleContainer = styled.div`
  height: 95vh;
  align-items: center;
  border: 0.5px solid #dee2e6;
  overflow: hidden;
  .header {
    .user_avatar {
      img {
        border-radius: 50%;
        height: 1.6rem;
        width: 1.6rem;
      }
      span {
        cursor: pointer;
        &:hover {
          opacity: 50%;
        }
      }
    }
  }
    .message_container {
      padding: 0.3rem 1.5rem;
    }
    .all_messages_container {
      height: 75vh;
      display: flex;
      flex-direction: column;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 2px;
        &-thumb {
          background-color: rgb(230, 99, 143);
        }
      }
      .message {
        display: flex;
        flex-direction: column;
        .content {
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 0.6rem;
          border-radius: 1rem;
          .reciever {
            border-radius: 0.6rem;
          }
        }
      }
      .sender {
        .content {
          background-color: #efefef;
        }
      }

      .message_box {
        max-width: 49%;
        border-radius: 1.5vh;
        .content {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  .message-form {
    display: flex;
    align-items: center;
  }
  .init_Msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
  }
  @media only screen and (max-width: 768px) and (min-width: 50px) {
  }
`;
