import Axios from "axios"

export function useGetIconStyle(){
  const getIconStyle = ()=>{
    Axios({
      url : 'http://localhost:5000/icons/search',
      headers:{
        Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      // params : {query : query,count : 10,offset : 0}
    }).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      alert(err)
    })
  }
  return{
    getIconStyle
  }
}