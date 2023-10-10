import React from 'react'
import { Button, Table, Space, Tooltip, Popconfirm } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import moment from 'moment'
// import { SkeletonTable } from 'components/TableSkeleton';
import { SkeletonTable } from '../../components/TableSkeleton'
import { baseURL } from '../../../constants/axiosInstance'

export const CarsTable = ({ data, handleDelete, handleEdit }) => {
  console.log('car table', data)
  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Car Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {name}
        </span>
      ),
    },

    {
      title: 'Rent Per Hour ($)',
      dataIndex: 'perHourRent',
      key: 'perHourRent',
      search: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (text) => <span>{text === null ? '-' : text}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      cellClass: 'text-muted  w-10',
      render: (image) => {
        var imageSrc = process.env.REACT_APP_S3_BUCKET_URL + image
        return (
          <>
            <span>
              <img
                className=''
                src={imageSrc}
                alt='Id proof'
                height='40px'
                width='40px'
              />
            </span>
          </>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            onClick={() => handleEdit(record)}
            className='mr-1 bg-primary'
            size='small'
            style={{ backgroundColor: 'white', border: 0 }}
          >
            <EditFilled style={{ color: 'green' }} />
          </Button>
          <Tooltip placement='bottomRight' title='Delete'>
            <Popconfirm
              title='Delete record?'
              onConfirm={() => handleDelete(record._id)}
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
  // if (loading) {
  //   return <SkeletonTable columns={columns} />;
  // }
  return (
    <Table
      pagination={{ position: ' bottomCenter ' }}
      columns={columns}
      dataSource={data}
    ></Table>
  )
}
