import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllIconCatagoryBlock } from '../../features/iconSlice'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import CardIcon from '../CardIcon/CardIcon'
import './IconCatagory.scss'
import Pagination from '@material-ui/lab/Pagination'
import { selectUrlParamsBlock } from '../../features/URLparamaterSlice'
import { useGetIconCatagory } from '../../useIconCatagory/useGetIconCatagory'
function IconCatagory() {
  const [page, setPage] = useState(0)
  const UrlParamsBlock = useSelector(selectUrlParamsBlock)
  const AllIconCatagoryBlock = useSelector(selectAllIconCatagoryBlock)
  const {GetIconCatagory} = useGetIconCatagory()
  const {allIcons} = AllIconCatagoryBlock
  const {loading} = AllIconCatagoryBlock
  const {catagory} = UrlParamsBlock
  const handleChange = (event,value)=>{
    setPage(value)
    GetIconCatagory(catagory,'',value * 100)
  }
  useEffect(() => {
   setPage(0)
  },[catagory])
  return (
    <div className="IconCatagory">
      {
        loading &&
        <div style={{position : 'sticky',top : '0'}} className="loading">
          <StyledLinearProgress/>
        </div>
      }
      <div className="IconCatagory__grid">
        {
          allIcons.icons?.map((item,index)=>(
            <CardIcon 
            key={item.icon_id}
            id={item.icon_id}
            isPremium={item.is_premium}
            rasterSizes={item.raster_sizes}
            />
          ))
        }
      </div>
      {
        allIcons.icons && <div className="IconCatagory__pagenation">
        <Pagination color="secondary" variant="outlined" count={100} page={page} onChange={handleChange} />
      </div>
      }
    </div>
  )
}

export default IconCatagory
