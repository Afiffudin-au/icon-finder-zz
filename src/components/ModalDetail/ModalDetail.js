import React, { useEffect, useState } from 'react'
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
function ModalDetail({id,rasterSizes,handleCloseProp}) {
  const classes = useStylesModal()
  const [previewUrl,setPreviewUrl] = useState(rasterSizes[7]?.formats[0]?.preview_url)
  const {iconDetails,loading,getIconDetail} = useGetIconDetail()
  const {downloadIcon} = useDownloadIcon()
  useEffect(()=>{
    if(id === null || id === '' || id === undefined) return
    getIconDetail(id)
  },[id])
  const handlePreview = (url)=>{
    setPreviewUrl(url)
  }
  const handleDownlaod = (url)=>{
    const splitUrl = url.split('https://api.iconfinder.com/v4/icons/')
    downloadIcon(splitUrl[1])
  }
  return (
    <div className={classes.paper}>
      {
        loading &&  <div style={{marginBottom : '5px'}} className="loading">
        <StyledLinearProgress/>
      </div>
      }
     <IconButton onClick={handleCloseProp} className="closeButton">
       <CloseIcon className="close_icon"/>
     </IconButton>
      <div className="cardIconDetailContent">
        <div className="cardIcon__img">
          <img src={'' || previewUrl } alt={previewUrl || ''}/>
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
                  <button>{tag}</button>
                </LightTooltip>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="preview-container">
        {
          iconDetails?.raster_sizes?.map(items=>(
            items.formats.map((item,index)=>(
            <button key={index} href={item.preview_url} onClick={()=>handlePreview(item.preview_url)} className="preview">
               Preview {items.size_width} x {items.size_height}
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
