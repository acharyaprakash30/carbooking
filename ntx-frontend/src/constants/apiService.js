import { axiosInstance, AxiosInstanceFiles } from '../constants/axiosInstance'

export const storeData = async (endpoint, data) => {
  const result = await axiosInstance
    .post(endpoint, data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}
export const storeFormData = async (endpoint, data) => {
  console.log({ endpoint, data })
  const result = await AxiosInstanceFiles.post(endpoint, data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const getAllData = async (endpoint) => {
  const result = await axiosInstance
    .get(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const getAllFormData = async (endpoint) => {
  const result = await AxiosInstanceFiles.get(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const updateData = async (endpoint, updatedData) => {
  const result = await axiosInstance
    .patch(endpoint, updatedData)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}
export const updateFormData = async (endpoint, updatedData) => {
  const result = await AxiosInstanceFiles.patch(endpoint, updatedData)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const deleteById = async (endpoint) => {
  const result = await axiosInstance
    .delete(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const deleteFormDataById = async (endpoint) => {
  const result = await AxiosInstanceFiles.delete(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

export const getFormDataById = async (endpoint) => {
  const result = await AxiosInstanceFiles.get(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}
export const getDataById = async (endpoint) => {
  const result = await axiosInstance
    .get(endpoint)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  return result
}

// export const storeData = async (endpoint, data) => {
//   const result = await authAxios
//     .post(endpoint, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const getAllData = async (endpoint) => {
//   const result = await authAxios
//     .get(endpoint)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const getDataById = async (endpoint) => {
//   const result = await authAxios
//     .get(endpoint)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const updateData = async (endpoint, updatedData) => {
//   const result = await authAxios
//     .patch(endpoint, updatedData)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const deleteById = async (endpoint) => {
//   const result = await authAxios
//     .delete(endpoint)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const store = async (endpoint, data) => {
//   const result = await normalAxios
//     .post(endpoint, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const getById = async (endpoint) => {
//   const result = await normalAxios
//     .get(endpoint)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };

// export const deleteByIdNormal = async (endpoint) => {
//   const result = await normalAxios
//     .delete(endpoint)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err;
//     });
//   return result;
// };
