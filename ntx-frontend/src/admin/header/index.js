import React from 'react'
import 'antd/dist/antd.css'
import { Layout, Menu, Input, Dropdown, Row, Col } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
// import "./style.css";

const { Search } = Input
const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/logout'>Logout</Link>
    </Menu.Item>
  </Menu>
)

class DashboardTopNav extends React.Component {
  render() {
    return (
      <Header
        className='site-layout-background modified-ant-layout-header'
        style={{
          width: '100%',
          height: 60,
          background: 'white',
          padding: 0,
          marginBottom: 3,
        }}
      >
        <Menu
          className='remove-hover-effect'
          style={{
            width: '100%',
            margin: 0,
            padding: 0,
            height: 60,
            boxShadow: '2px 2px 5px 3px #eee',
            display: 'flex',
          }}
          mode='horizontal'
        >
          <Menu.Item className='rm-ant-menu-item' key='3'>
            <i
              style={{ fontSize: '1.9rem', color: '#40A9FF' }}
              class='fa fa-bell-o'
              aria-hidden='true'
            >
              NTX LIMO
            </i>
          </Menu.Item>

          <Menu.Item
            style={{ marginLeft: 'auto' }}
            className='rm-ant-menu-item custom-logout-section'
            key='7'
          >
            <Dropdown overlay={menu}>
              <a
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                {localStorage.getItem('name')?.split(' ')[0]?.toUpperCase() ||
                  ''}{' '}
                <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default DashboardTopNav
