// import form react
import React from 'react'
// import from reactstrap
import { Row, Col } from 'reactstrap'
import './styles.scss'
import carImg from '../../../assets/images/car.jpg'

const Popular = () => {

  return (
    <div className="popular">
      <div className="popular_heading text-center">
        <h2 className='mt-4'> Our Popular Vehicles</h2>
      </div>
      <div className="popular_content mt-5">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="popular_content_first-img">
              <img src={carImg} alt="car" />
            </div>
          </Col>
          <Col md={6}>
            <div className="popular_content_first-main mx-2">
              <div className="heading">
                <h2 className='mt-4'> Luxury Sedan One</h2>
                <div className="description">
                  <p>
                    Our Sedan cars fit 3 passengers with luggage. They all
                    include professional chauffeurs, an on time guarantee,
                    music, bottled water, and more (varies from vehicle to
                    vehicle). This choice is excellent if you are looking for a
                    safe, comfortable and price-worthy trip.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5 align-items-center row">
      <Col md={6} className="d-flex flex-column order-md-2">
        <div className="popular_content_second-img">
          <img src={carImg} alt="car" />
        </div>
      </Col>
      <Col md={6} className="order-md-1">
        <div className="popular_content_second-main mx-2">
          <div className="heading">
            <h2 className='mt-4'> Luxury Sedan Two</h2>
            <div className="description">
              <p>
                Our Sedan cars fit 5 passengers with luggage. They all include
                professional chauffeurs, an on-time guarantee, music, bottled
                water, and more (varies from vehicle to vehicle). This choice
                is excellent if you are looking for a safe, comfortable, and
                price-worthy trip.
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>

        <Row className="mt-5 align-items-center">
          <Col md={6}>
            <div className="popular_content_third-img">
              <img src={carImg} alt="car" />
            </div>
          </Col>
          <Col md={6}>
            <div className="popular_content_third-main mx-2">
              <div className="heading">
                <h2 className='mt-4'> Luxury Sedan Three</h2>
                <div className="description">
                  <p>
                    Our Sedan cars fit 2 passengers with luggage. They all
                    include professional chauffeurs, an on time guarantee,
                    music, bottled water, and more (varies from vehicle to
                    vehicle). This choice is excellent if you are looking for a
                    safe, comfortable and price-worthy trip.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Popular
