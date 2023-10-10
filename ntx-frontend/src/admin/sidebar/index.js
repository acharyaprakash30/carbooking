import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link,
  useParams,
} from 'react-router-dom'
import { Layout, Menu, Input, Dropdown, Row, Col } from 'antd'
import { menu_list } from './menu_list'

const { Search } = Input
const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(4)
  let { currentUrl } = useParams()
  const onCollapse = (collapsed) => {
    if (collapsed) {
      props.setWidth(2)
    } else {
      props.setWidth(4)
    }
    setCollapsed(collapsed)
  }

  return (
    // <BrowserRouter>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme='light'
        defaultSelectedKeys={['1']}
        style={{ height: '100vh', boxShadow: '5px 2px 5px 3px #eee' }}
        mode='inline'
      >
        {menu_list.map((result, i) => {
          return result.type === 'menu' ? (
            <Menu.Item key={result.key} icon={result.icon}>
              <Link
                exact
                to={`/admin${result.path}`}
                // to={`${props.match.url}${result.path}`}
              >
                {result.label}
              </Link>
            </Menu.Item>
          ) : (
            <SubMenu key={result.key} icon={result.icon} title={result.title}>
              {result.submenu_item.map((res, i) => {
                return (
                  <Menu.Item key={res.key}>
                    <Link to={`${result.path}`}>
                      {/* {res.label} */}
                      {/* {`${currentUrl}${result.path}`} */}
                    </Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          )
        })}
      </Menu>
    </Sider>
  )
}

export default Sidebar
