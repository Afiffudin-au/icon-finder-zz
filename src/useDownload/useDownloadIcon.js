import Axios from "axios"
import { saveAs } from 'file-saver';
export function useDownloadIcon(){
  const downloadIcon = (pathParamDownload)=>{
    Axios({
      method : 'GET',
      url : `http://localhost:5000/icons/${pathParamDownload}`,
      responseType: 'blob',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
    }).then(res=>{
      saveAs(res.data,'icon')
    }).catch(err=>{
      alert(err)
    })
  }
  return{
    downloadIcon
  }
}