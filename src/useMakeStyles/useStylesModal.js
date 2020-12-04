import { makeStyles } from '@material-ui/core/styles';
export function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '99%',
    backgroundColor: '#263238',
    borderRadius : '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
}));