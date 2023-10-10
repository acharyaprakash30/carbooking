// import from react
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import jwt_decode from 'jwt-decode'

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
  oldPassword: Yup.string().required('old password is requried'),
  newPassword: Yup.string().required('new password is requried'),
  confirmPassword: Yup.string().required('confirm password is requried'),
})

const ChangePassword = () => {
  let token = localStorage.getItem('access_token_cb')
  const [userData, setUserData] = useState('')

  const [loading,setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()


  const onSubmit = async (data) => {
    setLoading(true);
    console.log("data=======================================",data);
    
    const url = `/user/changePassword/${userData?.id}`

    const response = await storeData(url, data);
    console.log("response ===============================",response.status);

    if (response.status == '200') {
      setLoading(false);
      toast.success('Password Changed Sucessfully');
      localStorage.removeItem('access_token_cb');
      navigate('/login');
      // setLoadings(true)
    } else {
    setLoading(false);
    toast.error(response.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token)
      setUserData(decodedToken)
      console.log('decoded token', decodedToken)
    }
    else{
      navigate('/login')
    }
  }, [])

  return (
    <AppLayout>
      <div className='login'>
        <Row className='justify-content-md-center form-wrapper'>
          <Col md={5}>
            <div className='login_form'>
            <h3>Change Password</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-wrapper '>
                  <label>Old Password</label>

                  <Controller
                    control={control}
                    name='oldPassword'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Enter your old password'
                        type='password'
                        field={field}
                      />
                    )}
                  />
                  {errors.oldPassword && (
                    <p className='text-danger'>Old password is required</p>
                  )}
                </div>
                <div className='input-wrapper mt-3'>
                  <label>New Password</label>

                  <Controller
                    control={control}
                    name='newPassword'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Enter your password'
                        type='password'
                        field={field}
                      />
                    )}
                  />
                  {errors.newPassword && (
                    <p className='text-danger'>Pasword is required</p>
                  )}
                </div>
                <div className='input-wrapper mt-3'>
                  <label>Confirm Password</label>

                  <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <CustomInput
                        placeholder='Confirm your password'
                        type='password'
                        field={field}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <p className='text-danger'>Confirm Pasword is required</p>
                  )}
                </div>

                {/* <div className='login_form_forget-password text-end mt-1'>
                  <Link to='/'> Forget password?</Link>
                </div> */}
                <div className='mt-4 login_form_button'>
                  <CustomButton type='submit'>Change Password</CustomButton>
                </div>
              </Form>
            </div>
            <div className='signup mt-4 text-center'>
              <Link  to='/login'>Back to login ?</Link>{' '}
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  )
}

// export default ChangePassword;

// import React from 'react'

// const ChangePassword = () => {
//   return <div>thisi s login page</div>
// }

export default ChangePassword
