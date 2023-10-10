import React from 'react'
import { Button } from 'reactstrap'
import './styles.scss'

const CustomButton = ({ children, onClick }) => {
  return (
    <div className="btn-wrapper">
      <Button onClick={onClick}>{children}</Button>
    </div>
  )
}

export default CustomButton
