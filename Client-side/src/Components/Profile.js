import React, { useEffect, useState } from "react";
import style from "./style.css";
import starSpinner from "./Pages/starSpinner.css";
import { Link, NavLink, useParams } from "react-router-dom";
import userProfile from "../Images/user.PNG";
import { BiCertification } from "react-icons/bi";
import { MdCalendarViewMonth, MdBookmarkBorder } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsOutlet } from "react-icons/bs";
import axios from "axios";
import Navbar from "./Navbar";
import { getUserDetail } from "./Utils/ApiRoutes";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { FaTimes } from "react-icons/fa";
function Profile() {
  const routeParams = useParams();
  const URI = "http://localhost:4000/user/upload";
  const [myImage, setmyImage] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [followers, setfollowers] = useState([]);
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [userDetail, setuserDetail] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [resMsg, setresMsg] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const userDetails = {}

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
    // setprofilePicture(userDetails.profilePicture)
    // setfollowers(userDetails.followers)
    // setfullname(userDetails.fullname)
    // setusername(userDetails.username)
  }, [routeParams.username]);
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

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid" style={{ marginTop: "5vh" }}>
        <div className="containe col-12 mx-auto">
          <div className="row">
            <div className="col-2 mt-3"></div>
            <div className="col-8 row">
              <div className="col-sm-4">
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
                  data-bs-target="#exampleModal"
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
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <div class="mx-auto">
                          <h5
                            class="modal-title text-center"
                            id="exampleModalLabel"
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

              <div className="col-sm-8 pb-4">
                <div className="row">
                  <p className="col-5 fs-2 fw-light">
                    {userDetail && !!userDetail.username
                      ? userDetail.username
                      : "Username"}
                  </p>
                  <p className="col-5">
                    <button className="btn border">Edit Profile</button>
                  </p>
                  <p className="col-2 ps-0">
                    <Link to="" className="text-dark">
                      <BiCertification size="4vh" />
                    </Link>
                  </p>
                </div>
                <div
                  className=""
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="pt-3">
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
                  <button
                    className="border-0"
                    style={{ backgroundColor: "white" }}
                  >
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
                  </button>
                  <button
                    className="border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <b>{userDetail && userDetail.following.length
                        ? userDetail.following.length
                        : "No"}</b> followimg
                  </button>
                </div>
                <div className="">
                  <h6 className="text-capitalize">{fullname}</h6>
                  <p>About the user</p>
                </div>
              </div>
              <hr />
              <div className="col-3"></div>
              <div
                className="border-0 col-7"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <NavLink
                  to="/post"
                  activeClassName="activePost"
                  className="border-0 opa_btn text-decoration-none "
                  style={{ fontSize: "13px" }}
                >
                  <MdCalendarViewMonth size="3vh" className="mx-1" /> POSTS
                </NavLink>
                <NavLink
                  to="/reels"
                  activeClassName="activP[ost"
                  className="border-0 opa_btn text-decoration-none "
                  style={{ fontSize: "13px" }}
                >
                  <BiMoviePlay size="3vh" className="mx-1" />
                  REELS
                </NavLink>
                <NavLink
                  to="/saved"
                  activeClassName="activP[ost"
                  className="border-0 opa_btn text-decoration-none "
                  style={{ fontSize: "13px" }}
                >
                  <MdBookmarkBorder size="3vh" className="mx-1" /> SAVED
                </NavLink>
                <NavLink
                  to="/tagged"
                  activeClassName="actiPe[ost"
                  className="border-0 opa_btn text-decoration-none "
                  style={{ fontSize: "13px" }}
                >
                  <BsOutlet size="3vh" className="mx-1" />
                  TAGGED
                </NavLink>
              </div>
              <div className="col-12">
                <div className="row">
                  {userDetails.userPosts.length ? (
                    userDetails.userPosts.map((eachPost) => (
                      <img
                        src={eachPost.postLink}
                        className="col-4 my-2 userPostImage"
                        key={eachPost.postLink}
                      />
                    ))
                  ) : (
                    <h5>No post uploaded</h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
