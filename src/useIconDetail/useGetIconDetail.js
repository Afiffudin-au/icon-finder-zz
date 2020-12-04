import Axios from "axios"
import { useState } from "react"
export function useGetIconDetail(){
  const [iconDetails,setIconDetails] = useState([])
  const [loading,setLoading] = useState(true)
  const getIconDetail = (pathParamId)=>{
    setLoading(true)
    Axios({
      method : 'GET',
      url : `http://localhost:5000/icons/${pathParamId}`,
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
    }).then(res=>{
     setIconDetails(res.data)
     setLoading(false)
    }).catch(err=>{
      setLoading(false)
      alert(err)
    })
  }
  return{
    iconDetails,
    loading,
    getIconDetail
  }
}