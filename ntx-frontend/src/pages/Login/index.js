// import from react
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

// import from reactstrap
import { Form, Row, Col } from 'reactstrap'
import Spinner from '../../components/CommonComponents/spin'
// import component
import { CustomButton, CustomInput } from '../../components/CommonComponents'
import AppLayout from '../../components/layout'
import { storeData } from '../../constants/apiService'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// import styles
import './styles.scss'

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is requried'),
  password: Yup.string().required('Password is requried'),
})

const LoginPage = () => {

  const [loading,setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const isAlradyLoggedIn = localStorage.getItem('access_token_cb')

  const onSubmit = async (data) => {
    setLoading(true);
    const url = '/user/login'
    const loginData = {
      email: data.email,
      password: data.password,
    }
    const response = await storeData(url, loginData)

    if (response.data) {

      const { token } = response.data
      localStorage.setItem('access_token_cb', token) //setting access token in localStorage
      setLoading(false);
      toast.success('User Logged In Sucessfully');
      navigate('/')
      // setLoadings(true)
    } else {
    setLoading(false);
    toast.error('Invalid Credintals');
    }
  }

  useEffect(() => {
    if (isAlradyLoggedIn) {
      navigate('/')
    }
  })

  return (
    <AppLayout>
      <div className='login'>
        <Row className='justify-content-md-center form-wrapper'>
          <Col md={5}>
            <div className='login_form'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-wrapper '>
                  <label>Email</label>

                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Enter your email'
                        type='email'
                        field={field}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className='text-danger'>Email is required</p>
                  )}
                </div>
                <div className='input-wrapper mt-3'>
                  <label>password</label>

                  <Controller
                    control={control}
                    name='password'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Enter your password'
                        type='password'
                        field={field}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className='text-danger'>Pasword is required</p>
                  )}
                </div>

                {/* <div className='login_form_forget-password text-end mt-1'>
                  <Link to='/'> Forget password?</Link>
                </div> */}
                <div className='mt-4 login_form_button'>
                  <CustomButton type='submit'>Login</CustomButton>
                </div>
              </Form>
            </div>
            <div className='signup mt-4 text-center'>
              <Link to='/signup'> Don't have account Signup ?</Link>{' '}
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  )
}

// export default LoginPage;

// import React from 'react'

// const LoginPage = () => {
//   return <div>thisi s login page</div>
// }

export default LoginPage
