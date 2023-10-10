import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Container,
} from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AxiosInstanceFiles } from '../../../constants/axiosInstance'
import { storeFormData, updateFormData } from '../../../constants/apiService'
import Spin from '../../../components/CommonComponents/spin'
import toast from 'react-hot-toast'
var DatePicker = require('reactstrap-date-picker')

const EditCarForm = ({
  data,
  editId,
  // handleEdit,
  onClose,
  visible,
  setVisible,
  modalOpen,
  toggleModal,
  fetchAll,
  handleStoreFeatureSnackBar,
  menus,
}) => {
  // console.log('data in event edit', data)
  // const initialMenu = {
    // title: data?.title,
    // datetime: data?.datetime,
    // description: data?.description,
  //   // image: data.imageUrl.value,
  // }

  const [menu, setMenu] = useState({})
  const [loading,setLoading] = useState(false);

  const [isError, setisError] = useState(false)
  const [error, setError] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dateValue, setDateValue] = useState('')

  const handleDateValue = () => {}

  useEffect(() => {
    setDateValue(new Date().toISOString())
  }, [])

  const handleCancelButton = () => {
    onClose()
  }

  useEffect(() => {
    setMenu(data);
  },[data]);





  const FILE_SIZE = 10 * 1024 * 1024 // 10 mb
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ]
  const MenuItemSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required(' Name is reqiuired'),
    // datetime: Yup.date().required(" Date & Time is reqiuired"),

    perHourRent: Yup.string().required('Per hour rent is required'),
    imageUrl: Yup.mixed()
      .required('A file is required')
  })
  const onSubmitClick = async (menuData) => {
    // setLoading(true);
    const url = '/cars/editCar'
    let menuItemsData = new FormData()
    menuItemsData.append('imageUrl', menuData.imageUrl)
    menuItemsData.append('name', menuData.name)
    menuItemsData.append('perHourRent', menuData.perHourRent)
    menuItemsData.append('capacity', menuData.capacity)
    menuItemsData.append('fuelType', 'petrol')
    onClose();
    // const result = await storeFormData(url, menuItemsData)
    // if (result.status == 200) {
    //   setLoading(false);
    //   toast.success("car created sucessfully")
    //   console.log('image details  has been sent to api')
    //   // toast.error("Car detals uploaded successfully")
    //   onClose()
    //   fetchAll()
    // } else if (result.response.status === 404) {
    //   setLoading(false);
    //   toast.error(result.response.statusText)
    // } else if (result.response.status === 400) {
    //   setLoading(false);
    //   toast.error(result.response.data.errors[0].message)
    // } else {
    //   setLoading(false);
    //   toast.error(result.response.data.reason)
    // }
  }

if(menu){
  return (
    <div>
      <Modal
        isOpen={visible}
        toggle={toggleModal}
        wrapClassName='modal-right'
        backdrop='static'
      >
        <ModalHeader toggle={toggleModal}>
          <span style={{ fontSize: '15px' }}>Add Car</span>
        </ModalHeader>
        <div>
          <Container>
            <Formik
              initialValues={{
                name:menu.name,
                perHourRent:menu.perHourRent,
                capacity:menu.capacity,
                imageUrl:menu.imageUrl
              }}
              onSubmit={onSubmitClick}
              validationSchema={MenuItemSchema}
            >
              {(formProps) => (
                <Form className='av-tooltip tooltip-label-right'>
                  <ModalBody>
                    {error ? (
                      <FormGroup className='error-l-75'>
                        <Label style={{ color: 'red' }}>
                          error goes here{error}
                        </Label>
                      </FormGroup>
                    ) : null}
                    <div className='container'>
                      <div className='row'>
                        <FormGroup>
                          <Label>Image</Label>
                          <Input
                            type='file'
                            name='imageUrl'
                            className='form-control'
                            onChange={(event) => {
                              formProps.setFieldValue(
                                'imageUrl',
                                event.target.files[0]
                              )
                            }}
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.imageUrl &&
                          formProps.touched.imageUrl ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.imageUrl}
                            </div>
                          ) : null}
                        </FormGroup>
                        <FormGroup className=' col-md-12 error-l-75 mb-4'>
                          <Label>Car Name</Label>
                          <Field
                            type='text'
                            className='form-control'
                            name='name'
                            placeholder=' Car name'
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.name && formProps.touched.name ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.name}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className=' col-md-12 error-l-75'>
                          <Label>Rent ($ Per Hour)</Label>
                          <Field
                            type='number'
                            className='form-control'
                            name='perHourRent'
                            rows='3'
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.perHourRent &&
                          formProps.touched.perHourRent ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.perHourRent}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className=' col-md-12 error-l-75'>
                          <Label>Capacity</Label>
                          <Field
                            type='number'
                            className='form-control'
                            name='capacity'
                            rows='3'
                            style={{ fontSize: '15px' }}
                          />
                          {formProps.errors.capacity &&
                          formProps.touched.capacity ? (
                            <div className='invalid-feedback d-block'>
                              {formProps.errors.capacity}
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
                      onClick={() => handleCancelButton()}
                      style={{ fontSize: '15px' }}
                    >
                      Cancel
                    </Button>
                    {
                      loading ?<Spin/>:<Button
                      type='Submit'
                      color='primary'
                      outline
                      disabled={isError || isSubmitting}
                      style={{ fontSize: '15px' }}
                    >
                      Submit
                    </Button>
                    }
                  
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Container>
        </div>
      </Modal>
    </div>
)
}
return <></>
}

export default EditCarForm
