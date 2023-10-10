import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
// import { actionCreator } from "../../reducers/actionCreator";
import { Drawer, Button, Space, notification, message, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { STRINGS } from "_constants";
import { BookingsTable } from './table'

// import { EditEmployee } from "./editEmployee";
import axiosInstance from '../../../constants/axiosInstance'
import moment from 'moment'
import {
  getAllData,
  getAllFormData,
  deleteFormDataById,
} from '../../../constants/apiService'
import DashboardTopNav from '../../header'
import Sidebar from '../../sidebar'
import Dashboard_Content from '..'
import toast from 'react-hot-toast';

const Event = (props) => {
  const [width, setWidth] = useState(4)

  const title = 'Cars'

  const [visible, setvisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [data, setData] = useState('')
  const [id, setId] = useState('')
  const [editData, setEditData] = useState('')
  const [editId, setEditId] = useState('')
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    const url = '/bookings/getAll'
    const result = await getAllFormData(url)

    if (result.status == 200) {
      let cars = result.data

      setData(cars)
    } else if (result.response.status === 404) {
      toast.error(result.response.statusText)
    } else if (result.response.status === 400) {
      toast.error(result.response.data.errors[0].message)
    } else {
      toast.error(result.response.data.reason)
    }
  }
  useEffect(() => {
    fetchAll()
  }, [])

  const showDrawer = () => {
    setvisible(true)
  }
  // useEffect(() => {
  //   if (!visible) fetch();
  // }, [visible]);

  return (
    <>
      <Row>
        <Col span={24}>
          <DashboardTopNav />
        </Col>
        <Col span={width}>
          <Sidebar setWidth={setWidth} width={width} />
        </Col>

        <Col span={24 - width}>
          <Dashboard_Content>
            <Button
              style={{ marginBottom: 10 }}
              type='primary'
              onClick={showDrawer}
            >
              Booking Details
            </Button>
            <Space></Space>
            <BookingsTable
              // userData={props.event}
              data={data.data}
            />
          </Dashboard_Content>
        </Col>
      </Row>
    </>
  )
}

export default Event
