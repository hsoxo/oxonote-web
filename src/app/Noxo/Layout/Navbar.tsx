import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {navbarHeight} from './config'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        minHeight: navbarHeight,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}));

interface SidebarProps {
    shift: boolean
    onToggleSidebar: {(): void}
}

const Navbar = (props: SidebarProps) => {
  const classes = useStyles();

  // const { curJournal, curNote }: NoteState = useSelector(state => state.get('note'))
  let title: Array<string> = []
  // const url = window.location.href
  // if (/\/o\/journal/.test(url)) {
  //   title.push(curJournal.title)
  // } else if (/\/o\/editor\//.test(url)) {
  //   title.push(curJournal.title || '未命名笔记本')
  //   title.push(curNote.title || '未命名笔记')
  // }

  return (
    <div>
      <CssBaseline />
      <div>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            {title.map((x, index) => <span key={index}>{x}{index !== title.length-1 && ' / '}</span>)}
          </Typography>
        </Toolbar>
      </div>
    </div>
  )
}

export default Navbar