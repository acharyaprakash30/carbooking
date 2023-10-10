import React, { Component, useState, useEffect } from 'react'
import { Row, Col, DatePicker, TimePicker, Button, message } from 'antd'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/layout/navbar'
import Footer from '../../footer'
import img from '../../assets/images/image2.jpg'
import { getDataById, storeData } from '../../constants/apiService'
import { baseURL } from '../../constants/axiosInstance'
import moment from 'moment'

const EventDetail = (props) => {
  //car data
  const [data, setData] = useState([])
  let { id } = useParams()

  //booking state
  const [startDate, setStartDate] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [isBooked, setIsBooked] = useState(false)

  const disabledDate = (current) => current && current < moment().startOf('day')

  const handleStartDateTimeChange = (value) => {
    // setStartDateTime(value)
    // setIsBooked(false)
  }

  const handleEndDateTimeChange = (value) => {
    // setEndDateTime(value)
    // setIsBooked(false)
  }

  const handleBookingSubmit = async () => {
    // Check if the car is already booked during the selected time slot
    // const formattedStartDateTime = startDateTime
    //   .utc()
    //   .format('YYYY-M-DTH:mm:ss.SSS[Z]')
    // const formattedEndDateTime = endDateTime
    //   .utc()
    //   .format('YYYY-M-DTH:mm:ss.SSS[Z]')

    // console.log(
    //   'booking datetimeee',
    //   formattedStartDateTime,
    //   formattedEndDateTime
    // )

    const bookingInfo = {
      // carId: '6404ffea96622e2fd8930e41',
      // userId: id,
      // startTime: formattedStartDateTime,
      // endTime: formattedEndDateTime,
    }

    // console.log(
    //   'booking datetimeee',
    //   formattedStartDateTime,
    //   formattedEndDateTime
    // )

    const url = '/bookings/book'
    const result = await storeData(url, bookingInfo)

    console.log('result from car booking is', result)
    if (result.status == 201) {
      alert('car booked successfully')

      console.log('car booked successfully', result)
      // setvisible(false)
    } else if (result.response.status === 404) {
      alert(result.response.statusText)
    } else if (result.response.status === 400) {
      alert(result.response.data.errors[0].message)
    } else {
      console.log('error is', result.response.data.reason)
      alert(result.response.data.reason)
    }

    if (isBooked) {
      message.error('This car is already booked during the selected time slot.')
      return
    }

    // Make API call to book the car
    // ...

    message.success('Car booked successfully!')
  }

  //fetching car details
  const fetchSingleCar = async () => {
    const url = `/cars/getsinglecar/${id}`

    const result = await getDataById(url)

    if (result.status == 200) {
      let eventDetail = result.data

      let date = moment(new Date(result.data.datetime))
      result.data.datetime = date.format('DD/MM/YYYY, h:mm:ss a')

      setData(result.data)
    } else if (result.response.status === 404) {
      alert(result.response.statusText)
    } else if (result.response.status === 400) {
      alert(result.response.data.errors[0].message)
    } else {
      alert(result.response.data.reason)
    }
  }
  useEffect(() => {
    fetchSingleCar()
  }, [])
  // console.log("data is", data);
  return (
    <>
      <Navbar />

      <Row style={{ marginTop: '80px' }} className='row-container' id='event'>
        <Col span={24}>
          <p className='heading-secondary'>Book your favourite car</p>
        </Col>
        <Col xs={24} sm={10} md={6}>
          <img
            alt='example'
            style={{
              maxHeight: '150px',
              objectFit: 'cover',
              padding: '10px',
            }}
            src={`${baseURL}${data.imageUrl}`}
          />
          {/* <p>{data.name}</p> */}
        </Col>

        <Col style={{ textAlign: 'justify' }} xs={24} sm={14} md={18}>
          <h1> Car Name: {data.name} </h1>
          <h1> Rent: $ {data.perHourRent}/hr </h1>
          <h1> Capacity: {data.capacity} </h1>
          {/* <Button className='' size='md'>
            {' '}
            Book Now
          </Button> */}
          <div>
            <span>Pickup Date:</span>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              disabledDate={disabledDate}
              format='YYYY-MM-DD'
            />

            <span>Pickup Time:</span>
            <TimePicker
              value={startTime}
              onChange={setStartTime}
              disabledDate={disabledDate}
              format='HH:mm'
            />
          </div>
          <div>
            <span>Drop Date:</span>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              disabledDate={disabledDate}
              format='YYYY-MM-DD'
            />

            <span>Drop Time:</span>
            <TimePicker
              value={startTime}
              onChange={setStartTime}
              disabledDate={disabledDate}
              format='HH:mm'
            />
          </div>

          {/* <div>
            <span>End Date/Time:</span>
            <DatePicker
              onChange={handleEndDateTimeChange}
              disabledDate={disabledDate}
              showTime
              format='YYYY-MM-DD HH:mm:ss'
            />
          </div> */}
          {isBooked && (
            <div style={{ color: 'red' }}>
              This car is already booked during the selected time slot.
            </div>
          )}

          <Button type='primary' onClick={handleBookingSubmit}>
            Book Car
          </Button>
        </Col>
      </Row>
      <Footer />
    </>
  )
}
export default EventDetail
