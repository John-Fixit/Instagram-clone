import React, {useState, useEffect} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Messanger from './Messanger'
import Home from './Home'
import Profile from './Profile'
import axios from 'axios'
import Post from './Post'
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
          setallUsers(() => {
            return found
          })
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
    <>
          {/* <Navbar thisUserDetail={thisUserDetail}/> */}
      <Routes>
        <Route path='/' element={<Home allPosts={allPosts} allUsers={allUsers} userInfo thisUserDetail={thisUserDetail} />} />
        <Route path='/post' element={<Post />}/>
        <Route path='/chat' element={<Messanger allUsers={allUsers} thisUserDetail={thisUserDetail}/>}/>
        <Route path='/:id' element={<Profile />} />
        <Route path='/message' element={<Messanger  allUsers={allUsers} thisUserDetail={thisUserDetail}/>} />
      </Routes>
    </>
  )
}

export default Homepage