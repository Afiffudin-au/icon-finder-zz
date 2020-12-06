import React, { useEffect, useRef, useState } from 'react'
import './IconContainer.scss'
import { useGetIcons } from '../../useIcons/useGetIcons'
import { useSelector } from 'react-redux'
import { selectAllIconBlock } from '../../features/iconSlice'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import CardIcon from '../CardIcon/CardIcon'
import Pagination from '@material-ui/lab/Pagination';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BrushIcon from '@material-ui/icons/Brush';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
function IconContainer() {
  const [page, setPage] = useState(0)
  const [valueNav, setValueNav] = React.useState(0);
  const allIconBlock = useSelector(selectAllIconBlock)
  const {getAllIcons} = useGetIcons()
  const {loading,allIcons} = allIconBlock
  const refGetAllIcons = useRef(getAllIcons)
  const handleChange =  (event, value) => {
    setPage(value)
    if(valueNav === 0){
      getAllIcons(value * 100)
    }else if(valueNav === 1){
      getAllIcons(value * 100,'false')
    }else if(valueNav === 2){
      getAllIcons(value * 100,'true')
    }else {
      getAllIcons(value * 100,'','true')
    }
  };
  useEffect(()=>{
    setPage(0)
  },[valueNav])
  useEffect(()=>{
    refGetAllIcons.current(0)
  },[])
  return (
    <div className="IconsContainer">
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
          <BottomNavigationAction onClick={()=>getAllIcons(0)} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=>getAllIcons(0,'false')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=>getAllIcons(0,'true')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=>getAllIcons(0,'','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
      <div className="IconsContainer__grid">
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
        allIcons.icons && <div className="IconsContainer__pagenation">
        <Pagination color="secondary" variant="outlined" count={100} page={page} onChange={handleChange} />
      </div>
      }
    </div>
  )
}

export default IconContainer
