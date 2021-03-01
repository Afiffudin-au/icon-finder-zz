const { Tooltip, withStyles } = require('@material-ui/core')

export const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: 'white',
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip)
