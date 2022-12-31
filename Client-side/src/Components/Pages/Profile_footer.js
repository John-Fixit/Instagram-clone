import React from 'react'
import styled from 'styled-components'
function Profile_footer() {
        const footer_menu = ['Meta', 'About', 'blog', 'jobs', 'help', 'aPI', 'privacy', 'terms', 'top account', 'locations', 'instagram lite', 'contact uploading & Non-Users']
  return (
    <Container>
        <ul>
            {
                footer_menu.map((menu)=>{
                    return <li className='text-capitalize'>{menu}</li>
                })
            }
            
        </ul>
        <div className='footer_add'>
            <select className='border-0'>
                <option >English</option>
            </select>
            <small>@ 2022 Instagram from JFIXCoding</small>
        </div>
    </Container>
  )
}

export default Profile_footer

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    ul{
        display: flex;
        gap: 0.8rem;
        li{
            list-style-type: none;
            opacity: 50%;
            font-size: 2vh;
            font-family: sans-serif;
        }
    }
    .footer_add{
        opacity: 50%;
        font-size: 2vh;
        select{
            cursor: pointer;
        }
    }
`