import axios from 'axios'
export const apiUrl = process.env.REACT_APP_API_URL
export const baseURL = process.env.REACT_APP_BASE_URL

// if (localStorage.access_token_cb) {
//   headers.Authorization = `token ${localStorage.access_token_cb}`
// }

//token value hardcoded for temporary use
const myToken = localStorage.getItem('access_token_cb')

// if (myToken) {
//   headers.Authorization = `Bearer ${myToken}`
// }

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
})

export const AxiosInstanceFiles = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
    // accept: 'application/json',
    contentType: `multipart/form-data`,
  },
})
