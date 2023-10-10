import React from 'react'
import { Button, Table, Space, Select, Popconfirm } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import moment from 'moment'
import { storeData } from '../../../constants/apiService'
import { toast } from 'react-hot-toast'



export const BookingsTable = ({ data}) => {
  console.log("data==============",data)

  const handleChange = async(value,recordItem) => {
    let statusData = {
      status:value
    };

    const url = `/bookings/${recordItem._id}`
    const result = await storeData(url, statusData);
    if(result.status == '200'){
      toast.success(`Booking status changed to ${value} sucessfully`)
    }
  };

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Car Name',
      dataIndex: 'car',
      key: 'car',
      render: (car) => (
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {car.name}
        </span>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {user.fullName}
        </span>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => {
        const formattedDate =moment(startTime).format('MMMM Do YYYY, h:mm:ss a');
        return(
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {formattedDate}

        </span>
      )},
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => {
        const formattedDate =moment(endTime).format('MMMM Do YYYY, h:mm:ss a');
        return(
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {formattedDate}

        </span>
      )},
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (paymentStatus) => {
        return(
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {paymentStatus ? "True":"False"}
        </span>
      )},
    },
    {
      title: 'Total Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => {
        return(
        <span>
          {/* {text ? moment(text).format("MMMM Do YYYY, h:mm:ss a") : ""} */}
          {cost}
        </span>
      )},
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
      render: (status,record) => {
        return(

          <Select
      defaultValue={status}
      style={{
        width: 120,
      }}
      onChange={(value) =>handleChange(value,record)}
      options={[
        {
          value: 'Pending',
          label: 'Pending',
        },
        {
          value: 'Accepted',
          label: 'Accepted',
        },
        {
          value: 'Delivered',
          label: 'Delivered',
        },
      ]}
    />
      )},
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'imageUrl',
    //   key: 'imageUrl',
    //   cellClass: 'text-muted  w-10',
    //   render: (image) => {
    //     var imageSrc = process.env.REACT_APP_S3_BUCKET_URL + image
    //     return (
    //       <>
    //         <span>
    //           <img
    //             className=''
    //             src={imageSrc}
    //             alt='Id proof'
    //             height='40px'
    //             width='40px'
    //           />
    //         </span>
    //       </>
    //     )
    //   },
    // },
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
