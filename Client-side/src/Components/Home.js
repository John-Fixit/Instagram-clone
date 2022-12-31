import React, { useEffect, useState } from 'react'
import style from './style.css'
import starSpinner from "./Pages/starSpinner.css";
import { Link, useNavigate, } from 'react-router-dom'
import { FaEllipsisH, FaRegSmile } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import { FaRegPaperPlane } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import userProfile from '../Images/user.PNG'
import styled from 'styled-components'
import axios from 'axios'
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { FaTimes } from "react-icons/fa";
import Navbar from './Navbar';
function Home({allPosts, allUsers, userInfo, thisUserDetail}) {
  const navigate = useNavigate()
  const URI = 'http://localhost:4000/user/home'
  const FOLLOWURI = 'http://localhost:4000/user/follow'
  const LIKEURI = 'http://localhost:4000/user/like'
  const COMMENTURI = 'http://localhost:4000/user/comment'
  const [fullname, setfullname] = useState("")
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [user_id, setuser_id] = useState("")
  const [profilePicture, setprofilePicture] = useState('')
  const [followedUserIndex, setfollowedUserIndex] = useState(undefined)
  const [friendsPost, setfriendsPost] = useState([])
  const [currentHours, setcurrentHours] = useState('')
  const [currentMinutes, setcurrentMinutes] = useState('')
  const [userComment, setuserComment] = useState('')
  const [view, setview] = useState('view all')
  const [hideShow, sethideShow] = useState(true)
  const [resMsg, setresMsg] = useState("")
  const [open, setOpen] = React.useState(false);
  const [unFollowedUsers, setunFollowedUsers] = useState(undefined)
  const [isLoading, setisLoading] = useState(true)
  useEffect(()=>{
    console.log(allUsers)
  })
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const follow = (followingUser) => {
    const followerDetail = { ownerId: followingUser.ownerId, username:followingUser.username, useremail:followingUser.useremail, userId: followingUser.id, ownerUsername: followingUser.ownerUsername,ownerEmail: followingUser.ownerEmail }
    axios.post(FOLLOWURI, followerDetail).then((res) => {
      setOpen(true)
      setresMsg(res.data.message)
      setfollowedUserIndex(followingUser.index)
    })
  }
  const like = (resource) => {
    const postLink = resource.postLink
    axios.post(LIKEURI, { username, user_id, postLink })
  }

  const comment = (postResource) => {
    let postLink = postResource.postLink
    let commentDetail = { username, user_id, postLink, userComment, profilePicture }
    setuserComment('')
    axios.post(COMMENTURI, commentDetail).then((res)=>{
      alert(res.data.message)
    })
  }
  const showComment = () => {
    if (view == 'view all') {
      setview('All')
      sethideShow(false)
    }
    else {
      setview('view all')
      sethideShow(true)
    }
  }
  return (
    <>
      <Container className=''>
        {/* <div className='nav_container'>
        <Navbar />
        </div> */}
          <div className='home_contents'>
            <div className='scroll-col' >
              <div className=' row border py-3 ps-3 rounded-3 my-3 mx-1'>
                {
                  friendsPost.map((user, index) => (
                    <div className='col-sm-3' key={index}>
                      <Link to=''><img src={user.profilePicture} alt='loading' className='border rounded-circle ms-2 w-75' /></Link>
                      <Link to='' className='text-decoration-none text-dark fw-light'><small >{user.username}</small></Link>
                    </div>
                  ))
                }
              </div>
              {
                allPosts.map((eachPost) => (
                  <div className="card mt-4" key={eachPost._id}>
                    <div className='row ps-3 py-2'>
                      <div className='col-2 posted_user'>
                        <Link to=''><img src={eachPost.profilePicture} className='card-img-top border border-dark rounded-circle' style={{ width: '7vh', height: '7vh' }} /></Link>
                        <div>
                          <Link to='' className='text-decoration-none text-dark'>{eachPost.username}</Link><br />
                          <Link to='' className='text-decoration-none text-dark fw-light'><small >{eachPost.postLocation}<small > Original Audio</small> </small></Link>
                          </div>
                      </div>
                      <div className='col-10 d-flex justify-content-between'>
                        <div className='col-sm-5'>
                        </div>
                        <div className='col-sm-4 text-end'><button className='border-0 bg-light'>{<FaEllipsisH />}</button></div>
                      </div>
                    </div>
                    <button className='text-dark border-0' style={{ backgroundColor: 'white' }}><img src={eachPost.postLink} className='card-img-top' /></button>
                    <div className='px-4'>
                      <div className='d-flex mt-2'>
                        <div className='col-1'>
                          <button className='text-dark comment_icons border-0 bg-white' onClick={() => like({ postId: eachPost._id, postLink: eachPost.postLink })}><FaRegHeart size='3vh' /></button>
                        </div>
                        <div className='col-1 px-3'>
                          <button className='text-dark comment_icons border-0 bg-white'><FaRegComment size='3vh' /></button>
                        </div>
                        <div className='col-1 px-4'>
                          <button className='text-dark comment_icons border-0 bg-white'><FaRegPaperPlane size='3vh' /></button>
                        </div>
                        <div className='col-9 text-end'>
                          <button className='text-dark comment_icons border-0 bg-white me-3'><FaRegBookmark size='3vh' /></button>
                        </div>
                      </div>
                      <div className='card border-0 pt-2 '>
                        <small className='opacity-50'> {
                          eachPost.noOfLikes.length >= 1 ? <button className='text-dark border-0 bg-white text-start' > {eachPost.noOfLikes.length} likes </button> :
                            <button className='text-dark border-0 bg-white'></button>
                        }</small>
                        <p ><Link to='' className='text-dark text-decoration-none'>{eachPost.username}</Link> {eachPost.postCaption}</p>
                        <small className='opacity-50'> {
                          eachPost.allComments.length >= 1 ? <button className='text-dark border-0 bg-white' onClick={showComment}>{view} {eachPost.allComments.length} comments </button> :
                            <button className='text-dark border-0 bg-white'>No comments, be the first to comment</button>
                        }</small>
                        <div className={hideShow ? 'd-none' : 'd-block'}>
                          {
                            eachPost.allComments.map((comment, index) => (
                              <div className='d-flex mt-3' key={index}>
                                <div className='col-lg-2 text-center'>
                                  <img src={comment.profilePicture} alt="" className='rounded-circle' style={{ width: '5vh', height: '5vh' }} />
                                </div>
                                <div className='col-lg-10 rounded-4 ms-3 w-75'>
                                  <div className='card bg-light shadow border-0'>
                                    <p className='card-title ms-3 fw-bold'>{comment.username}</p>
                                    <div className='card-body'>
                                      <div className='card-text'>{comment.userComment}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                        <small className=''>{
                          currentHours - parseInt(eachPost.postTime.hour) == 0 ? `${currentMinutes - eachPost.postTime.minute} minutes ago  ` : `${currentHours + parseInt(eachPost.postTime.hour)} hours ago`
                        }</small>

                        <hr className='opacity-10' />
                        <div className='d-flex'>
                          <span ><button className='border-0' style={{ backgroundColor: 'white' }}><FaRegSmile size='3.5vh' /></button></span>
                          <input type='text' className='form-control border-0 form-control_focus' placeholder='Add your comment...' onChange={(e) => setuserComment(e.target.value)} value={userComment}/>
                          <button className='btn text-info' onClick={() => comment({ postLink: eachPost.postLink })}>Post</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className='col-3 fix_card py-5'>
              <div className='row'>
                <div className='col-sm-3'>
                  <button className='text-dark border-0' style={{ backgroundColor: 'white' }}><img src={thisUserDetail && !!thisUserDetail.profilePicture
                      ? thisUserDetail.profilePicture
                      : userProfile} alt="" className='rounded-circle card-img-top' style={{ width: '9vh', height: '9vh' }} /></button>
                </div>
                <div className='col-sm-7'>
                  <Link to='' className='text-decoration-none text-dark'>{thisUserDetail && !!thisUserDetail.username
                      ? thisUserDetail.username
                      : "Username"}</Link>
                  <p><small className='opacity-50'>{thisUserDetail && !!thisUserDetail.fullname
                      ? thisUserDetail.fullname
                      : "Name"}</small></p>
                </div>
                <div className='col-sm-2 text-end'>
                  <button className='text-info border-0' style={{ fontSize: '2vh', fontWeight: '500', backgroundColor: 'white' }}>Switch</button>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-7'>
                  <p className='text-muted'>Suggestions For You</p>
                </div>
                <div className='col-sm-5 text-end p-0'>
                  <button className='text-dark border-0' style={{ backgroundColor: 'white' }}><small style={{ fontWeight: '500', fontSize: '1.7vh' }}>See All</small></button>
                </div>
              </div>
              {
                allUsers.map((users, index) => (
                  <div className='row' key={users._id}>
                    <div className='col-sm-3'>
                      <button className='text-decoration-none border-0' style={{ backgroundColor: 'white' }}>
                        {
                          <img src={!!users.profilePicture
                            ? users.profilePicture
                            : userProfile} alt="" className='rounded-circle border' style={{ width: '5vh', height: '5vh' }} />
                        }
                      </button>
                    </div>
                    <div className='col-sm-7 p-0'>
                      <Link to='' className='text-decoration-none text-dark'>{users.username}</Link>
                      <p><small className='opacity-50'>Instagram user</small></p>
                    </div>
                    <div className='col-sm-2'>
                      <FollowComponent>
                      <button className={`text-info border-0 ${index==followedUserIndex? 'following': 'follow'}`} style={{ fontSize: '2vh', fontWeight: '500', backgroundColor: 'white' }} onClick={() => follow({ownerId: users._id, username: thisUserDetail.username, useremail: thisUserDetail.email, id: thisUserDetail._id, index, ownerUsername: users.username, ownerUsername: users.username, ownerEmail: users.email })}>{ }</button>
                      </FollowComponent>
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
                  </div>
                ))
              }

              <div className='address'>
                <button className='btn opacity-50 p-0 pe-1' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>About</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Help</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Press</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>API</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Jobs</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Privacy</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Terms</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 ps-1 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Location</small></button><span className='opacity-50'>.</span>
                <button className='btn p-0 opacity-50' style={{ backgroundColor: 'white' }}><small style={{ fontSize: '1.7vh', fontWeight: '600' }}>Language</small></button>
              </div>
              <div className='card-footer border-top-0' style={{ backgroundColor: 'white' }}>
                <small className='opacity-50'>© 2022 INSTAGRAM FROM JFIX</small>
              </div>
            </div>
          </div>
      </Container>
      </>
  )
}

export default Home

const Container = styled.div`
display: flex;
.nav_container{
  width: 20vw;
}

.home_contents{
  width: 80vw;
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.scroll-col{
  height: 100vh;
  width: 40vw;
  overflow: auto;
  overflow-x: hidden;

}
.scroll-col::-webkit-scrollbar {
  width: 3px;
  border-radius: 6vh;
}

.scroll-col::-webkit-scrollbar-thumb{
  background: rgb(209, 201, 201);
border-radius: 10px;
}
.scroll-col::-webkit-scrollbar-track{
  box-shadow: inset 0 0 5px rgb(209, 201, 201);
  border-radius: 10px;
}
`

const FollowComponent = styled.div`
  .following::before{
    content: 'Following';
  }
  .follow::before{
    content: 'Follow ';
}
`