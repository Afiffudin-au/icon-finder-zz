import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addParams,
  selectUrlParamsBlock,
} from '../../../features/URLparamaterSlice'
import { useGetIconCatagory } from '../../../useIconCatagory/useGetIconCatagory'

function BtnGroupItems({ styleIdentifier }) {
  const dispatch = useDispatch()
  const UrlParamsBlock = useSelector(selectUrlParamsBlock)
  const { GetIconCatagory } = useGetIconCatagory()
  const { catagory } = UrlParamsBlock
  const handleStyleIcon = () => {
    dispatch(
      addParams({
        catagory: catagory,
        style: styleIdentifier,
      })
    )
    GetIconCatagory(catagory, styleIdentifier, 0)
  }
  return (
    <>
      <button
        onClick={handleStyleIcon}
        type='button'
        className='btn btn-outline-primary'>
        {styleIdentifier}
      </button>
    </>
  )
}

export default BtnGroupItems
