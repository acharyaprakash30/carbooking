import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd-mobile'
import img1 from '../../../assets/images/car1.webp'
import img2 from '../../../assets/images/car2.webp'
import img3 from '../../../assets/images/car3.webp'

import './_style.scss'
export default function MyCarousel() {
  const [data, setData] = useState([img1, img2, img3])
  // const [imgHeight, setImageHeight] = useState('176')
  const [imgHeight, setImageHeight] = useState('10')

  return (
    <div className=' carouselSection' id='home'>
      <Carousel className='myCarousel' autoplay={true} infinite dots={true}>
        {data.map((val) => (
          <img
            src={`${val}`}
            // src={img1}
            alt=''
            style={{
              // maxHeight: '500px',
              objectFit: 'contain',
              width: '100%',
            }}
          />
        ))}
      </Carousel>
    </div>
  )
}
