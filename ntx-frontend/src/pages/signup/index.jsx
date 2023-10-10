// import from react
import React,{ useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

// import from reactstrap
import { Form, Row, Col } from 'reactstrap'

// import component
import { CustomButton, CustomInput } from '../../components/CommonComponents'
import AppLayout from '../../components/layout'

// import styles
import './styles.scss'

//import react hook form
import { useForm, Controller } from 'react-hook-form'

//import yup
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { storeData } from '../../constants/apiService'
import Spinner from '../../components/CommonComponents/spin';

const schema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is requried'),
  email: Yup.string().email().required('Email is requried'),
  // password: Yup.string().required('Password is requried'),
})

const SignupPage = () => {

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
    const url = '/user/register'

    const registerData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    }

    const response = await storeData(url, registerData)

    if (response.data) {
      setLoading(false);
      toast.success('User Register Sucessfully');

      navigate('/login')
      // setLoadings(true)
    } else {
      setLoading(false);
      toast.error(response.response.data.error);
      // setLoadings(false)
    }
    
  }

  useEffect(() => {
    if (isAlradyLoggedIn) {
      navigate('/')
    }
  })

  return (
    <AppLayout>
      <div className="signup">
        <Row className="justify-content-md-center form-wrapper">
          <Col md={5}>
            <div className="signup_form">
            <Form onSubmit={handleSubmit(onSubmit)}>

              
             
                
                <div className="input-wrapper mt-3">
                  <label>Full Name:</label>
                  <Controller
                    control={control}
                    name='fullName'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Enter your name'
                     
                        field={field}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <p className='text-danger'>Full Name is required</p>
                  )}
                </div>

                <div className="input-wrapper mt-3">
                  <label>Email:</label>
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
                
                {/* <div className='input-wrapper mt-3'>
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
                </div> */}
                <div className="signup_form_forget-password text-end mt-1">
                  <Link to="/login">Have already account Login ?</Link>{' '}
                </div>
                <div className="mt-2 signup_form_button">
                {
                  loading ? <Spinner/> :
                  <CustomButton type='submit'>Signup</CustomButton>
                }
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  )
}

export default SignupPage
