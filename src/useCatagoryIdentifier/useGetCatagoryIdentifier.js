import Axios from 'axios'
import { useState } from 'react'
export function useGetCatagoryIdentifier(){
  const [dataCatagory,setDataCatagory] = useState([])
  const getCatagoryIdentifier = ()=>{
    Axios({
      method : 'GET',
      url : 'http://localhost:5000/categories',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params : {count : 15}
    }).then(res=>{
      setDataCatagory(res.data)
    }).catch(err=>{
      alert(err)
    })
  }
  return{
    getCatagoryIdentifier,
    dataCatagory
  }
}