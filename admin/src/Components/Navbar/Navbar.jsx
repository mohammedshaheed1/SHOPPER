import React from 'react'
import './Navbar.css'
import navb_logo from '../../assets/nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navb_logo} alt="" className='nav-logo' />
      {/* <img src={nav_profile} alt="" className='nav-profile' /> */}
    </div>
  )
}

export default Navbar
