import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import formik, { useFormik, } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import style from './style.css'
import { FaFacebookSquare, FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
import applePro from '../Images/apple.PNG'
import playStore from '../Images/plaayStore.PNG'
import logo from '../Images/word.PNG'

function SignUp() {
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const url = 'http://localhost:4000/user/signup'
    const navigate = useNavigate()
    const passwordRegex = /^([\w]{6,}([@]?)([!]?)([%]?))$/
    let profilePicture = ''
    let followers = []
    let userPosts = []
    let allMessage = []
    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            let fullname = values.fullname
            let username = values.username
            let email = values.email
            let password = values.password
            const userDetails = { fullname, username, email, password, profilePicture, followers, userPosts, allMessage };
            setisGoing(true)
            axios.post(url, userDetails).then((res) => {
                console.log(res);
                setisLoading(false)
                setisGoing(false)
                const responseFromServer = res.data;
                setmessage(responseFromServer.message)
                if(res.data.status){
                    formik.values.fullname = '';
                    formik.values.username = '';
                    formik.values.email = '';
                    formik.values.password = '';
                }
                else{
                    setstatus(responseFromServer.status)
                }
            }).catch((err) => {
                if (err) {
                    console.log(`There's an error`);
                }
            })
        },
        validationSchema: yup.object({
            fullname: yup.string().required(`This field is required`),
            username: yup.string().required(`This field is required`),
            email: yup.string().required(`This field is required`).email(`This is not an email address, use the verified one`),
            password: yup.string().required(`This field is required`).matches(passwordRegex, `Password must not less than 6 character`)
        })
    })

    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-md-6'>
                        <div className='card-img-none'></div>
                    </div>
                    <div className='col-md-6'>
                        <div className='col-lg-8 col-md-12'>
                            <div className="card h-100 py-4 px-4">
                                <h3 className='text-center'><img src={logo} /></h3>
                                <h6 className='text-muted sign_up'>Sign up to see photos and videos from your friends.</h6>
                                <button className='btn btn-primary text-light text-center'><FaFacebookSquare size='3vh' />Log in with facebook</button>
                                <div className='row mt-2 px-3'>
                                    <p className=' mt-2 border-top col-5'></p>
                                    <p className='col-2 text-muted'>OR</p>
                                    <p className=' mt-2 border-top col-5'></p>
                                </div>
                                {
                                    isLoading ? '' :
                                        status ? <div className='alert alert-success text-success'>{message}</div> : <div className='alert alert-danger text-danger'>{message}</div>
                                }
                                <form action='' onSubmit={formik.handleSubmit}>
                                    <div className='form'>
                                        <div className='form-floating'>
                                            <input type='email' className='form-control bg-light mt-2' name='email' onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} placeholder='Mobile Number or Email'/>
                                            <label for='' className='text-muted'>Mobile Number or Email</label>
                                        </div>
                                        {
                                            formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : " "
                                        }
                                        <div className='form-floating'>
                                            <input type='text' className='form-control bg-light mt-2' placeholder='Full Name' name='fullname' onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}/>
                                            <label for='' className='text-muted'>Full Name</label>
                                        </div>
                                        {
                                            formik.touched.fullname ? <small className='text-danger'>{formik.errors.fullname}</small> : " "
                                        }
                                        <div className='form-floating'>
                                            <input type='text' className='form-control bg-light mt-2' placeholder='Username' name='username' onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}/>
                                            <label for='' className='text-muted'>Username</label>
                                        </div>
                                        {
                                            formik.touched.username ? <small className='text-danger'>{formik.errors.username}</small> : " "
                                        }
                                        <div className='form-floating'>
                                            <input type='password' className='form-control bg-light  mt-2' placeholder='Password' name='password' onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}/>
                                            <label for='' className='text-muted'>Password</label>
                                        </div>
                                        {
                                            formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : " "
                                        }
                                    </div>
                                    <p className='text-muted text-center notice_db'>People who use our service may have uploaded your contact information to Instagram. <Link to={'*'} className='text-muted text-decoration-none'> Learn More </Link></p>
                                    <p className='text-muted text-center notice_db'>By signing up, you agree to our <Link to='*' className='text-muted text-decoration-none'>Terms</Link>,<Link to='*' className='text-muted text-decoration-none'>Data Policy</Link> and <Link to='*' className='text-muted text-decoration-none'>Cookies Policy.</Link></p>
                                    <button className='btn btn-info text-light opacity-50 py-0 w-100' type='submit'>{isGoing ? <div class="spinner-border text-light" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div> : 'Sign up'}</button>
                                </form>
                            </div>
                            <p className='border text-center mt-3 py-3'>Have an account? <Link to='/signin' className='opacity-50 text-decoration-none'>Sign In</Link></p>
                            <p className='text-center'>Get the app</p>
                            <div className='row px-2'>
                                <div className='col-6 px-5'>
                                    <img src={applePro} />
                                </div>
                                <div className='col-6 px-2'>
                                    <img src={playStore} />

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUp