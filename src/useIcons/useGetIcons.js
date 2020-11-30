import Axios from 'axios'
import { useDispatch } from 'react-redux'
import {addAllIcon} from '../features/iconSlice'
export function useGetIcons(){
  const dispatch = useDispatch()
  const getAllIcons = (valueOffset,premiumVal,vectorVal)=>{
    dispatch(addAllIcon({
      loading : true
    }))
    Axios({
      method : 'GET',
      url : 'http://localhost:5000/icons/search',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params : {query : 'abstract',count : 100,catagory : 'abstract',offset : valueOffset,premium : premiumVal,vector : vectorVal}
    }).then(res=>{
      dispatch(addAllIcon({
        loading : false,
        dataIcons : res.data
      }))
    }).catch(err=>{
      dispatch(addAllIcon({
        loading : false
      }))
      alert(err)
    })
  }
  return {getAllIcons}
}