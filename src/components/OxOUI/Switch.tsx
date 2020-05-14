import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import {grey} from "@material-ui/core/colors";

export const AntSwitch = withStyles({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: 'white',
      '& + $track': {
        opacity: 1,
        backgroundColor: 'var(--primary-color)',
        borderColor: 'var(--primary-color)',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'white',
  },
  checked: {},
})(Switch);