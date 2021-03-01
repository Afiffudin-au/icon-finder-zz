import React from 'react'
import { useDispatch } from 'react-redux'
import { addParams } from '../../../features/URLparamaterSlice'
import { useGetIconsAll } from '../../../useiconsAll/useGetIconsAll'
function BtnGroupItems({ catagoryBool, identifier }) {
  const { getIconsAll } = useGetIconsAll()
  const dispatch = useDispatch()
  const handleFilter = () => {
    if (catagoryBool) {
      dispatch(
        addParams({
          query: identifier,
        })
      )
      getIconsAll(identifier, 'catagory')
    } else {
      dispatch(
        addParams({
          query: identifier,
        })
      )
      getIconsAll(identifier, 'style')
    }
  }
  return (
    <>
      <button
        onClick={handleFilter}
        type='button'
        className='btn btn-outline-primary'>
        {identifier}
      </button>
    </>
  )
}

export default BtnGroupItems
