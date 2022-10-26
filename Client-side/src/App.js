import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Signin from './Components/Signin'
import Homepage from './Components/Homepage'
import Messanger from './Components/Messanger'
import LandingCom from './Components/LandingCom'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingCom />} />
        <Route path='/homepage/*' element={<Homepage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>

    </>
  )
} 

export default App