import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllIconBlock } from '../../features/iconSlice'
import CardIcon from '../CardIcon/CardIcon'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BrushIcon from '@material-ui/icons/Brush';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import './IconAll.scss'
import { useGetCatagoryIdentifier } from '../../useCatagoryIdentifier/useGetCatagoryIdentifier'
import BtnGroupItems from './BtnGroupItems/BtnGroupItems'
import { useGetStyleIdentifier } from '../../useStyleIdentifier/useGetStyleIdentifier'
import { useGetIconsAll } from '../../useiconsAll/useGetIconsAll'
import { selectUrlParamsBlock } from '../../features/URLparamaterSlice'
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
function IconAll() {
  const [page, setPage] = useState(1)
  const [valueNav, setValueNav] = React.useState(0);
  
  const allIconBlock = useSelector(selectAllIconBlock)
  const {loading,allIcons} = allIconBlock

  const {getIconsAll} = useGetIconsAll()

  const {getCatagoryIdentifier,dataCatagory} = useGetCatagoryIdentifier()
  const {getStyleIdentifier,dataStyles} = useGetStyleIdentifier()

  const refGetCatagoryIden = useRef(getCatagoryIdentifier)
  const refGetStyleIden  = useRef(getStyleIdentifier)

  const urlParamsBlock = useSelector(selectUrlParamsBlock)
  const {query} = urlParamsBlock
  
  let fixQuery = ''
  if(query === ''){
    fixQuery = 'abstract'
  }else{
    fixQuery = query
  }
  const handleChange =  (event, value) => {
    setPage(value)
    if(valueNav === 0){
      getIconsAll(fixQuery,'',value * 100 - 1 + 1 - 100)
    }else if(valueNav === 1){
      getIconsAll(fixQuery,'',value * 100 - 1 + 1 - 100,'false')
    }else if(valueNav === 2){
      getIconsAll(fixQuery,'',value * 100 - 1 + 1 - 100,'true')
    }else {
      getIconsAll(fixQuery,'',value * 100 - 1 + 1 - 100,'','true')
    }
  };
  useEffect(()=>{
    refGetCatagoryIden.current()
    refGetStyleIden.current()
  },[])
  useEffect(()=>{
    setPage(1)
    setValueNav(0)
  },[query])
  return (
    <div className="iconAll">
      {
        loading &&
        <div style={{position : 'sticky',top : '0'}} className="loading">
          <StyledLinearProgress/>
        </div>
      }
      {
          !loading && 
          <div className="btn-group" role="group" aria-label="Basic example">
            <div className="row">
              <div className="col-md">
                {
                  dataCatagory?.categories?.map((item,index)=>(
                  <BtnGroupItems key={index} catagoryBool={true} identifier={item.identifier}/>
                ))
                }
                {
                  dataStyles?.styles?.map((item,index)=>(
                  <BtnGroupItems key={index} catagoryBool={false} identifier={item.identifier}/>
                ))
                }
              </div>
            </div>
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
          <BottomNavigationAction onClick={()=>getIconsAll(fixQuery,'')} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=>getIconsAll(fixQuery,'','','false')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=>getIconsAll(fixQuery,'','','true')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=>getIconsAll(fixQuery,'','','','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
      <div className="iconAll__grid">
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
        allIcons.icons && <div className="iconAll__pagenation">
        <Pagination color="secondary" variant="outlined" count={Math.floor(allIcons.total_count / 100)} page={page} onChange={handleChange} />
      </div>
      }
    </div>
  )
}

export default IconAll
