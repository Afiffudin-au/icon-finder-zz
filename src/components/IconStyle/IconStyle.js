import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {selectAllIconStyleBlock } from '../../features/iconSlice'
import { useGetIconStyle } from '../../useIconStyle/useGetIconStyle'
import CardIcon from '../CardIcon/CardIcon'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BrushIcon from '@material-ui/icons/Brush';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import './IconStyle.scss'
import { selectUrlParamsBlock } from '../../features/URLparamaterSlice'
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
function IconStyle() {
  const [page, setPage] = useState(0)
  const [valueNav, setValueNav] = React.useState(0);
  const UrlParamsBlock = useSelector(selectUrlParamsBlock) 
  const {getIconStyle} = useGetIconStyle()
  const allIconStyleBlock = useSelector(selectAllIconStyleBlock)
  const {loading,allIcons} = allIconStyleBlock
  const {style} = UrlParamsBlock
  const handleChange = (event,value)=>{
    setPage(value)
    if(valueNav === 0){
      getIconStyle(style,'',value * 100)
    }else if(valueNav === 1){
     getIconStyle(style,'',value * 100,'false','')
    }else if(valueNav === 2){
      getIconStyle(style,'',value * 100,'true','')
    }else{
      getIconStyle(style,'',value * 100,'','true')
    }
  }
  useEffect(()=>{
   setPage(0)
  },[valueNav])
  useEffect(()=>{
    
  },[])
  return (
    <div className="IconStyle">
       {
          loading && 
          <div style={{position: 'sticky',top:'0'}} className="loading">
            <StyledLinearProgress/>
          </div>
        }
         <BottomNavigation
          value={valueNav}
          onChange={(event, newValue) => {
            setValueNav(newValue);
          }}
          showLabels
          className={useStyles.root}
          >
          <BottomNavigationAction onClick={()=>getIconStyle(style)} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=>getIconStyle(style,'',0,'false','')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=>getIconStyle(style,'',0,'true','')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=>getIconStyle(style,'',0,'','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
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
      {
        allIcons.icons && <div className="IconStyle__pagenation">
        <Pagination color="secondary" variant="outlined" count={100} page={page} onChange={handleChange} />
      </div>
      }
    </div>
  )
}

export default IconStyle
