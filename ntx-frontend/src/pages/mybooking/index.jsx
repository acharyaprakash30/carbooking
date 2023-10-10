import React, {useEffect, useState  } from 'react'
import { Card, Row, Col } from 'reactstrap'
import car from '../../assets/images/mybooking/car.svg'
import AppLayout from '../../components/layout'
// import csss
import './styles.scss'
import CustomButton from '../../components/CommonComponents/button'
import { getDataById, getDataByIdInBody } from '../../constants/apiService'
import jwt_decode from 'jwt-decode'

// third party import
import moment from 'moment';

const Mybooking = () => {

  let token = localStorage.getItem('access_token_cb')
  const [userData, setUserData] = useState('')
  const [myBookings, setMyBookings] = useState('')

    //fetching car details
    const fetchBookings = async () => {

      console.log("userData",userData)
      console.log("userData?.id",userData?.id)
      if (userData?.id){

        const url = `/bookings/myBookings/${userData?.id}`
        const result = await getDataById(url)
      
  
  
      if (result.status == 200) {
        // let eventDetail = result.datas
  
        // let date = moment(new Date(result.data.datetime))
        // result.data.datetime = date.format('DD/MM/YYYY, h:mm:ss a')
  
        setMyBookings(result.data.data)
        
      } else if (result.response.status === 404) {
        alert(result.response.statusText)
      } else if (result.response.status === 400) {
        alert(result.response.data.errors[0].message)
      } else {
        alert(result.response.data.reason)
      }
    }

    }

    useEffect(() => {
      if (token) {
        const decodedToken = jwt_decode(token)
        setUserData(decodedToken)
        
        console.log('decoded token', decodedToken)
      }
      fetchBookings()

      
    }, [])

    useEffect(() => {
     
      fetchBookings()

      
    }, [userData])


  return (
    <AppLayout>
      <div className="booking-wrapper p-5">
      <div className="booking-wrapper_section ">
          <div className="text-center booking-wrapper_card_heading">
            <h2 className='border-bottom text-primary'>My bookings</h2>
          </div>
      {Array.isArray(myBookings) && myBookings.length >0
        ? myBookings.map((result, i) => {


            return (
             

     

          <div className="booking-wrapper_section_main mt-4 ">
            <Row>
              <Col md={3} sm={12} className="d-flex justify-content-center align-items-center">
                <div className="booking-wrapper_section_main_image_wrapper card-img mt-2 col">
                  {/* <img src={car} alt="car"  className='img-flid'/> */}
                  <img src={`${process.env.REACT_APP_S3_BUCKET_URL}${result.car.imageUrl}`} alt="car"  className='img-flid'/>
                </div>
              </Col>
              <Col md={9}>
                <div className="d-flex  main_wwrapper flex-column flex-md-row">
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>Vehicle </h4>
                    <b>&nbsp;{result.car.name}</b>
                  </div>

                  {/* <div className="booking-wrapper_section_main_info ms-3 ">
                    <h4>From</h4>
                    <b>&nbsp;Kathmandu</b>
                  </div>

                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>To</h4>
                    <b>&nbsp;Kavre</b>
                  </div> */}

                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>Start Date</h4>
                    <b> &nbsp;{moment(result?.startTime).format('YYYY-MM-DD')}</b>
                  </div>
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>Start Time</h4>
                    <b> &nbsp;{moment(result?.startTime).format('hh:mm:A')}</b>
                  </div>
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>End Date</h4>
                    <b> &nbsp;{moment(result?.endTime).format('YYYY-MM-DD')}</b>
                  </div>
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>End Time</h4>
                    <b> &nbsp;{moment(result?.endTime).format('hh:mm:A')}</b>
                  </div>
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>Total Cost</h4>
                    <b> &nbsp;{result?.cost}</b>
                  </div>
                  <div className="booking-wrapper_section_main_info ms-3">
                    <h4>Status</h4>
                    <b> &nbsp;{result?.status}</b>
                  </div>
                  {/* <div className="booking-wrapper_section_main_info button_wrapper ms-3">
                    <h4>Status</h4>
                    <label>Pending</label>
                  </div> */}
                </div>
                {/* <div className="d-flex mt-3 align-items-right justify-content-end booking-wrapper_section_main_btn-wrapper">
                  <div className="cancel">
                    <CustomButton>Cancel</CustomButton>
                  </div>
                  <div className="mx-3 download">
                    <CustomButton>Download</CustomButton>
                  </div>
                </div> */}
              </Col>
            </Row>
          </div>

           
            )
          })
        : 
        <h4 className='mt-4'>Sorry! No bookings available</h4>
        }

        </div> 
     
      </div>
    </AppLayout>
  )
}

export default Mybooking
