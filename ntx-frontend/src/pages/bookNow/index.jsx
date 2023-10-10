// import from react
import React, { Component, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// import yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import toast from "react-hot-toast";

// import from reactstrap
import { Row, Col, Form } from "reactstrap";
// import component
import AppLayout from "../../components/layout";
import { CustomButton, CustomInput } from "../../components/CommonComponents";
// import images
import carImg from "../../assets/images/book/car.jpg";
import luggage from "../../assets/images/inner/luggage.svg";
import personImg from "../../assets/images/inner/personImg.svg";
// import styles
import "./styles.scss";
import axios from "axios";
import { storeData, getDataById } from "../../constants/apiService";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Spin from "../../components/CommonComponents/spin";

const schema = yup.object().shape({
  // start: yup.string().required(),
  // to: yup.string().required(),
  startDate: yup.date().required(),
  startTime: yup.string().required(),
  endDate: yup.date().required(),
  endTime: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});

const Book = () => {
  const [userData, setUserData] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [carData, setCarData] = useState([]);
  let { id } = useParams();

  let token = localStorage.getItem("access_token_cb");

  //fetching car details
  const fetchSingleCar = async () => {
    const url = `/cars/getsinglecar/${id}`;

    const result = await getDataById(url);

    if (result.status == 200) {
      // let eventDetail = result.data

      // let date = moment(new Date(result.data.datetime))
      // result.data.datetime = date.format('DD/MM/YYYY, h:mm:ss a')

      setCarData(result.data);
    } else if (result.response.status === 404) {
      toast.error(result.response.statusText);
    } else if (result.response.status === 400) {
      toast.error(result.response.data.errors[0].message);
    } else {
      toast.error(result.response.data.reason);
    }
  };

  useEffect(() => {
    fetchSingleCar();
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserData(decodedToken);

      console.log("decoded token", decodedToken);
    }
  }, []);

  console.log("userData in booking", userData);

  // useEffect(() => {
  //   if (token) {
  //     const decodedToken = jwt_decode(token)
  //     setUserId(decodedToken.id)

  //   }
  // }, [])

  const onSubmit = async (data) => {

    console.log("====================================data",data);
    setLoading(true);
    const startTime = data?.startTime;
    const endTime = data?.endTime;
    const startDate = moment(data?.startDate).format("MM/DD/YYYY");
    const endDate = moment(data?.endDate).format("MM/DD/YYYY");
    const from = data?.from;
    const to = data?.to;

    //   const start = moment(
    //     `${startDate} ${startTime}`,
    //     "YYYY-MM-DD HH:mm:ss"
    //   ).toISOString()

    //       // Combine endDate and endTime into end using moment
    // const end = moment(
    //   `${endDate} ${endTime}`,
    //   "YYYY-MM-DD HH:mm:ss"
    // ).toISOString()

    try {
      const result = await storeData("/bookings/book", {
        carId: id,
        userId: userData?.id,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        from: from,
        to: to
      });

      if (result.status == 200) {
        // console.log('car booked successfully', result)
        setLoading(false);
        // alert("car booked successfully")
        toast.success("Car booked sucessfully");
        navigate("/mybooking");
        // setvisible(false)
      } else if (result.status === 509) {
        setLoading(false);

        toast.error(result.message);
      } else if (result.status === 404) {
        setLoading(false);

        toast.error(result.statusText);
      } else if (result.status === 400) {
        setLoading(false);

        toast.error(result.data.errors[0].message);
      } else {
        setLoading(false);

        // console.log("result================reslut",result.response.data.message)
        toast.error(result.response.data.message);
      }
    } catch (e) {
      toast.error(e);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="booknow">
        <Row>
          <Col md={6}>
            <div className="booknow_left">
              <img
                src={`${process.env.REACT_APP_S3_BUCKET_URL}${carData.imageUrl}`}
                alt="car"
                style={{ maxHeight: "500px", maxWidth: "500px" }}
                className="img-fluid"
              />
              <div className="car-info d-flex mt-3 ">
                <div className="seat align-items-center d-flex">
                  <div className="number">{carData.name}</div>
                </div>
                <div className="seat align-items-center d-flex">
                  <div className="number"> Rent: ${carData.perHourRent}/hr</div>
                </div>
                <div className="seat align-items-center d-flex">
                  <div className="number">{carData.capacity}</div>
                  <img src={personImg} alt="rating" className="ms-2" />
                </div>
                <div className="luggage ms-3  align-items-center d-flex">
                  <div className="number">2</div>
                  <img src={luggage} alt="rating" className="ms-2" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="booknow_right">
              {loading ? (
                <Spin />
              ) : (
                <div className="booknow_right_heading ">
                  <h2>Book Now</h2>
                </div>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="input-wrapper">
        <label>Pickup Address:</label>
        <Controller
          control={control}
          name="start"
          render={({ field }) => (
            <CustomInput
              placeholder="enter your start place"
              type="text"
              {...field}
            />
          )}
        />
        {errors.start && <p className='text-danger'>This field is required</p>}
      </div>
      <div className="mt-4 input-wrapper">
        <label>Drop Address:</label>
        <Controller
          control={control}
          name="to"
          render={({ field }) => (
            <CustomInput
              placeholder="enter your end place"
              type="text"
              {...field}
            />
          )}
        />
        {errors.to && <p className='text-danger'>This field is required</p>}
      </div> */}
                <div className="mt-4 d-flex input-wrapper ">
                  <div className="w-50">
                    <label>Start Date:</label>
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <CustomInput
                          placeholder="2023/3/18"
                          type="date"
                          field={field}
                        />
                      )}
                    />
                    {errors.startDate && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="ms-4 w-50 input-wrapper">
                    <label>Start Time:</label>
                    <Controller
                      control={control}
                      name="startTime"
                      render={({ field }) => (
                        <CustomInput type="time" field={field} />
                      )}
                    />
                    {errors.startTime && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 d-flex input-wrapper ">
                  <div className="w-50">
                    <label>End Date:</label>
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field }) => (
                        <CustomInput
                          placeholder="2023/3/18"
                          type="date"
                          field={field}
                        />
                      )}
                    />
                    {errors.endDate && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="ms-4 w-50 input-wrapper">
                    <label>End Time:</label>
                    <Controller
                      control={control}
                      name="endTime"
                      render={({ field }) => (
                        <CustomInput type="time" field={field} />
                      )}
                    />
                    {errors.endTime && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 d-flex input-wrapper ">
                  <div className="w-50">
                    <label>From:</label>
                    <Controller
                      control={control}
                      name="from"
                      render={({ field }) => (
                        <CustomInput
                          placeholder="from"
                          type="text"
                          field={field}
                        />
                      )}
                    />
                    {errors.from && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="ms-4 w-50 input-wrapper">
                    <label>To:</label>
                    <Controller
                      control={control}
                      name="to"
                      render={({ field }) => (
                        <CustomInput placeholder="to" type="text" field={field} />
                      )}
                    />
                    {errors.endTime && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="btn-wrapper mt-5">
                  <CustomButton type="submit">Bok Now</CustomButton>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default Book;
