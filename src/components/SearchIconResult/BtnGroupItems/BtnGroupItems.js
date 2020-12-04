import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addParams, selectUrlParamsBlock } from '../../../features/URLparamaterSlice'
import { useGetSearch } from '../../../useSearch/useGetSearch'

function BtnGroupItems({catagoryBool,identifier}) {
  const urlParamsBlock = useSelector(selectUrlParamsBlock)
  const {query,catagory,style} = urlParamsBlock
  const dispatch = useDispatch()
  const {getSearch} = useGetSearch()
  const handleFilter = ()=>{
    if(catagoryBool){
      dispatch(addParams({
        query : query,
        catagory : identifier,
        style : style
      }))
      getSearch(query,identifier)
    }else{
      dispatch(addParams({
        query : query,
        catagory : catagory,
        style : identifier
      }))
      getSearch(query,identifier)
    }
  }
  return (
    <>
       <button onClick={handleFilter} type="button" className="btn btn-outline-primary">{identifier}</button> 
    </>
  )
}

export default BtnGroupItems
