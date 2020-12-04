import React from 'react'
import './CardIcon.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {blueGrey} from '@material-ui/core/colors';
import LazyLoad from 'react-lazyload';
import Tooltip from '@material-ui/core/Tooltip';
import { Backdrop, Modal } from '@material-ui/core';
import ModalDetail from '../ModalDetail/ModalDetail';
function CardIcon({id,isPremium,rasterSizes}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseProp = ()=>{
    setOpen(false);
  }
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
      </LazyLoad>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{overflowY : 'scroll'}}
      >
       <ModalDetail id={id} rasterSizes={rasterSizes} handleCloseProp={handleCloseProp}/>
      </Modal>
    </div>
  )
}

export default CardIcon
