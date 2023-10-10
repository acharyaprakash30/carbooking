import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Row, Col } from 'antd'
import DashboardTopNav from '../header'
import Sidebar from '../sidebar'
import Dashboard_Content from '../pages'
// import Cars from '../pages/cars'

const MainRoute = ({ component: Component, path, keys, exact }) => {
  console.log('main route')
  console.log('main route component', Component)
  console.log('main route path', path)
  const [width, setWidth] = useState(4)

  // return (
  // <>
  //   <DashboardTopNav />
  //   <Component />
  //   <Sidebar />
  //   <Dashboard_Content></Dashboard_Content>
  // </>

  // <>
  //   <Row>
  //     <Col span={24}>
  //       <DashboardTopNav />
  //     </Col>
  //     <Col span={width}>
  //       <Sidebar setWidth={setWidth} width={width} />
  //     </Col>
  //     <Col span={24 - width}>
  //       <Dashboard_Content>
  //         <Component />
  //       </Dashboard_Content>
  //       {/* <Footer /> */}
  //     </Col>
  //   </Row>
  // </>

  if (path !== '/login') {
    console.log('Inside of if')

    return (
      <Routes>
        <Route
          // path={path}
          path='/admin'
          key={keys}
          exact={exact}
          render={(props) => {
            return (
              <div
                className='main_container'
                style={{
                  width: '100%',
                  overflowX: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Row>
                  <Col span={24}>
                    <DashboardTopNav />
                  </Col>
                  <Col span={width}>
                    <Sidebar setWidth={setWidth} width={width} />
                  </Col>
                  <Col span={24 - width}>
                    <Dashboard_Content>
                      <Component {...props} />
                    </Dashboard_Content>
                    {/* <Footer /> */}
                  </Col>
                </Row>
              </div>
            )
          }}
        />
      </Routes>
    )
  } else {
    console.log('outside of if')
  }

  // )
}

// export default MainRoute
