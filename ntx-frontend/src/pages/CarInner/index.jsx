// import from react
import React, { Component, useState, useEffect } from 'react'
// import from reactstrap
import { Card, Row, Col, Button } from 'reactstrap'
// import from component
import AppLayout from '../../components/layout'
import { CustomButton } from '../../components/CommonComponents'
// import from router dom
import { useNavigate } from 'react-router-dom'
// import image
import carImg from '../../assets/images/inner/car.svg'
import RatingImg from '../../assets/images/Rating.svg'
import luggage from '../../assets/images/inner/luggage.svg'
import personImg from '../../assets/images/inner/personImg.svg'
import cardoor from '../../assets/images/inner/cardoor.svg'
// import scss
import './styles.scss'
import { getDataById } from '../../constants/apiService'

import { useParams } from 'react-router-dom'


const CarInner = () => {
  const [data, setData] = useState([])

  let { id } = useParams()

  const navigate = useNavigate()

  const bookNow = () => {
    // navigate('/book')
  }

  //fetching car details
  const fetchSingleCar = async () => {
    const url = `/cars/getsinglecar/${id}`

    const result = await getDataById(url)

    if (result.status == 200) {
      // let eventDetail = result.data

      // let date = moment(new Date(result.data.datetime))
      // result.data.datetime = date.format('DD/MM/YYYY, h:mm:ss a')

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
console.log("relsult.data",data)
  return (
    <AppLayout>
      <div className="carInner mt-5 pb-5 pt-5">
        <Row>
          <Col md={8}>
            <div className="carInner_left">
              <div className="carInner_left_card_wrapper">
                <Card className="card ">
                  <div className="card-content d-flex">
                    <div className="cardleft">
                      {/* <div className="img-top">Driver +</div> */}
                      <img src={data.imageUrl} alt="car" />
                    </div>
                    <div className="cardlRight">
                      <h3>Car</h3>
                      <label className="des">{data.name}</label>

                      <div className="car-info d-flex mt-3 ">
                        <div className="seat align-items-center d-flex">
                          <div className="number">5</div>
                          <img src={personImg} alt="rating" className="ms-2" />
                        </div>
                        <div className="luggage ms-3  align-items-center d-flex">
                          <div className="number">2</div>
                          <img src={luggage} alt="rating" className="ms-2" />
                        </div>
                        <div className="door ms-3  align-items-center d-flex">
                          <div className="number">2</div>
                          <img src={cardoor} alt="rating" className="ms-2" />
                        </div>
                      </div>

                      <div className="rating d-flex mt-4">
                        <img src={RatingImg} alt="rating" />
                        <img src={RatingImg} alt="rating" />
                        <img src={RatingImg} alt="rating" />
                        <img src={RatingImg} alt="rating" />
                      </div>
                      <div className="button-wrappper  mt-4">
                        <CustomButton onClick={bookNow}>Book Now</CustomButton>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="features">
              <h2 className="mx-2">Features</h2>
              <ul>
                <li>Up to 3 passengers</li>
                <li>
                  Rear-seat amenities package (climate control, audio, reclining
                  seats)
                </li>
                <li>6” additional inches of rear leg room</li>
                <li>Enhanced safety package for a safer drive</li>
                <li>Power rear windshield shade and window shades</li>
                <li>Complimentary bottled water</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  )
}

export default CarInner
