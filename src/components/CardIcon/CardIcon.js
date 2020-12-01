import React from 'react'
import './CardIcon.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {blueGrey} from '@material-ui/core/colors';
import LazyLoad from 'react-lazyload';
import Tooltip from '@material-ui/core/Tooltip';
function CardIcon({id,isPremium,rasterSizes}) {
  return (
    <div className="CardIcon">
      {
        isPremium && 
        <Tooltip title="Premium" arrow>
          <AttachMoneyIcon style={{color : blueGrey[500],fontSize : '26px'}}/>
        </Tooltip>
      }
      <LazyLoad height={200} width={'100%'}>
        <img className="CardIconSet_icon" src={rasterSizes[6]?.formats[0]?.preview_url} alt={rasterSizes[6]?.formats[0]?.preview_url}/>
      </LazyLoad>
    </div>
  )
}

export default CardIcon
