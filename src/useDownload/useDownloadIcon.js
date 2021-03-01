import Axios from 'axios'
import { saveAs } from 'file-saver'
import { useState } from 'react'
export function useDownloadIcon() {
  const [loadingDownload, setLoadingDownload] = useState(false)
  const downloadIcon = (pathParamDownload) => {
    setLoadingDownload(true)
    Axios({
      method: 'GET',
      url: `https://proxy-icon-api.herokuapp.com/icons/${pathParamDownload}`,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        saveAs(res.data, 'icon')
        setLoadingDownload(false)
      })
      .catch((err) => {
        setLoadingDownload(false)
        alert(err)
      })
  }
  return {
    downloadIcon,
    loadingDownload,
  }
}
