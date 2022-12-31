import React, { useEffect, useState } from "react";
import style from "./style.css";
import starSpinner from "./Pages/starSpinner.css";
import { Link, NavLink, useParams } from "react-router-dom";
import userProfile from "../Images/user.PNG";
import post1 from "../Images/1.jpg";
import post2 from "../Images/2.PNG";
import { BiCertification } from "react-icons/bi";
import { MdCalendarViewMonth, MdBookmarkBorder } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsOutlet } from "react-icons/bs";
import axios from "axios";
import Navbar from "./Navbar";
import { getUserDetail } from "./Utils/ApiRoutes";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import TypeWriter from "typewriter-effect";
import Profile_footer from "./Pages/Profile_footer";
function Profile() {
  const routeParams = useParams();
  const URI = "http://localhost:4000/user/upload";
  const [fullname, setfullname] = useState("");
  const [userDetail, setuserDetail] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [resMsg, setresMsg] = useState("");
  const [selectedIndex, setselectedIndex] = useState(0);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (routeParams.username) {
      axios
        .get(`${getUserDetail}/${routeParams.username}`)
        .then((data) => {
          if (data.data.status) {
            setuserDetail(data.data.projectedUser);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [routeParams.username]);
  useEffect(() => {
    console.log(userDetail);
  });
  const selectImage = (e) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = () => {
      setisLoading(true);
      if (userDetail) {
        const imageDiv = { myImage: reader.result, userId: userDetail._id };
        axios.post(URI, imageDiv).then((res) => {
          setOpen(true);
          setisLoading(false);
          console.log(res.data);
          setresMsg(res.data.message);
        });
      }
    };
  };

  const menuItems = [
    {
      icon: <AiOutlineTable size={"2.3vh"} />,
      name: "post",
    },
    {
      icon: <BiMoviePlay size={"2.3vh"} />,
      name: "reels",
    },
    {
      icon: <MdBookmarkBorder size="2.3vh" />,
      name: "saved",
    },
    {
      icon: <BsOutlet size="2.3vh" />,
      name: "tagged",
    },
  ];

  const selectItem = (index) => {
    setselectedIndex(index);
  };

  return (
    <>
      <Container>
        <div className="profile_header">
          <div className="user_avatar">
            <img
              src={
                userDetail && !!userDetail.profilePicture
                  ? userDetail.profilePicture
                  : userProfile
              }
              alt="loading"
              className="border rounded-circle card-img-top"
              style={{ width: "20vh", height: "20vh", cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
            />
            {isLoading && (
              <div class="starSpinner center">
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
                <div class="starSpinner-blade"></div>
              </div>
            )}
            <div
              class="modal fade"
              id="profileModal"
              tabindex="-1"
              aria-labelledby="profileModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="mx-auto">
                      <h5
                        class="modal-title text-center"
                        id="profileModalLabel"
                      >
                        Change Profile Photo
                      </h5>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div className="cursorPointer text-center">
                      <label htmlFor="fileInput">
                        <b className="cursorPointer text-primary">
                          Upload Photo
                        </b>
                        <input
                          type="file"
                          id="fileInput"
                          accept="png, jpg, jpeg"
                          onChange={(e) => selectImage(e)}
                          className="d-none"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <div
                      data-bs-dismiss="modal"
                      className="cursorPointer mx-auto"
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={`${resMsg}`}
                action={
                  <React.Fragment>
                    <Button
                      color="secondary"
                      size="small"
                      onClick={handleClose}
                    >
                      <FaTimes cursor={"pointer"} size={"3.5vh"} />
                    </Button>
                  </React.Fragment>
                }
              />
            </div>
          </div>
          <div className="user_contact_info">
            <div className="user_personal_menu">
              <p className="fs-4 fw-light my-auto">
                {userDetail && !!userDetail.username
                  ? userDetail.username
                  : "Username"}
              </p>
              <button className="btn edit_profile_btn">Edit Profile</button>
              <div className="text-dark">
                <BiCertification size="4vh" />
              </div>
            </div>
            <div className="user_activities_info">
              <p className="my-auto">
                <b>
                  {userDetail && userDetail.userPosts.length
                    ? userDetail.userPosts.length
                    : "No"}
                </b>{" "}
                {userDetail
                  ? userDetails.userPosts.length <= 1
                    ? "Post"
                    : "Posts"
                  : "Post"}
              </p>
              <p className="my-auto">
                <b>
                  {userDetail && userDetail.followers.length
                    ? userDetail.followers.length
                    : "No"}
                </b>{" "}
                {userDetail
                  ? userDetails.followers.length <= 1
                    ? "Follower"
                    : "Followers"
                  : "Follower"}
              </p>
              <p className="my-auto">
                <b>
                  {userDetail && userDetail.following.length
                    ? userDetail.following.length
                    : "No"}
                </b>{" "}
                following
              </p>
            </div>
            <div className="user_bio">
              <h6 className="text-capitalize">
                {" "}
                {userDetail && !!userDetail.fullname
                  ? userDetail.fullname
                  : "Fullname"}
              </h6>
              <p>About the user</p>
            </div>
          </div>
        </div>
        <div className="profile_body border-top">
          <div className="activities_menu">
            {menuItems.map((item, index) => {
              return (
                <div
                  className={`menu_item ${
                    index == selectedIndex && "selected"
                  }`}
                  key={index}
                >
                  {item.icon}
                  <p className="my-auto selected_text text-uppercase">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="all_post_container">
            <div className="row">
              {userDetail ? (
                userDetail.userPosts.length ? (
                  userDetail.userPosts.map((post) => (
                    <div className="col-sm-4 my-4" key={post.postLink}>
                      <div class="card h-100 border-0">
                        <img
                          src={post.postLink}
                          class="card-img-top"
                          alt="..."
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3">
                    <h5>No post uploaded</h5>
                  </div>
                )
              ) : (
                <div className="text-center">
                  <TypeWriter
                    options={{
                      strings: "<h5>Loading...</h5>",
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
          <Profile_footer className="footer_component"/>
      </Container>
    </>
  );
}

export default Profile;

const Container = styled.div`
  width: 80vw;
  overflow-x: hidden;
  .profile_header {
    padding: 2rem 12rem;
    display: flex;
    gap: 7rem;
    .user_avatar {
    }
    .user_contact_info {
      display: flex;
      flex-direction: column;
      gap: 1.3rem;
      .user_personal_menu {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        .edit_profile_btn {
          background-color: #f1f1f1;
          &:hover {
            background-color: #dbdbdb;
          }
        }
      }
      .user_activities_info {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
    }
  }
  .profile_body {
    margin: 0rem 5rem;
    min-height: 55vh;
    .activities_menu {
      padding: 0 17rem;
      display: flex;
      gap: 4rem;
      .menu_item {
        display: flex;
        align-items: center;
        font-size: 13px;
        gap: 0.5rem;
        opacity: 50%;
        padding-top: 1rem;
        cursor: pointer;
        font-weight: 500;
      }
      .selected {
        opacity: 100%;
        border-top: 1px solid;
      }
    }
    .all_post_container {
    }
  }

`;
