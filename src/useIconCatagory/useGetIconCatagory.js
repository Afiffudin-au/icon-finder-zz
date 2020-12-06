import Axios from "axios"
import { useDispatch } from "react-redux"
import {addIconCatagory} from '../features/iconSlice'
export function useGetIconCatagory(){
  const dispatch = useDispatch()
  const GetIconCatagory = (catagory,style,offsetPage,premiumVal,vectorVal)=>{
    const afterSplit = catagory.split('-')
    const queryName = afterSplit[0]
    dispatch(addIconCatagory({
      loading :true
    }))
    Axios({
      method : 'GET',
      url : 'https://proxy-icon-api.herokuapp.com/icons/search',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params : {
        query : queryName,
        count : 100,
        category : catagory,
        style : style,
        offset : offsetPage,
        premium : premiumVal,
        vector : vectorVal
      }
    }).then(res=>{
      dispatch(addIconCatagory({
        loading : false,
        dataIconCatagory : res.data
      }))
    }).catch(err=>{
      dispatch(addIconCatagory({
        loading :false
      }))
      alert(err)
    })
  }
  return{
    GetIconCatagory
  }
}