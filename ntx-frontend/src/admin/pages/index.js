import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { Drawer, Button, Radio, Space } from 'antd'

const Dashboard_Content = ({ children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Row>
      <Col xs={24} xl={23} lg={23} md={24} style={{}}>
        <div
          style={{
            marginTop: 30,
            marginLeft: 20,
            padding: '30px 40px',
            border: 'none',
            boxShadow: '2px 2px 15px 2px #eee,-2px -2px 15px 2px #eee',
            background: '#fff',
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  )
}

export default Dashboard_Content
