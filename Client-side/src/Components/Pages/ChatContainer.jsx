import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FaRegSmile,
  FaRegImage,
  FaRegHeart,
} from "react-icons/fa";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { FiSend } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import styled from "styled-components";
import user from "../../Images/user.PNG";
import { getMsg, sendImgAsMsg, sendMsg } from "../Utils/ApiRoutes";
import { useRef } from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

function ChatContainer({ currentUser, currentChat, socket }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const [messageText, setmessageText] = useState("");
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setarrivalMessage] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [emojiDisplay, setemojiDisplay] = useState(false);
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
        msgType: 'text'
      };
      let newMsg = {
        fromSelf: true,
        message: messageText,
        msgType: "text",
        time:
          currentTime.toDateString() + " " + currentTime.toLocaleTimeString(),
      };
      handleSendRequest(data, newMsg)
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("recieve_msg", (data) => {
        console.log(data)
        let newMsgRecieved = {
          fromSelf: false,
          message: data.message,
          msgType: data.msgType,
          time:
            currentTime.toDateString() + " " + currentTime.toLocaleTimeString(),
        };
        setarrivalMessage(newMsgRecieved);
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const showEmojis = () => {
    setemojiDisplay(!emojiDisplay);
  };

  const emojiClicked = (emoji) => {
    let msg = messageText;
    msg += emoji.emoji;
    setmessageText(msg);
  };

  const sendImage = (e) => {
    const fileChoosed = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(fileChoosed);
    reader.onload = () => {
      const data = {
        from: currentUser._id,
        to: currentChat._id,
        message: reader.result,
        msgType: 'image'
      };
      axios.post(sendImgAsMsg, data);
      socket.emit("send_msg", data);
      let newMsg = {
        fromSelf: true,
        message: reader.result,
        msgType: "image",
        time: currentTime.toDateString() + " " + currentTime.toLocaleTimeString(),
      };
      setmessages((prev) => [...prev, newMsg]);
      handleSendRequest(data, newMsg)
    };
  };
  const sendHeart=()=>{
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: 'heart shape',
      msgType: 'heart'
    };
    let newMsg = {
      fromSelf: true,
      message: 'heart shape',
      msgType: "heart",
      time: currentTime.toDateString() + " " + currentTime.toLocaleTimeString(),
    };
    handleSendRequest(data, newMsg)
  }

  const handleSendRequest=(data, newMsg)=>{
    axios.post(sendMsg, data);
    socket.emit("send_msg", data);
    setmessages((prev) => [...prev, newMsg]);
    setmessageText("");
  }

const PopperCont =()=>{
  return <div>
<button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>The content of the Popper.</div>
          </Fade>
        )}
      </Popper>
  </div>
}

  return (
    <>
      <ChatStyleContainer>
        {currentChat ? (
          <div>
            <div className="header p-3 border-bottom">
              <div className="user_avatar">
                <Avatar alt="profile picture" src={
                    currentChat && !!currentChat.profilePicture
                      ? currentChat.profilePicture
                      : user
                  } />
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
                          // onMouseOver={}
                        >
                          
                          <span
                            className="text-center"
                            style={{ fontSize: "11px" }}
                          >
                            {message.time}
                          </span>
                          <div
                            className={`content ${
                              message.fromSelf && "ms-auto "
                            } ${(message.msgType == 'image' || message.msgType == 'heart') && 'p-0 my-1 bg-white'} `}
                          >
                            {message.msgType ? (
                              <div >
                                {
                                  message.msgType == "text" && (
                                    <span
                                      className={`text-start px-3 ${
                                        message.fromSelf
                                          ? "border-0"
                                          : "border py-1 reciever"
                                      }`}
                                    >
                                      {message.message}
                                      
                                    </span>
                                  ) 
                                }
                                {
                                  message.msgType == 'image'&&<img
                                  src={message.message}
                                  alt="loading"
                                  className={`msgImg card-img-top ${
                                    !message.fromSelf && "border reciever"
                                  }`}
                                />
                                }
                                {
                                  message.msgType == 'heart' &&
                                  <BsFillHeartFill size={'2.5rem'} className="text-danger"/>
                                }
                              

                                </div>
                            ) : (
                              <span
                                className={`text-start px-3 ${
                                  !message.fromSelf&&"border py-1 reciever"
                                }`}
                              >
                                {message.message}
                              </span>
                            )}
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
                <div className="emoji">
                  <FaRegSmile
                    size="3.5vh"
                    onClick={showEmojis}
                    className={`emojiIcon`}
                  />
                  {emojiDisplay && (
                    <EmojiSection className="shadow-sm">
                      <Picker
                        onEmojiClick={emojiClicked}
                        className="emoji-box"
                        width={300}
                      />
                    </EmojiSection>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Message..."
                  onChange={(e) => setmessageText(e.target.value)}
                  value={messageText}
                  onKeyPress={(event) => event.key == "Enter" && sendMessage()}
                />
                {messageText == "" ? (
                  <div className="upF">
                    <label htmlFor="imgFile">
                      <FaRegImage
                        size="3.5vh"
                        className="mx-3"
                        cursor={"pointer"}
                      />
                      <input
                        type="file"
                        id="imgFile"
                        className="d-none"
                        onChange={(e) => sendImage(e)}
                        accept="jpg, png, jpeg, gif"
                      />
                    </label>
                    <FaRegHeart size="3.5vh" cursor={"pointer"} onClick={sendHeart}/>
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
const EmojiSection = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: -10px;
  height: 50vh;
  overflow: hidden;
`;

const ChatStyleContainer = styled.div`
  height: 95vh;
  align-items: center;
  border: 0.5px solid #dee2e6;
  overflow: hidden;
  .header {
    .user_avatar {
      display: flex;
      align-items: center;
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
      height: 72vh;
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
          border-radius: 2rem;
          .msgImg{
            align-items: center;
            height: 60%;
          }
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
    .emoji{
      position: relative;
      .emojiIcon{
        cursor: pointer;
      }
    }
    .upF{
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
