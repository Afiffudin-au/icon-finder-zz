import Axios from "axios"
import { useDispatch } from "react-redux"
import { addAllIcon } from "../features/iconSlice"

export function useGetIconsAll(){
  const dispatch = useDispatch()
  const getIconsAll = (identifier,idenCondition,offsetPage,premiumVal,vectorVal)=>{
    const afterSplit = identifier.split('-')
    let catagory = ''
    let style = ''
    let query = ''
    if(identifier === ''){
      query = 'abstract'
    }else{
      query = afterSplit[0]
    }

    if(idenCondition === 'catagory'){
      catagory = identifier
    }

    if(idenCondition === 'style'){
      style = identifier
    }
    dispatch(addAllIcon({
      loading : true
    }))
    Axios({
      url : 'https://proxy-icon-api.herokuapp.com/icons/search',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params : {
        query : query,
        count : 100,
        category : catagory,
        style : style,
        offset : offsetPage,
        premium : premiumVal,
        vector : vectorVal
      }
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
  return{
    getIconsAll
  }
}