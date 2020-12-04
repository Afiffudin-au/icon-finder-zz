import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './SearchIconResult.scss'
import { selectAllIconSearchResultBlock } from '../../features/iconSlice'
import { selectUrlParamsBlock } from '../../features/URLparamaterSlice'
import { useGetSearch } from '../../useSearch/useGetSearch'
import CardIcon from '../CardIcon/CardIcon'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
import { useGetStyleIdentifier } from '../../useStyleIdentifier/useGetStyleIdentifier'
import { useGetCatagoryIdentifier } from '../../useCatagoryIdentifier/useGetCatagoryIdentifier'
import BtnGroupItems from './BtnGroupItems/BtnGroupItems'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BrushIcon from '@material-ui/icons/Brush';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
function SearchIconResult() {
  const iconResultBlock = useSelector(selectAllIconSearchResultBlock)
  const UrlParamsBlock = useSelector(selectUrlParamsBlock)
  const {allIcons,loading} = iconResultBlock
  const [page, setPage] = useState(0)
  const [valueNav, setValueNav] = React.useState(0);
  const {getSearch} = useGetSearch()
  const {catagory,style,query} = UrlParamsBlock
  const {getStyleIdentifier,dataStyles} = useGetStyleIdentifier()
  const {getCatagoryIdentifier,dataCatagory} = useGetCatagoryIdentifier()
  const refGetCatagoryIden = useRef(getCatagoryIdentifier)
  const refGetStyleIden = useRef(getStyleIdentifier)
  const handleChange = (event,value)=>{
    setPage(value)
    if(valueNav === 0){
      getSearch(query,'','',value * 100)
    }else if(valueNav === 1){
      getSearch(query,'','',value * 100,'false')
    }else if(valueNav === 2){
      getSearch(query,'','',value * 100,'true')
    }else{
      getSearch(query,'','',value * 100,'','true')
    }
  }
  useEffect(()=>{
    refGetCatagoryIden.current()
    refGetStyleIden.current()
  },[])
  useEffect(() => {
   setPage(0)
  },[catagory,valueNav,style,query])
  return (
    <div className="searchIconResult">
       {
          loading && 
          <div style={{position: 'sticky',top:'0'}} className="loading">
            <StyledLinearProgress/>
          </div>
        }
         <div className="btn-group" role="group" aria-label="Basic example">
            <div className="row">
              <div className="col-md">
                {
                  dataCatagory?.categories?.map((item,index)=>(
                  <BtnGroupItems key={index} identifier={item.identifier}/>
                ))
                }
                {
                  dataStyles?.styles?.map((item,index)=>(
                  <BtnGroupItems key={index} identifier={item.identifier}/>
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
          <BottomNavigationAction onClick={()=> getSearch(query,'','',0)} label="All icons" icon={<EmojiSymbolsIcon />} />
          <BottomNavigationAction onClick={()=> getSearch(query,'','',0,'false')} label="Free icons" icon={<MoneyOffIcon />} />
          <BottomNavigationAction onClick={()=> getSearch(query,'','',0,'true')} label="Premium" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction onClick={()=> getSearch(query,'','',0,'','true')} label="Vector" icon={<BrushIcon />} />
        </BottomNavigation>
      <div className="searchIconResult__grid">
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
        allIcons.icons && <div className="searchIconResult__pagenation">
        <Pagination color="secondary" variant="outlined" count={100} page={page} onChange={handleChange} />
      </div>

      }
    </div>
  )
}

export default SearchIconResult
