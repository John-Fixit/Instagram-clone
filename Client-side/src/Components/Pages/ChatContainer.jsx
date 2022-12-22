import React from "react";
import { useState } from "react";
import { FaRegSmile, FaRegImage, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import user from "../../Images/user.PNG";
function ChatContainer({sendMsg}) {
  const [messageText, setmessageText] = useState("");

  const sendMessage = () => {
      sendMsg(messageText)
  };
  return (
    <ChatStyleContainer>
      <div className="message_container">
        <div className="header shadow-sm p-2">
          <div className="user_avatar">
            <img src={user} alt="loading" className="" />
          </div>
        </div>
        <div className="all_messages_container">
          <div className="message_box mt-1 border">
            <div className="content p-2">
              <span>I am John Fixit a student of SQI college of ICT</span>
            </div>
          </div>
          <div className="message_box mt-1 border float-end" >
            <div className="content p-2">
              <span>I am John Fixit a student of SQI college of ICT </span>
            </div>
          </div>
        </div>
      </div>
      <div className="message-form input-groupp border rounded-pill px-2">
        <FaRegSmile size="3.5vh" />
        <input
          type="text"
          className="form-control border-0"
          placeholder="Message..."
          onChange={(e) => setmessageText(e.target.value)}
          onKeyPress={(event) => event.key == "Enter" && sendMessage()}
        />
        {messageText == "" ? (
          <div className="d-flex">
            <FaRegImage size="3.5vh" className="mx-1" />
            <FaRegHeart size="3.5vh" />
          </div>
        ) : (
          <button className="btn bg-white text-info" onClick={sendMessage}>Send</button>
        )}
      </div>
    </ChatStyleContainer>
  );
}

export default ChatContainer;

const ChatStyleContainer = styled.div`
  .message_container {
    border-radius: 5px;
    margin: 2vh 0;
    .header {
      .user_avatar {
        img {
          border-radius: 50%;
          border: 1.8px solid rgb(230, 99, 143);
          height: 3.2rem;
          width: 3.2rem;
        }
      }
    }
    .all_messages_container {
      height: 60vh;
      .message_box {
        max-width: 49%;
        border-radius: 1.5vh;

      }
      
    }
  }
  .message-form {
    display: flex;
    align-items: center;

  }

  @media only screen and (max-width: 768px) and (min-width: 50px) {
  }
`;
