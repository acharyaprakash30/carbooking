import React from 'react'
import { Input } from 'reactstrap'
import './styles.scss'

const CustomInput = ({ placeholder, type, name,field }) => {
  return (
    <div className="input-wrapper">
      <Input
        type={type}
        name={name}
        id="exampleEmail"
        placeholder={placeholder}
        {...field}
      />
    </div>
  )
}

export default CustomInput
