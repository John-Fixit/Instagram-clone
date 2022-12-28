import React, { useState } from "react";
import styled from "styled-components";
import img from "../../Images/user.PNG";
import { FiChevronDown, FiEdit } from "react-icons/fi";

function Contact({ allUsers, changeCurrentChat, currentUser }) {
  const [selectedIndex, setselectedIndex] = useState(undefined);

  const changeCurrentChatFunc = ({ index, user }) => {
    setselectedIndex(index);
    if (user) {
      changeCurrentChat(user);
    }
  };
  return (
    <ContactContainer>
      <div className="header p-3 text-center border-bottom">
        <div className="user_headers">
          <span className="mx-2 cursorPointer" style={{fontWeight: '400'}}>
              {currentUser? currentUser.username : "username"}
          </span>
          <FiChevronDown style={{fontWeight: '400', fontSize: '4vh'}} className="cursorPointer"/>
          <FiEdit style={{fontWeight: '400', fontSize: '3.5vh'}} className="float-end cursorPointer"/>
        </div>
      </div>
      <div className="cursorPointer border-bottom d-flex px-3 py-2">
          <span className="" style={{fontSize: '2.3vh'}}>PRIMARY</span>
          <span className="mx-3 text-muted" style={{fontSize: '2.3vh'}}>GENERAL</span>
      </div>
      <div className="users py-2">
        {allUsers.length ? (
          allUsers.map((user, index) => (
            <div
              key={index}
              className={`cursorPointer ${
                index == selectedIndex ? "selected" : ""
              }`}
              onClick={() => changeCurrentChatFunc({ index, user })}
            >
              <div className="chatFriend">
                <img
                  src={user.profilePicture == "" ? img : user.profilePicture}
                  alt="profile"
                  className="rounded-circle"
                />
                <p className="ps-lg-3 ps-2">{user.username}</p>
              </div>
            </div>
          ))
          
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {allUsers.length ? (
          allUsers.map((user, index) => (
            <div
              key={index}
              className={`cursorPointer ${
                index == selectedIndex ? "selected" : ""
              }`}
              onClick={() => changeCurrentChatFunc({ index, user })}
            >
              <div className="chatFriend">
                <img
                  src={user.profilePicture == "" ? img : user.profilePicture}
                  alt="profile"
                  className="rounded-circle"
                />
                <p className="ps-lg-3 ps-2">{user.username}</p>
              </div>
            </div>
          ))
          
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </ContactContainer>
  );
}

export default Contact;
const ContactContainer = styled.div`
  border: 0.5px solid #DEE2E6;
  height: 95vh;
  .header{
    .user_headers{
      .cursorPointer{
        cursor: pointer;
      }
    }
  }
  .users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .chatFriend{
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin: 0.3rem 1rem;
        padding: 0.1rem;
      img{
        height: 3.3rem;
        width: 3.3rem;
      }
    }
    .selected {
      background-color: #efefef !important;
    }
  }
`;
