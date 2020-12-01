import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllIconCatagoryBlock } from '../../features/iconSlice'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import CardIcon from '../CardIcon/CardIcon'
import './IconCatagory.scss'
import Pagination from '@material-ui/lab/Pagination'
import { selectUrlParamsBlock } from '../../features/URLparamaterSlice'
import { useGetIconCatagory } from '../../useIconCatagory/useGetIconCatagory'
import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BrushIcon from '@material-ui/icons/Brush';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
function IconCatagory() {
  const [page, setPage] = useState(0)
  const [valueNav, setValueNav] = React.useState(0);
  const UrlParamsBlock = useSelector(selectUrlParamsBlock)
  const AllIconCatagoryBlock = useSelector(selectAllIconCatagoryBlock)
  const {GetIconCatagory} = useGetIconCatagory()
  const {allIcons} = AllIconCatagoryBlock
  const {loading} = AllIconCatagoryBlock
  const {catagory} = UrlParamsBlock
  const handleChange = (event,value)=>{
    setPage(value)
    if(valueNav === 0){
      GetIconCatagory(catagory,'',value * 100)
    }else if(valueNav === 1){
      GetIconCatagory(catagory,'',0,'false','')
    }else if(valueNav === 2){
      GetIconCatagory(catagory,'',0,'true','')
    }else{
      GetIconCatagory(catagory,'',0,'','true')
    }
  }
  useEffect(() => {
   setPage(0)
  },[catagory,valueNav])
  return (
    <div className="IconCatagory">
      <BottomNavigation
          value={valueNav}
          onChange={(event, newValue) => {
            setValueNav(newValue);
          }}
          showLabels
          className={useStyles.root}
          >
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,'',0)} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,'',0,'false','')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,'',0,'true','')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,'',0,'','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
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
