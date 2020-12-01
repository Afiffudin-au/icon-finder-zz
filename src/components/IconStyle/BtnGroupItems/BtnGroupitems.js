import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addParams, selectUrlParamsBlock } from '../../../features/URLparamaterSlice'
import { useGetIconStyle } from '../../../useIconStyle/useGetIconStyle'

function BtnGroupitems({Catagoryidentifier}) {
  const dispatch = useDispatch()
  const UrlParamsBlock = useSelector(selectUrlParamsBlock)
  const {style} = UrlParamsBlock
  const {getIconStyle} = useGetIconStyle()
  const handleCatagoryIcon = ()=>{
    dispatch(addParams({
      catagory : Catagoryidentifier,
      style : style
    }))
    getIconStyle(style,Catagoryidentifier,0)
  }
  return (
    <>
      <button onClick={handleCatagoryIcon} type="button" className="btn btn-outline-primary">{Catagoryidentifier}</button> 
    </>
  )
}

export default BtnGroupitems
