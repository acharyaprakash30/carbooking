import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import NavbarComponent from '../navbar'

const AppLayout = ({ children }) => {
  return (
    <div className="layoutcotainer">
      <div className="navbar">
        <NavbarComponent />
      </div>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
