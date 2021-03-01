import React, { useEffect, useState, useRef } from 'react'
import { useGetIconDetail } from '../../useIconDetail/useGetIconDetail';
import { useStylesModal } from '../../useMakeStyles/useStylesModal';
import {StyledLinearProgress} from '../LoadingProgress/LoadingProgress'
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import './ModalDetail.scss'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import {LightTooltip} from '../LightTooltip/LightTooltip'
import { useDownloadIcon } from '../../useDownload/useDownloadIcon';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addParams} from '../../features/URLparamaterSlice'
import { useGetSearch } from '../../useSearch/useGetSearch';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function ModalDetail({id,rasterSizes,handleCloseProp}) {
  const [isLoad,setIsLoad] = React.useState(false)
  const [display,setDisplay] = React.useState('none')
  const classes = useStylesModal()
  const [previewUrl,setPreviewUrl] = useState(rasterSizes[7]?.formats[0]?.preview_url)
  const [rasterWidth,setRasterWidth] = useState(256)
  const [rasterHeight,setRasterHeight] = useState(256)
  const {iconDetails,loading,getIconDetail} = useGetIconDetail()
  const {downloadIcon,loadingDownload} = useDownloadIcon()
  const history = useHistory()
  const dispatch = useDispatch()
  const {getSearch} = useGetSearch()
  const refGetIconDetail = useRef(getIconDetail)
  useEffect(()=>{
    if(id === null || id === '' || id === undefined) return
    refGetIconDetail.current(id)
  },[id])
  const handlePreview = (url,width,height)=>{
    setRasterWidth(width)
    setRasterHeight(height)
    setDisplay('none')
    setIsLoad(false)
    setPreviewUrl(url)
  }
  const handleDownlaod = (url)=>{
    const splitUrl = url.split('https://api.iconfinder.com/v4/icons/')
    downloadIcon(splitUrl[1])
  }
  const handleSearchByTag = (tag)=>{
    dispatch(addParams({
      query : tag
    }))
    getSearch(tag)
    history.push('/icon-search')
  }
  const handleLoad = ()=>{
    setIsLoad(true)
    setDisplay('block')
  }
  return (
    <div className={classes.paper}>
      {
        loading &&  <div style={{marginBottom : '5px'}} className="loading">
        <StyledLinearProgress/>
      </div>
      }
      {
        loadingDownload && 
        <div style={{marginBottom : '5px'}} className="loading">
          <StyledLinearProgress/>
        </div>
      }
     <IconButton onClick={handleCloseProp} className="closeButton">
       <CloseIcon className="close_icon"/>
     </IconButton>
      <div className="cardIconDetailContent">
        <div className="cardIcon__img">
          {
            !isLoad &&
            <SkeletonTheme  color="#cfd8dc" highlightColor="#b0bec5">
              <Skeleton count={1} width={rasterWidth} height={rasterHeight} duration={0.8}/>
            </SkeletonTheme>
          }
        
          <img style={{display : display}} onLoad={handleLoad} src={'' || previewUrl } alt={previewUrl || ''}/>
        </div>
        <div className="cardIcon_detail">
          {
             iconDetails.is_premium ? (
              <h1>This is a premium icon, suitable for commercial work:</h1>
             ):(
              <h1>This is a free icon, suitable for commercial work:</h1>
             )
          }
          <div className="cardIcon_decs">
            <CheckIcon className="check"/>
            <p>Use it commercially. No attribution required.</p>
          </div>
          <div className="cardIcon_decs">
            <CheckIcon className="check"/>
            <p>Comes in multiple formats suitable for screen and print</p>
          </div>
          <div className="cardIcon_decs">
            <CheckIcon className="check"/>
            <p>Ready to use in multiple sizes</p>
          </div>
          <div className="cardIcon_decs">
            <CheckIcon className="check"/>
            <p>Modify colors and shapes using the icon editor</p>
          </div>
        </div>
        <div className="cardIcon_moreContent">
          {
            iconDetails.is_premium && 
            <div className="premium">
              <AttachMoneyIcon className="moneyIcon"/>
              <div className="premium_desc">
                <p>Premium icon</p>
              </div>
            </div>
          }
          <div className="searchByTag">
            <LocalOfferRoundedIcon className="offerIcon"/>
            <div className="buttonTag">
              {
                iconDetails?.tags?.map((tag,index)=>(
                  <LightTooltip key={index} title={`Search for ${tag} icon`} placement="top" arrow>
                  <button onClick={()=>handleSearchByTag(tag)}>{tag}</button>
                </LightTooltip>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="preview-container">
        {
          iconDetails?.raster_sizes?.map(rasters=>(
            rasters.formats.map((item,index)=>(
            <button key={index} href={item.preview_url} onClick={()=>handlePreview(item.preview_url,rasters.size_width,rasters.size_height)} className="preview">
               Preview {rasters.size_width} x {rasters.size_height}
            </button>
            ))
          ))
        }
        {
          !iconDetails.is_premium && 
          iconDetails?.raster_sizes?.map(items=>(
            items.formats.map((item,index)=>(
            <button key={index} onClick={()=>handleDownlaod(item.download_url)} className="preview">
               Download {item.format} {items.size_width} x {items.size_height}
            </button>
            ))
          ))
        }
      </div>
    </div>
  )
}

export default ModalDetail
