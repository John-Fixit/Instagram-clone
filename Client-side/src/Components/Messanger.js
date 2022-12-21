import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaTelegram, FaTelegramPlane, FaRegSmile, FaRegImage, FaRegHeart } from "react-icons/fa";
import img from "../Images/user.PNG";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");
function Messanger({ allUsers, thisUserDetail }) {
  const [messageText, setmessageText] = useState("");
  const [allMessage, setallMessage] = useState([]);
  const [friendId, setfriendId] = useState('')

  const currentChatUser=(id)=>{
    console.log(id);
    setfriendId(id)
  }
  const sendMessage = () => {
    const currentTime = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    const thisUserId = thisUserDetail != undefined ? thisUserDetail._id : ''
    // socket.emit("message", {messageText, friendId, currentTime, thisUserId});
    socket.emit("message", {messageText});
  };
  useEffect(() => {
    if (allUsers.length) {
      console.log(allUsers);
    }
  }, []);

  return (
    <>
      <div className="gen_body">
        <div className="container">
          <div className="row">
            <div className="col-4 border card">
              
              <div className="users">
                {allUsers.length ? (
                  allUsers.map((user, index) => (
                    <div
                      key={index}
                      className="bg-white cursorPointer my-2"
                      onClick={() => currentChatUser(user._id)}
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
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                 
                )}
              </div>
            </div>
            <div className="col-8">
              <div className="shadow"></div>
              <div className="input-group border rounded-pill p-2">
              <button className='border-0' style={{ backgroundColor: 'white' }}><FaRegSmile size='3.5vh' /></button>
                <input
                  type="text"
                  className="form-control border-0 message_input"
                  placeholder="Message..."
                  onChange={(e) => setmessageText(e.target.value)}
                  onKeyPress={(event) => event.key == "Enter" && sendMessage()}
                />
                {
                  messageText == "" ?
                  <div>
                    <button className='border-0' style={{ backgroundColor: 'white' }}><FaRegImage size='3.5vh' /></button>
                    <button className='border-0' style={{ backgroundColor: 'white' }}><FaRegHeart size='3.5vh' /></button>
                    </div>:
                <button className="btn bg-white text-info">Send</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messanger;
