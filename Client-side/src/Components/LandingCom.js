import React from 'react'
import { Link } from 'react-router-dom'

function LandingCom() {
  return (
    <>
        <h1>Hello world</h1>
        <Link to="/signup">Create an account</Link><br />
        <Link to="/signin">Sign into your account</Link>
    </>
  )
}

export default LandingCom