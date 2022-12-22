import React, {useState} from 'react'
import styled from 'styled-components';
import img from "../../Images/user.PNG";
function Contact({allUsers, changeCurrentChat}) {
    const [selectedIndex, setselectedIndex] = useState(undefined)
    
    const changeCurrentChatFunc=({index, user})=>{
        setselectedIndex(index)
            if(user)
            {
                changeCurrentChat(user)
            }
    }
  return (
    <ContactContainer>
       <div className="users">
                {allUsers.length ? (
                  allUsers.map((user, index) => (
                    <div
                      key={index}
                      className={`bg-white cursorPointer my-2 ${index == selectedIndex? 'selected': ''}`}

                      onClick={() => changeCurrentChatFunc({index, user})}
                    >
                      <div className="d-flex chatFriend">
                        <img
                          src={
                            user.profilePicture == ""
                              ? img
                              : user.profilePicture
                          }
                          alt="profile"
                          className="card-img-top rounded-circle"
                          style={{ width: "5vh", height: "5vh" }}
                        />
                        <p className="ps-lg-3 ps-3">{user.username}</p>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
    </ContactContainer>
  )
}

export default Contact
const ContactContainer = styled.div`
    height: 80vh;
    .users{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    

`