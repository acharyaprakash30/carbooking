import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
// import { actionCreator } from "../../reducers/actionCreator";
import { Drawer, Button, Space, notification, message, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { STRINGS } from "_constants";
import { CarsTable } from './table'
import AddCarForm from './form'

// import { EditEmployee } from "./editEmployee";
import axiosInstance from '../../../constants/axiosInstance'
import moment from 'moment'
import { deleteById } from '../../../constants/apiService'
import {
  getAllData,
  getAllFormData,
  deleteFormDataById,
} from '../../../constants/apiService'
import EditCarForm from './editCar'
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
    const url = '/cars/getallcars'

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

  const handleEdit = (record) => {
    console.log('from handle edit', record)
    setEditVisible(true)
    setEditId(record.id)
    setEditData(record)
  }

  const showDrawer = () => {
    setvisible(true)
  }

  const showEditDrawer = () => {
    setEditVisible(true)
  }

  const onEditClose = () => {
    setEditVisible(false)
  }
  const onClose = () => {
    setvisible(false)
  }
  const fetch = async () => {
    setLoading(false)
  }
  const handleDelete = async (id) => {
    if (id) {
      const url = `/cars/deletecar/${id}`
      const result = await deleteById(url)
      if (result.status == 200) {
        toast.success("Car Deleted Sucessfully")
        fetchAll()
      } else if (result.response.status === 404) {
        toast.error(result.response.statusText)
      } else if (result.response.status === 400) {
        toast.error(result.response.data.errors[0].message)
      } else {
        toast.error(result.response.data.message)
      }
    }

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
              <PlusOutlined /> Add {title}
            </Button>
            <Space></Space>

            <CarsTable
              // userData={props.event}
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
              fetchAll={fetchAll}
            />
            <AddCarForm
              onClose={onClose}
              fetchAll={fetchAll}
              setvisible={setvisible}
              visible={visible}
              // setsubmitting={setsubmitting}
              setclicked={setclicked}
              clicked={clicked}
              data={data}
              fid={id}
              setData={setData}
              setId={setId}
              {...props}
            />

            <EditCarForm
              data={editData}
              editId={editId}
              fetchAll={fetchAll}
              setvisible={setEditVisible}
              visible={editVisible}
              handleEdit={handleEdit}
              onClose={onEditClose}
              // setsubmitting={setsubmitting}
              setclicked={setclicked}
              clicked={clicked}
              // fid={id}
              setData={setData}
              {...props}
            />
          </Dashboard_Content>
        </Col>
      </Row>
    </>
  )
}

export default Event
