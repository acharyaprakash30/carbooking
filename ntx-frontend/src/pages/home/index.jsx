import React from 'react'
import MyCarousel from '../../components/landingComponents/carousel'
import Popular from '../../components/landingComponents/popularSection'
import OurVechiles from '../../components/landingComponents/Vechicles'
import AppLayout from '../../components/layout'
import EventSection from '../../events/eventsection/index'

const Home = () => {
  return (
    <AppLayout>
      <MyCarousel />

      <Popular />
      <OurVechiles />
    </AppLayout>
  )
}

export default Home
//    //{' '}
//    <AppLayout>
//    <MyCarousel />
//    {/* <Popular />
//  <OurVechiles /> */}
//    //{' '}
//  </AppLayout>
