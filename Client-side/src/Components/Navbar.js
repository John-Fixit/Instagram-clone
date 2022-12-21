import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../Images/word.PNG'
import { FaHome, FaRegUser } from 'react-icons/fa'
import { FaFacebookMessenger } from 'react-icons/fa'
import { FaRegPlusSquare } from 'react-icons/fa'
import { FaCompass } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { BiCertification } from "react-icons/bi";
import { MdAutorenew } from "react-icons/md";
import style from './style.css'
import userProfile from '../Images/user.PNG'
import { useNavigate } from 'react-router-dom'
function Navbar({thisUserDetail}) {
    const navigate = useNavigate()
    const [profilePicture, setprofilePicture] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    useEffect(() => {
        console.log(thisUserDetail);
        setprofilePicture(thisUserDetail.profilePicture)
    })
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userDetails')
        navigate('/signin')
    }
    return (
        <>
            <div className='container-fluid border doc_body fixed-top' style={{ backgroundColor: 'white' }}>
                <div className='container'>
                    <div className='d-flex justify-content-space-evenly text-center gen_nav'>
                        <div className='col-md-4 col-sm-6'>
                            <NavLink activeClassName="active" to='/homepage' ><img src={logo} alt='profile' style={{ width: '17vh' }} className='mt-2' /></NavLink>
                        </div>
                        <div className='col-md-4 search col-sm-d-none'>
                            <input type='search' placeholder='search' className='form-control bg-light' />
                        </div>
                        <div className='col-md-4 col-sm-6 '>
                            <div className='d-flex justify-content-space-evenly pages_icons ps-5 mt-2'>
                                <div className='col-2'>
                                    <NavLink activeClassName="active" to='/homepage' id='nav_bar' ><FaHome size='3.5vh' className='text-dark' /></NavLink>
                                </div>
                                <div className='col-2'>
                                    <NavLink activeClassName="active" to='/homepage/chat' id='nav_bar' ><FaFacebookMessenger className='text-dark' size='3.5vh' /></NavLink>
                                </div>
                                <div className='col-2'>
                                    <NavLink activeClassName="active" to='/homepage/post' id='nav_bar' ><FaRegPlusSquare className='text-dark' size='3.5vh' /></NavLink>
                                </div>
                                <div className='col-2'>
                                    <NavLink activeClassName="active" to='/explore' id='nav_bar' ><FaCompass size='3.5vh' className='text-dark' /></NavLink>
                                </div>
                                <div className='col-2'>
                                    <NavLink activeClassName="active" to='/follow' id='nav_bar' ><FaRegHeart size='3.5vh' className='text-dark' /></NavLink>
                                </div>
                                <div className='col-2'>
                                    <div className="btn-group">
                                        <button type="button" className="btn dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            
                                            <img src={thisUserDetail!=undefined ? thisUserDetail.profilePicture : userProfile} alt="profile" className='card-img-top rounded-circle' style={{ width: '5vh', height: '5vh' }} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><NavLink activeClassName="active" to={thisUserDetail != undefined && "/homepage/" + thisUserDetail._id} className="dropdown-item"><FaRegUser /> Profile</NavLink></li>
                                            <li><NavLink activeClassName="active" to="/homepage" className="dropdown-item"><FaRegBookmark /> Saved</NavLink></li>
                                            <li><NavLink activeClassName="active" to="/homepage" className="dropdown-item"><BiCertification /> Settings</NavLink></li>
                                            <li><NavLink activeClassName="active" to="/homepage" className="dropdown-item"><MdAutorenew /> Switch account</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="btn dropdown-item" onClick={logOut}>Log out</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar