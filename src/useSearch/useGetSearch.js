import Axios from 'axios'
const key = 'X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1'
export function useGetSearch(){
  const getSearch = (query)=>{
    Axios({
      url : 'http://localhost:5000/icons/search',
      headers:{
        Authorization : `Bearer ${key}`
      },
      params : {query : query,count : 10,offset : 0}
    }).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      alert(err)
    })
  }
  return {getSearch}
}