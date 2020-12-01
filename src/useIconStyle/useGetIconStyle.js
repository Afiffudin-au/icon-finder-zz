import Axios from "axios"
import { useDispatch } from "react-redux"
import { addIconStyle } from "../features/iconSlice"

export function useGetIconStyle(){
  const dispatch = useDispatch()
  const getIconStyle = (style,catagory,offsetPage,premiumVal,vectorVal)=>{
    const afterSplit = style.split('-')
    const queryName = afterSplit[0]
    dispatch(addIconStyle({
      loading : true,
    }))
    Axios({
      method : 'GET',
      url : 'http://localhost:5000/icons/search',
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
      dispatch(addIconStyle({
        loading : false,
        dataIconStyle : res.data
      }))
    }).catch(err=>{
      dispatch(addIconStyle({
        loading : false,
      }))
      alert(err)
    })
  }
  return{
    getIconStyle
  }
}