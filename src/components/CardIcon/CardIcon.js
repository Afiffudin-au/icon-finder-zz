import React from 'react'
import './CardIcon.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {blueGrey} from '@material-ui/core/colors';
import LazyLoad from 'react-lazyload';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal } from '@material-ui/core';
import ModalDetail from '../ModalDetail/ModalDetail';
function CardIcon({id,isPremium,rasterSizes}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log('render')
  return (
    <div className="CardIcon">
      {
        isPremium && 
        <Tooltip title="Premium" arrow>
          <AttachMoneyIcon style={{color : blueGrey[500],fontSize : '26px'}}/>
        </Tooltip>
      }
      <LazyLoad height={200} width={'100%'}>
        <img className="CardIconSet_icon"  onClick={handleOpen} src={rasterSizes[6]?.formats[0]?.preview_url} alt={rasterSizes[6]?.formats[0]?.preview_url}/>
        {/* <img onClick={handleOpen} className="CardIconSet_icon" src="https://cdn0.iconfinder.com/data/icons/abstract-2-9/32/stars_three_abstract_creative-128.png" alt=""/> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ModalDetail id={id} rasterSizes={rasterSizes}/>
        </Modal>
      </LazyLoad>
    </div>
  )
}

export default CardIcon
