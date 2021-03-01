import React from 'react'
import { Link } from 'react-router-dom'
import { useGetIconCatagory } from '../../../useIconCatagory/useGetIconCatagory'
import { useDispatch } from 'react-redux'
import { addParams } from '../../../features/URLparamaterSlice'
function CatagoriesDropDownItem({ Catagoryidentifier, name }) {
  const { GetIconCatagory } = useGetIconCatagory()
  const dispatch = useDispatch()
  const handleGetIconCatagory = () => {
    dispatch(
      addParams({
        catagory: Catagoryidentifier,
      })
    )
    GetIconCatagory(Catagoryidentifier)
  }
  return (
    <Link
      onClick={handleGetIconCatagory}
      to='/icon-catagory'
      className='dropdown-item'>
      {Catagoryidentifier}
    </Link>
  )
}

export default CatagoriesDropDownItem
