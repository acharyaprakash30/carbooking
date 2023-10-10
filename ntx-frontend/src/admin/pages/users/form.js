import React, { useEffect, useState } from 'react'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import '../formStyle.css'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Container,
  Row,
  ButtonGroup,
  Table,
} from 'reactstrap'
import axios from 'axios'
import axiosInstance from '../../../constants/axiosInstance'

import {
  // Button,
  Input,
  Select,
  InputNumber,
  Upload,
  Radio,
  notification,
  message,
  Drawer,
  Space,
} from 'antd'
// import useUpload from "hooks/useUpload";

import isEmpty from 'lodash/isEmpty'

import { UploadOutlined } from '@ant-design/icons'

import { storeData, getAllData } from '../../../constants/apiService'

export const UserForm = ({
  data,
  visible,
  setvisible,
  setData,
  clicked,
  setclicked,
  fetchAllNotices,
}) => {
  const titlee = 'Notice'

  const [id, setId] = useState('')
  // const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false)
  const [error, setError] = useState('')

  // console.log("data in the form is",data);
  const initialValues = {
    fullname: '',
    email: '',
    password: '',
  }

  const Schema = Yup.object().shape({
    fullname: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required(' full name is reqiuired'),
    email: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required('email is required'),
    password: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required('password is required'),
  })

  const onClose = () => {
    setvisible(false)
    setId('')
    setData('')
  }

  const handleCancel = () => {
    setvisible(false)
    setId('')
    setData('')
    fetchAllNotices()
  }
  const onToggle = () => {
    setvisible(!visible)
  }

  const submitForm = async (formValues) => {
    const formdata = {
      name: formValues.fullname,
      email: formValues.email,
      password: formValues.password,
    }
    console.log('data submit from user', formdata)
    if (formValues) {
      const url = `/user/sign-up`
      const result = await storeData(url, formdata)
      console.log('result form post of notice is', result)
      if (result.status == 201) {
        console.log('modulr data post successfully', result)
        setvisible(false)
        fetchAllNotices()
      } else if (result.response.status === 404) {
        alert(result.response.statusText)
      } else if (result.response.status === 400) {
        alert(result.response.data.errors[0].message)
      } else {
        console.log('error is', result.response.data.reason)
        alert(result.response.data.reason)
      }
    }
  }

  return (
    <div>
      <form>
        <Modal
          isOpen={visible}
          toggle={onToggle}
          wrapClassName='modal-right'
          backdrop='static'
        >
          <ModalHeader toggle={onToggle}>
            <span style={{ fontSize: '15px' }}>Add User</span>
          </ModalHeader>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitForm}
              validationSchema={Schema}
            >
              {(formProps, values, errors, touched, isSubmitting) => (
                <Form className='av-tooltip tooltip-label-right'>
                  <ModalBody style={{ backgroundColor: '#f8f8f8' }}>
                    {error ? (
                      <FormGroup className='error-l-75'>
                        <Label style={{ color: 'red' }}>
                          error goes here{error}
                        </Label>
                      </FormGroup>
                    ) : null}
                    <div className='container'>
                      <div className='row'>
                        <FormGroup className=' col-md-12 error-l-75 mb-4'>
                          <Label>Full Name</Label>
                          <Field
                            type='text'
                            className='form-control'
                            name='fullname'
                            placeholder=''
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.fullname &&
                          formProps.touched.fullname ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.fullname}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className=' col-md-12 error-l-75'>
                          <Label>Email</Label>
                          <Field
                            type='email'
                            className='form-control'
                            name='email'
                            // component="textarea"
                            rows='3'
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.email && formProps.touched.email ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.email}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className=' col-md-12 error-l-75'>
                          <Label>Password</Label>
                          <Field
                            type='password'
                            className='form-control'
                            name='password'
                            // component="textarea"
                            rows='3'
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.password &&
                          formProps.touched.password ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.password}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color='secondary'
                      outline
                      onClick={() => handleCancel()}
                      style={{ fontSize: '15px' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='Submit'
                      color='primary'
                      outline
                      // disabled={isError || isSubmitting}
                      style={{ fontSize: '15px' }}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </form>
    </div>
  )
}
