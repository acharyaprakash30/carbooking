// import React from 'react'
// import { Route, Routes, Outlet } from 'react-router-dom'
// import { Index as NotFoundPage } from '../components/404'
// // import MainRoute from './MainRoute'
// import adminDashboard from '../pages/dashboard'

// const loadable = (loader) => React.lazy(loader)

// const routes = [
//   // System Pages
//   //   {
//   //     path: "/login",
//   //     component: loadable(() => import("../pages/Login")),
//   //     exact: true,
//   //     authorize: false,
//   //   },
//   // {
//   //   path: "/dashboard",
//   //   component: loadable(() => import("../pages/dashboard")),
//   //   exact: true,
//   //   authorize: false,
//   // },
//   {
//     path: '/',
//     component: loadable(() => import('../pages/users')),
//     exact: true,
//     authorize: false,
//   },
//   {
//     path: '/users',
//     component: loadable(() => import('../pages/users')),
//     exact: true,
//     authorize: false,
//   },
//   {
//     path: '/cars',
//     component: Cars,
//     exact: true,
//     authorize: false,
//   },

//   //   {
//   //     path: "/logout",
//   //     component: loadable(() => import("../pages/Logout")),
//   //     exact: true,
//   //     authorize: false,
//   //   },
// ]
// console.log('router comp')
// const Router = (props) => {
//   return (
//     <MainRoute
//       {...props}
//       path='/admin'
//       // path={`${props.match.path}/${route.path}`}
//       component={Cars}
//       key='123'
//       exact='true'
//       // header={route.header}
//     />
//   )
// }

// export default Router
