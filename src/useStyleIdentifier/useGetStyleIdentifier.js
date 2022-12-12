import Axios from 'axios'
import { useState } from 'react'

export function useGetStyleIdentifier() {
  const [dataStyles, setDataStyles] = useState([])
  const getStyleIdentifier = () => {
    Axios({
      method: 'GET',
      url: process.env.REACT_APP_PROXY + '/styles',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      params: { count: 10 },
    })
      .then((res) => {
        setDataStyles(res.data)
      })
      .catch((err) => {
        alert(err)
      })
  }
  return {
    getStyleIdentifier,
    dataStyles,
  }
}
