import React, { useContext, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { Dropdown, NavDropdown } from 'react-bootstrap'



function Navbar() {

    const[menu,setMenu]=useState('shop')
    const {getTotalCartItems}=useContext(ShopContext)
    const menuRef=useRef()
    const dropdown_toggle=(e)=>{
          menuRef.current.classList.toggle('nav-menu-visible');
          e.target.classList.toggle('open');
    }
  return (
    <div className='custom-navbar'>
        <div className="nav-logo">
            <img  src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu('shop')}}>    <Link to='/'>Shop</Link>           {menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('men')}}>     <Link to='/mens'>Mens</Link>       {menu==='men'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('women')}}>   <Link to='/womens'>Womens</Link>  {menu==='women'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('kids')}}>    <Link to='/kids'>Kids</Link>       {menu==='kids'?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? 
          
          
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
              Account
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
              <Dropdown.Item>Your account</Dropdown.Item>
              <Dropdown.Item>
               <Link style={{textDecoration:'none'}} to="/orders">Your orders</Link>
              </Dropdown.Item>
              <Dropdown.Item>
              <Link style={{textDecoration:'none'}} to="/profile"> Your profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item style={{color:"red"}} onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
                  Logout
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
           : <Link to="/login"><button>Login</button></Link>}

           <Link to='/cart'> <img src={cart_icon} alt="" /></Link>  
             <div className="nav-cart-count">{getTotalCartItems()}</div>

        </div>
    </div>
  )
}

export default Navbar



