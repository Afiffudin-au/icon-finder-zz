import React from 'react'
import './CardIcon.scss'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { blueGrey } from '@material-ui/core/colors'
import LazyLoad from 'react-lazyload'
import Tooltip from '@material-ui/core/Tooltip'
import { Backdrop, Modal } from '@material-ui/core'
import ModalDetail from '../ModalDetail/ModalDetail'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
function CardIcon({ id, isPremium, rasterSizes }) {
  const [open, setOpen] = React.useState(false)
  const [isLoad, setIsLoad] = React.useState(false)
  const [display, setDisplay] = React.useState('none')
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseProp = () => {
    setOpen(false)
  }
  const ModalDetailRef = React.forwardRef((props, ref) => <>{props.children}</>)
  const handleLoad = () => {
    setIsLoad(true)
    setDisplay('block')
  }
  const ref = React.createRef()
  return (
    <div className='CardIcon'>
      {isLoad && isPremium && (
        <Tooltip title='Premium' arrow>
          <AttachMoneyIcon style={{ color: blueGrey[500], fontSize: '26px' }} />
        </Tooltip>
      )}
      {!isLoad && (
        <div className='skeleton'>
          <SkeletonTheme color='#cfd8dc' highlightColor='#b0bec5'>
            <Skeleton count={1} width={128} height={128} duration={0.8} />
          </SkeletonTheme>
        </div>
      )}
      <LazyLoad height={200} offset={-70} width={'100%'}>
        <img
          style={{ display: display }}
          className='CardIconSet_icon'
          onLoad={handleLoad}
          onClick={handleOpen}
          src={rasterSizes[6]?.formats[0]?.preview_url}
          alt={rasterSizes[6]?.formats[0]?.preview_url}
        />
      </LazyLoad>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{ overflowY: 'scroll' }}>
        <ModalDetailRef ref={ref}>
          <ModalDetail
            id={id}
            rasterSizes={rasterSizes}
            handleCloseProp={handleCloseProp}
          />
        </ModalDetailRef>
      </Modal>
    </div>
  )
}

export default CardIcon
