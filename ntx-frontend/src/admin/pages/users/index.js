import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import toast from 'react-hot-toast';

// import { actionCreator } from "../../reducers/actionCreator";
import { Drawer, Button, Space, notification, message, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { STRINGS } from "_constants";
import { UserTable } from './table'
import { UserForm } from './form'
// import { Edit } from "./editUser";
import axiosInstance from '../../../constants/axiosInstance'
import moment from 'moment'
import { deleteById } from '../../../constants/apiService'
import { getAllData } from '../../../constants/apiService'
import Sidebar from '../../sidebar'
import DashboardTopNav from '../../header'
import Dashboard_Content from '..'

const Users = (props) => {
  const title = 'User'
  const [width, setWidth] = useState(4)

  const [visible, setvisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [clicked, setclicked] = useState(false)
  const [data, setData] = useState('')
  const [id, setId] = useState('')
  const [editData, setEditData] = useState('')
  const [editId, setEditId] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    const url = '/user/getallusers'
    const result = await getAllData(url)
    console.log('all users are', result)
    if (result.status == 200) {
      let Notices = result.data
      Notices?.map((el) => {
        let date = moment(new Date(el.createdAt))
        el.createdAt = date.format('DD/MM/YYYY')
      })
      setData(Notices)

    } else if (result.response.status === 404) {
      toast.error(result.response.statusText)
    } else if (result.response.status === 400) {
      toast.error(result.response.data.errors[0].message)
    } else {
      console.log(result.response,"===========reslult =====================")
      toast.error(result.response.data.message)
    }
  }
  useEffect(() => {
    fetchAll()
  }, [])

  const showDrawer = () => {
    setvisible(true)
  }

  const showEditDrawer = () => {
    setEditVisible(true)
  }

  const onEditClose = () => {
    setEditVisible(false)
    // setId("");
    // setData("");
  }
  const onClose = () => {
    setvisible(false)
    setId('')
    setData('')
  }
  const fetch = async () => {
    // await props.fetchEmployees();
    setLoading(false)
  }
  const handleDelete = async (id) => {
    if (id) {
      const url = `/user/${id}`
      const result = await deleteById(url)
      if (result.status == 200) {
        fetchAll()
      } else if (result.response.status === 404) {
        toast.error(result.response.statusText)
      } else if (result.response.status === 400) {
        toast.error(result.response.data.errors[0].message)
      } else {
        toast.error(result.response.data.reason)
      }
    }
  }

  const handleEdit = (record) => {
    console.log('from handle edit', record)
    setEditVisible(true)
    setEditId(record.id)
    setEditData(record)
    // setId(record.id);
    // setData(record);
  }

  useEffect(() => {
    if (!visible) fetch()
  }, [visible])

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

            <UserTable
              userData={data}
              // userData={dummyDataSource}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
            />

            <UserForm
              fetchAllNotices={fetchAll}
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

            {/* <Edit
        editData={editData}
        fetchAllNotices={fetchAll}
        setvisible={setEditVisible}
        visible={editVisible}
        // setsubmitting={setsubmitting}
        setclicked={setclicked}
        clicked={clicked}
        // fid={id}
        setData={setData}
        editId={editId}
        {...props}
      /> */}
          </Dashboard_Content>
        </Col>
      </Row>
    </>
  )
}

export default Users
