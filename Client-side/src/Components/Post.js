import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Post() {
    const navigate = useNavigate()
    const [myFile, setmyFile] = useState('')
    const [dnone, setdnone] = useState('d-none')
    const [myPostFile, setmyPostFile] = useState('')
    const [caption, setcaption] = useState('')
    const POSTURI = 'http://localhost:4000/user/createPost'
    const SaveURI = 'http://localhost:4000/user/savePost'
    const currentUser = JSON.parse(localStorage.getItem('userDetails'))
    const [profilePicture, setprofilePicture] = useState('')
    const [username, setusername] = useState('')
    const [location, setlocation] = useState('')
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setprofilePicture(currentUser.profilePicture)
        setusername(currentUser.username)
    }, [])
    const pickFile = (e) => {
        const selectedFile = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = () => {
            setmyFile(reader.result)
        }
    }
    const nextStep = () => {
        const convertedFile = { myFile }
        axios.post(POSTURI, convertedFile).then((res) => {
            setmyPostFile(res.data.secureUrl)
            setisLoading(res.data.status)
        })
        // if (postLink) {
        //     setdisable(false)
        //     setnextdisable(true)
        // }
        setdnone('d-block')
    }
    const sharePost = () => {
        const username = currentUser.username
        const userId = currentUser._id
        const postLink = myPostFile
        const postCaption = caption
        const postLocation = location
        const profilePicture = currentUser.profilePicture
        const newDate = new Date()
        let like = []
        let comments = []
        let postTime = { hour: newDate.getHours(), minute: newDate.getMinutes(), second: newDate.getSeconds() }
        const request = { postLink, postCaption, userId, postLocation, username, postTime, profilePicture, like, comments }
        axios.post(SaveURI, request).then((res) => {
            const responseFromServer = res.data
            currentUser.userPosts = responseFromServer.result.userPosts
            localStorage.setItem('userDetails', JSON.stringify(currentUser))
            navigate('/homepage')
        })
    }
    return (
        <>
            <Navbar />
            <div className='container-fluid text-center' style={{ marginTop: '15vh' }}>
                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Upload your file
                </button>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Create New Post</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='card border-0'>
                                            <p ><img src={myPostFile} className='card-img-top' /></p>
                                            <p className= {isLoading?'fs-3 fw-light d-none' : 'fs-3 fw-light' }>Choose photos and Videos here</p>
                                            <div className='card-body row '>
                                                <input type='file' className='col-12' onChange={(e) => pickFile(e)} />
                                                <button className={isLoading?'btn btn-primary col-12 mt-2 disabled' : 'btn btn-primary col-12 mt-2'}  onClick={nextStep}>Next</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={isLoading?`col-6 ${dnone}` : `col-6 d-block`}>
                                        <div className='d-flex mb-2'>
                                            <img src={profilePicture} alt='loading' className='rounded-circle border' style={{ width: '7vh', height: '7vh' }} />
                                            <p className='fw-bold p-2'>{username}</p>
                                        </div>
                                        <textarea name="w3review" rows="4" cols="50" className='form-control' placeholder='Write a caption...' onChange={(e) => setcaption(e.target.value)} />
                                        <input type='text' className='form-control border-0' placeholder='Enter the location' onChange={(e) => setlocation(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className={isLoading?"btn btn-primary" : "btn btn-primary disabled"}  onClick={sharePost}>Upload Post</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Post