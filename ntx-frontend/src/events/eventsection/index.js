import React, { Component, useState, useEffect } from 'react'

import { Row, Col, Card, Pagination } from 'antd'
import { Link } from 'react-router-dom'

import { baseURL } from '../../constants/axiosInstance'
import { getAllFormData } from '../../constants/apiService'

const { Meta } = Card

export default function EventSection() {
  // const [data, setData] = useState([]);
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAll = async () => {
    const url = 'cars/getallcars'

    const result = await getAllFormData(url)

    if (result.status == 200) {
      let cars = result.data

      setData(cars)
    } else if (result.response.status === 404) {
      alert(result.response.statusText)
    } else if (result.response.status === 400) {
      alert(result.response.data.errors[0].message)
    } else {
      alert(result.response.data.reason)
    }
  }
  useEffect(() => {
    fetchAll()
  }, [])
  console.log('car data', data)
  return (
    <Row className='row-container' id='events'>
      <Col span={24}>
        <p className='heading-secondary'>Cars</p>
      </Col>

      {data.map((result, i) => {
        return (
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
            <Link to={`/carDetail/${result._id}`}>
              <Card
                key={result._id}
                hoverable
                style={{
                  margin: '0.5rem 1rem',
                  padding: '2rem',

                  textAlign: 'center',
                }}
                cover={
                  <img
                    alt='example'
                    style={{ height: '150px', objectFit: 'cover' }}
                    src={`${process.env.S3_BUCKET_URL}${result.imageUrl}`}
                  />
                }
              >
                <Meta
                  title={result.name}
                  description={`Rent: $ ${result.perHourRent} / hr `}
                />
              </Card>
            </Link>
          </Col>
        )
      })}

      <Pagination
        onChange={setCurrentPage}
        current={currentPage}
        // pageSize={5}
        // defaultCurrent={1}
        total={data.length}
      />
    </Row>
  )
}
