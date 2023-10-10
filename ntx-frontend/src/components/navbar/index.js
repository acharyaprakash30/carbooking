// react import
import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// reactstrap import
import {
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { navItems } from './MenuItems'

import { Drawer } from '../drawer/index'
// scss import
import './styles.scss'

// third party import
import jwt_decode from 'jwt-decode'
import { GiHamburgerMenu } from 'react-icons/gi'

// import Logo from '../../../assets/images/logo.svg'

const NavbarComponent = ({ args }) => {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => setOpen(false), [])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [userData, setUserData] = useState('')

  let token = localStorage.getItem('access_token_cb')

  const toggle = () => setDropdownOpen(!dropdownOpen)

  useEffect(() => {
    console.log('navbar useeffect')
    if (token) {
      const decodedToken = jwt_decode(token)
      setUserData(decodedToken)
      console.warn('decoded token', decodedToken)
      console.log('decoded token', decodedToken)
    }
  }, [])

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem('access_token_cb')
      navigate('/login')
    } else {
      console.log('token doesnot exist')
    }
  }

  const changePassword = () =>{
    navigate('/changePassword');
  }
  
  console.log('navbar component')
  return (
    <React.Fragment>
      <div className='navbar-wrapper d-flex justify-content-between '>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div className='logo'>NTX LIMO</div>
        </Link>

        <div>
          <nav className='p-2'>
            <ul>
              <li key='0' onClick={() => setSelectedIndex(0)}>
                <Link
                  to='/'
                  className={`  ${selectedIndex === 0 ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li key='0' onClick={() => setSelectedIndex(0)}>
                <Link
                  to='/mybooking'
                  className={`  ${selectedIndex === 0 ? 'active' : ''}`}
                >
                  My Bookings
                </Link>
              </li>
              {/* <li key='1' onClick={() => setSelectedIndex(1)}>
                <Link to='/' className={selectedIndex === 1 ? 'active' : ''}>
                  Profile
                </Link>
              </li> */}

              {/* {navItems.map((item, index) => (
                <li key={index} onClick={() => setSelectedIndex(index)}>
                  <Link
                    to={item.link}
                    className={selectedIndex === index ? 'active' : ''}
                  >
                    {item.name}
                  </Link>
                </li>
              ))} */}

              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className=' btn btn-outline bg-success'>
                  {userData ? userData?.fullName : 'Profile'}
                </DropdownToggle>
                <DropdownMenu>
                  {token && (
                    <>
                    <DropdownItem
                      onClick={handleLogout}
                      className='text-primary'
                    >
                      Logout
                    </DropdownItem>
                    <DropdownItem
                      onClick={changePassword}
                      className='text-primary'
                    >
                      Change Password
                    </DropdownItem>
                    </>
                  )}
                  {!token && (
                    <DropdownItem
                      className='text-primary'
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </ul>
          </nav>

          {/* drwaer */}
          <div className=' drawer'>
            <div className='d-flex justify-content-between p-2'>
              <span>{/* <img src={Logo} alt="logo" /> */}</span>
              <button type='button' onClick={handleOpen} className='border-0'>
                <GiHamburgerMenu />
              </button>
            </div>
          </div>

          {open && (
            <Drawer
              anchor='right'
              open={open}
              onClose={handleClose}
              token={token}
              userData={userData}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavbarComponent
