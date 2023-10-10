import React,{useState} from 'react'
import PropTypes from 'prop-types'
import classes from './Drawer.module.scss'
import { changeAnchor } from './change-anchor'
import { Link, useNavigate } from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

export const Drawer = ({open, anchor, onClose, token, userData }) => {

  const {
    drawer,
    animate,
    hidden,
    overlay,
    overlayOpen,
    overlayHidden,
    header,
  } = classes
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(!dropdownOpen)

  const handleLogout = () => {
    console.log('logout called')
    if (token) {
      localStorage.removeItem('access_token_cb')
      navigate('/login')
    } else {
      console.log('token doesnot exist')
    }
  }
// hot fixes done here, so some code enhancement is to be done here for component reusability
  return (
    <>
      <div
        className={`${overlay} ${!open && overlayHidden} ${
          open && overlayOpen
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        tabIndex="-1"
        className={`${drawer} ${open && animate} ${
          !open && hidden
        } ${changeAnchor(anchor, classes)}`}
      >
        <div className="p-3">
          <ul>
            <li className="mt-2">
              <Link className="text-white" style={{	textDecoration: 'none'}} to="/">Home</Link>
            </li>
            <hr></hr>
            <li className="mt-2" >
              <Link className="text-white" style={{	textDecoration: 'none'}} to="/mybooking">My Bookings</Link>
            </li>
            <hr/>
            {/* <li className="mt-2">
              <Link to="/">About</Link>
            </li>
            <hr></hr>

            <li className="mt-2">
              <Link to="/">Book</Link>
            </li> */}
       

            {/* <li className="mt-2">
              <Link to="/">Profile</Link>
            </li> */}
               <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className='btn btn-outline bg-success nav-links'>
                  {userData ? userData?.fullName : 'Profile'}
                </DropdownToggle>
                <DropdownMenu>
                  {token && (
                    <DropdownItem className="text-primary" onClick={handleLogout}>Logout</DropdownItem>
                  )}
                  {!token && (
                    <DropdownItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
          </ul>
          <div className={header} />
        </div>
      </div>
    </>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}
