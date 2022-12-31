import React, {useState, useEffect, useRef} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Messanger from './Messanger'
import Home from './Home'
import Profile from './Profile'
import axios from 'axios'
import Post from './Post'
import { io } from 'socket.io-client'
import { baseUrl } from './Utils/ApiRoutes'
import styled from 'styled-components'
function Homepage() {
  const URI = 'http://localhost:4000/user/home'
 const [fullname, setfullname] = useState("")
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [user_id, setuser_id] = useState("")
  const [allUsers, setallUsers] = useState([])
  const [profilePicture, setprofilePicture] = useState('')
  const [thisUserDetail, setthisUserDetail] = useState({})
  const [allPosts, setallPosts] = useState([])
  const [friends, setfriends] = useState([])
  const [friendsPost, setfriendsPost] = useState([])
  const [currentHours, setcurrentHours] = useState('')
  const [currentMinutes, setcurrentMinutes] = useState('')
  const navigate = useNavigate()
  const [currentSeconds, setcurrentSeconds] = useState('')
  useEffect(() => {
    getHome()
  }, [])
  const socket = useRef()
  const getHome = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get(URI, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      if (res.data.status) {
        let responseFromServer = res.data
        let userInfo = responseFromServer.userDetails
        setthisUserDetail(()=>{return responseFromServer.userDetails})
        const allUserPost = responseFromServer.allPosts
        localStorage.setItem("userDetails", JSON.stringify(userInfo))
        setallPosts(() => {
          return allUserPost
        })
        const allRegisterUser = responseFromServer.result
        setfullname(userInfo.fullname)
        setemail(userInfo.email)

        let found = allRegisterUser.filter((user, index) => (
          user.email != userInfo.email
        ))
        if (found) {
          let filtedUsers = []
          userInfo.following.map((follower)=>{
             filtedUsers = found.filter((user)=> follower.friendId != user._id)
          })
          setallUsers(() => {
            return filtedUsers
          })
          console.log(allUsers)
        }
        setusername(userInfo.username)
        setuser_id(userInfo._id)
        
        setprofilePicture(userInfo.profilePicture)
        let foundPost = allPosts.filter((item, index) => (
          user_id != item.userId
        ))
        if (foundPost) {
          setfriendsPost(() => {
            return foundPost
          })
        }

      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('userDetails')
        navigate('/signin')
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Container>
      <div className='nav_container border-end'>
          <Navbar thisUserDetail={thisUserDetail}/>
      </div>
      <div className='contents'>
      <Routes>
        <Route path='/home' element={<Home allPosts={allPosts} allUsers={allUsers} userInfo thisUserDetail={thisUserDetail} />} />
        <Route path='/post' element={<Post thisUserDetail={thisUserDetail}/>}/>
        <Route path='/chat' element={<Messanger allUsers={allUsers} thisUserDetail={thisUserDetail}/>}/>
        <Route path='/:username' element={<Profile />} />
        <Route path='/message' element={<Messanger  allUsers={allUsers} thisUserDetail={thisUserDetail}/>} />
        <Route path='/nav' element={<Navbar />} />
      </Routes>
      </div>
    </Container>
  )
}

export default Homepage

const Container = styled.div`
  display: flex;
  .nav_container{
    width: 20vw;
    position: fixed;
  }
  .contents{
    margin: 0 15rem;
  }
`