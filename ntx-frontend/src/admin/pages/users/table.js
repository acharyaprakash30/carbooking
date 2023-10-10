import React from 'react'
import { Button, Table, Space, Tooltip, Popconfirm,Select} from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { SkeletonTable } from '../../components/TableSkeleton'
import {updateData } from '../../../constants/apiService'
import { toast } from 'react-hot-toast'

export const UserTable = ({ handleEdit, handleDelete, userData }) => {

  const handleChange = async(value,recordItem) => {
    let userRole = {
      role:value
    };
    const url = `/user/updateRole/${recordItem._id}`
    const result = await updateData(url, userRole);
    if(result.status == '200'){
      toast.success(`${recordItem.fullName}  role changed to ${value} sucessfully`)
    }
  };

  const { loading } = userData

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'title',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role,record) =>{
        return(
          <Select
          defaultValue={role}
          style={{
            width: 120,
          }}
          onChange={(value) =>handleChange(value,record)}
          options={[
            {
              value: 'superAdmin',
              label: 'superAdmin',
            },
            {
              value: 'admin',
              label: 'admin',
            },
            {
              value: 'user',
              label: 'user',
            },
          ]}
          />
        )
      }
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   search: true,
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Created on',
      dataIndex: 'createdAt',
      key: 'createdAt',
      search: true,
      render: (date) => date,
    },
    ,
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip placement='bottomRight' title='Delete'>
            <Popconfirm
              title='Delete record?'
              onConfirm={() => handleDelete(record.id)}
            >
              <Button
                className='mr-1'
                style={{ backgroundColor: 'white', border: 0 }}
                size='small'
              >
                <DeleteFilled style={{ color: 'red' }} />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  if (loading) {
    return <SkeletonTable columns={columns} />
  }

  return (
    <Table
      pagination={{ position: ' bottomCenter ' }}
      columns={columns}
      dataSource={userData}
    ></Table>
  )
}
