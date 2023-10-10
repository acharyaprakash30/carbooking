import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// import image
import CarImg1 from '../../../assets/images/card-car1.svg'
import Rating from '../../../assets/images/Rating.svg'
import { getAllFormData } from '../../../constants/apiService'
import { baseURL } from '../../../constants/axiosInstance'

// import scss
import './styles.scss'

const OurVechiles = () => {
  const onClick = () => {
    console.log('onclikg')
  }

  const [data, setData] = useState('')
  const [total, setTotal] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAll = async () => {
    const url = 'cars/getallcars'

    const result = await getAllFormData(url)
  

    if (result.status == 200) {
      let cars = result.data
      setData(cars)
    } else if (result.status === 404) {
      alert(result.statusText)
    } else if (result.status === 400) {
      alert(result.data.errors[0].message)
    } else {
      alert("error fetching data")
    }
  }
  
  useEffect(() => {
    fetchAll()
  }, [])


  return (
    <div className="vechiles ">
      <div className="vechiles_heading txt-center mb-5">
        <h2>Our Vehicle</h2>
      </div>
      <Row>
        {/* <Col md={4} className="sm-12 xs-12 mb-4 mb-md-4  mb-lg-0">
          <Card className="vechiles_card">
            <div className="vechiles_card_top">
              <label> + Driver </label>
            </div>
            <img src={CarImg1} alt="car1" className="car-img" />
            <div className="p-3">
              <div className="vechiles_card_info d-flex justify-content-between pb-3">
                <h4 className="car-name">SUV</h4>
                <h4 className="rent-charge">Rs 10,000/Day</h4>
              </div>
              <div className="vechiles_card_rating d-flex mt-1">
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
              </div>
            </div>
            <div className="vechiles_card_btn block p-3">
              <Button className="block button" block={true} onClick={onClick}>
                {' '}
                View details
              </Button>
            </div>
          </Card>
        </Col> */}

          

        {Array.isArray(data) && data.length > 0
        ? data.map((result, i) => {


            return (


              <Col md={4} className="sm-12 xs-12 mb-4 mb-md-4  mb-lg-0">
              <Card className="vechiles_card">
                {/* <div className="vechiles_card_top">
                  <label> + Driver </label>
                </div> */}
                <img 
          
                      // src={`${baseURL}/${result.imageUrl}`}
                      src={`${process.env.REACT_APP_S3_BUCKET_URL}${result.imageUrl}`}

                 alt="car1" className="car-img" />
                <div className="p-3">
                  <div className="vechiles_card_info d-flex justify-content-between pb-3">
                    <h4 className="car-name">{result.name}</h4>
                    <h4 className="rent-charge">$ {result.perHourRent} /hr</h4>
                  </div>
                  <div className="vechiles_card_rating d-flex mt-1">
                    <img src={Rating} alt="rating" />
                    <img src={Rating} alt="rating" />
                    <img src={Rating} alt="rating" />
                    <img src={Rating} alt="rating" />
                  </div>
                </div>
                <div className="vechiles_card_btn block p-3">
                <Link to={`/book/${result._id}`}>

                  <Button className="block button" block={true} onClick={onClick}>
                    {' '}
                    Book Now
                  </Button>
                  </Link>
                </div>
              </Card>
            </Col>
            )
          })
        : ''}


        {/* <Col md={4} className="mb-4 mb-md-4 mb-lg-2 sm-12 xs-12">
          <Card className="vechiles_card">
            <div className="vechiles_card_top">
              <label> + Driver </label>
            </div>
            <img src={CarImg1} alt="car1" className="car-img" />
            <div className="p-3">
              <div className="vechiles_card_info d-flex justify-content-between pb-3">
                <h4 className="car-name">SUV</h4>
                <h4 className="rent-charge">Rs 10,000/Day</h4>
              </div>
              <div className="vechiles_card_rating d-flex mt-1">
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
              </div>
            </div>
            <div className="vechiles_card_btn block p-3">
              <Button className="block button" block={true}>
                {' '}
                View details
              </Button>
            </div>
          </Card>
        </Col>
        <Col md={4} className="mb-4 mb-lg-0">
          <Card className="vechiles_card">
            <div className="vechiles_card_top">
              <label> + Driver </label>
            </div>
            <img src={CarImg1} alt="car1" className="car-img" />
            <div className="p-3">
              <div className="vechiles_card_info d-flex justify-content-between pb-3">
                <h4 className="car-name">SUV</h4>
                <h4 className="rent-charge">Rs 10,000/Day</h4>
              </div>
              <div className="vechiles_card_rating d-flex mt-1">
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
              </div>
            </div>
            <div className="vechiles_card_btn block p-3">
              <Button className="block button" block={true}>
                {' '}
                View details
              </Button>
            </div>
          </Card>
        </Col>

        <Col md={4} className="mb-4 mb-lg-0">
          <Card className="vechiles_card">
            <div className="vechiles_card_top">
              <label> + Driver </label>
            </div>
            <img src={CarImg1} alt="car1" className="car-img" />
            <div className="p-3">
              <div className="vechiles_card_info d-flex justify-content-between pb-3">
                <h4 className="car-name">SUV</h4>
                <h4 className="rent-charge">Rs 10,000/Day</h4>
              </div>
              <div className="vechiles_card_rating d-flex mt-1">
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
                <img src={Rating} alt="rating" />
              </div>
            </div>
            <div className="vechiles_card_btn block p-3">
              <Button className="block button" block={true}>
                {' '}
                View details
              </Button>
            </div>
          </Card>
        </Col> */}
      </Row>
    </div>
  )
}

export default OurVechiles
