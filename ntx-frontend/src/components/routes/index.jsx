import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../../pages/Login'
import Book from '../../pages/bookNow'
import CarInner from '../../pages/CarInner'
import Home from '../../pages/home'
import SignupPage from '../../pages/signup'
import Mybooking from '../../pages/mybooking'
import Router from '../../admin/navigation/Router'
import Cars from "../../admin/pages/cars"
import Bookings from "../../admin/pages/bookings"
import Users from "../../admin/pages/users"
import Dashboard_Content from '../../admin/pages'
import Sidebar from '../../admin/sidebar'
import DashboardTopNav from '../../admin/header'
import ChangePassword from '../../pages/ChangePassword'


const MainRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/admin" element={<Router />} ></Route> */}
      <Route path="/" element={<Home />} ></Route>
      {/* <Route path="/carInner" element={<CarInner />}></Route> */}
      {/* <Route path='/carDetail/:id' element={<CarInner />} /> */}

      <Route path="/book/:id" element={<Book />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/changePassword" element={<ChangePassword />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/mybooking" element={<Mybooking />}></Route>
      <Route path='/admin' element={<Cars />} ></Route>
      <Route path='/admin/cars' element={<Cars />} ></Route>
      <Route path='/admin/bookings' element={<Bookings />} ></Route>
      <Route path='/admin/users' element={<Users />} ></Route>

   
   
    </Routes>
  )
}

export default MainRoutes
