import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addParams } from '../../../features/URLparamaterSlice'
import { useGetIconStyle } from '../../../useIconStyle/useGetIconStyle'
function StyleDropDownItem({ styleIdentifier, name }) {
  const { getIconStyle } = useGetIconStyle()
  const dispatch = useDispatch()
  const handleGetIconStyle = () => {
    dispatch(
      addParams({
        style: styleIdentifier,
      })
    )
    getIconStyle(styleIdentifier)
  }
  return (
    <Link
      onClick={handleGetIconStyle}
      to='/icon-style'
      className='dropdown-item'>
      {styleIdentifier}
    </Link>
  )
}

export default StyleDropDownItem
