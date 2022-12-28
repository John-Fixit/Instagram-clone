import React, { useEffect, useState } from 'react'
import style from './style.css'
import { Link, NavLink } from 'react-router-dom'
import userProfile from '../Images/user.PNG'
import { BiCertification } from "react-icons/bi";
import { MdCalendarViewMonth, MdBookmarkBorder } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsOutlet } from "react-icons/bs";
import axios from 'axios';
import Navbar from './Navbar';
function Profile() {
    const URI = 'http://localhost:4000/user/upload'
    const [myImage, setmyImage] = useState('')
    const [profilePicture, setprofilePicture] = useState('')
    const [followers, setfollowers] = useState([])
    const [fullname, setfullname] = useState("")
    const [username, setusername] = useState("")  
    // const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const userDetails = {}
    useEffect(()=>{
        setprofilePicture(userDetails.profilePicture)
        setfollowers(userDetails.followers)
        setfullname(userDetails.fullname)
        setusername(userDetails.username)
    }, [])
    const selectImage = (e) => {
        const selectedImage = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedImage)
        reader.onload = () => {
            const convertedImage = reader.result
            setmyImage(convertedImage)
        }
    }
    const uploadImg = () => {
        const userId = userDetails._id
        const imageDiv = { myImage, userId }
        axios.post(URI, imageDiv).then((res) => {
            const resultFromServer = res.data
            console.log(resultFromServer);
            userDetails.profilePicture = resultFromServer.userProfilePicture
            alert(resultFromServer.message)
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
        })
    }

    return (
        <>
            <Navbar />
            <div className='container-fluid' style={{ marginTop: '15vh' }}>
                <div className='containe col-12 mx-auto'>
                    <div className='row'>
                        <div className='col-2 mt-3'></div>
                        <div className='col-8 row'>
                            <div className='col-sm-4'>
                                    <img src={profilePicture != "" ? profilePicture : userProfile} alt='loading' className='rounded-circle card-img-top' style={{width: '20vh', height: '20vh'}}/>
                                <input type='file' onChange={(e) => selectImage(e)} />
                                <button className='btn btn-outline-primary mt-2 w-100' onClick={uploadImg}>Upload</button>
                            </div>
                            <div className='col-sm-8 pb-4'>
                                <div className='row'>
                                    <p className='col-5 fs-2 fw-light'>{username}</p>
                                    <p className='col-5'>
                                        <button className='btn border'>Edit Profile</button>
                                    </p>
                                    <p className='col-2 ps-0'><Link to='' className='text-dark'><BiCertification size='4vh' /></Link></p>
                                </div>
                                <div className='' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='pt-3'><b>{userDetails.userPosts.length? userDetails.userPosts.length: 'No'}</b> Post</p>
                                    <button className='border-0' style={{ backgroundColor: 'white' }}><b>{followers ? followers.length : 'No'}</b> followers</button>
                                    <button className='border-0' style={{ backgroundColor: 'white' }}><b>No</b> followimg</button>
                                </div>
                                <div className=''>
                                    <h6 className='text-capitalize'>{fullname}</h6>
                                    <p>About the user</p>
                                </div>
                            </div>
                            <hr />
                            <div className='col-3'></div>
                            <div className='border-0 col-7' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <NavLink to='/post' activeClassName="activePost" className='border-0 opa_btn text-decoration-none ' style={{fontSize: '13px', }}>< MdCalendarViewMonth size="3vh" className='mx-1'/> POSTS</NavLink>
                                <NavLink to='/reels' activeClassName="activP[ost" className='border-0 opa_btn text-decoration-none ' style={{ fontSize: '13px', }}><BiMoviePlay size="3vh" className='mx-1'/>REELS</NavLink>
                                <NavLink to='/saved' activeClassName="activP[ost" className='border-0 opa_btn text-decoration-none ' style={{ fontSize: '13px', }}><MdBookmarkBorder size="3vh" className='mx-1' /> SAVED</NavLink>
                                <NavLink to='/tagged' activeClassName="actiPe[ost" className='border-0 opa_btn text-decoration-none ' style={{ fontSize: '13px', }}>< BsOutlet size="3vh"  className='mx-1'/>TAGGED</NavLink>
                            </div>
                            <div className='col-12'>
                                <div className='row'>
                                {
                                    userDetails.userPosts.length ? userDetails.userPosts.map((eachPost)=>(
                                        <img src={eachPost.postLink} className='col-4 my-2 userPostImage' key={eachPost.postLink}/>
                                    )) : 
                                    <h5>No post yet</h5>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile