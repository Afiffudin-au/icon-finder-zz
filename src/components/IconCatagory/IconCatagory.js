import React, { useState, useEffect, useRef } from 'react'
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
import { useGetStyleIdentifier } from '../../useStyleIdentifier/useGetStyleIdentifier'
import BtnGroupItems from './BtnGroupItems/BtnGroupItems'
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
  const {getStyleIdentifier,dataStyles} = useGetStyleIdentifier()

  const {allIcons,loading} = AllIconCatagoryBlock
  const {catagory,style} = UrlParamsBlock

  const refGetStyleIdentifier = useRef(getStyleIdentifier)
  
  const handleChange = (event,value)=>{
    setPage(value)
    if(valueNav === 0){
      GetIconCatagory(catagory,style,value * 100)
    }else if(valueNav === 1){
      GetIconCatagory(catagory,style,value * 100,'false','')
    }else if(valueNav === 2){
      GetIconCatagory(catagory,style,value * 100,'true','')
    }else{
      GetIconCatagory(catagory,style,value * 100,'','true')
    }
  }
  useEffect(() => {
    refGetStyleIdentifier.current()
  },[])

  useEffect(()=>{
    setValueNav(0)
  },[catagory])

  useEffect(()=>{
    setValueNav(0)
  },[style])

  useEffect(() => {
   setPage(0)
  },[catagory,valueNav,style])
  return (
    <div className="IconCatagory">
      {
        loading &&
        <div style={{position : 'sticky',top : '0'}} className="loading">
          <StyledLinearProgress/>
        </div>
      }
      <div className="btn-group" role="group" aria-label="Basic example">
        <div className="row">
          <div className="col-md-12">
            {
            dataStyles?.styles?.map((item,index)=>(
              <BtnGroupItems key={index} styleIdentifier={item.identifier}/>
            ))
            }
          </div>
        </div>
      </div>
      <BottomNavigation
          value={valueNav}
          onChange={(event, newValue) => {
            setValueNav(newValue);
          }}
          showLabels
          className={useStyles.root}
          >
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,style)} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,style,0,'false','')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,style,0,'true','')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=>GetIconCatagory(catagory,style,0,'','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
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
