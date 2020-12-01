import React from 'react'
import { useSelector } from 'react-redux'
import {selectAllIconStyleBlock } from '../../features/iconSlice'
import CardIcon from '../CardIcon/CardIcon'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import './IconStyle.scss'
function IconStyle() {
  const allIconStyleBlock = useSelector(selectAllIconStyleBlock)
  const {loading,allIcons} = allIconStyleBlock
  return (
    <div className="IconStyle">
       {
          loading && 
          <div style={{position: 'sticky',top:'0'}} className="loading">
            <StyledLinearProgress/>
          </div>
        }
      <div className="IconStyle__grid">
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
    </div>
  )
}

export default IconStyle
