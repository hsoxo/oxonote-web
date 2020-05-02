import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {NoteState} from "@/types/states";
import sagaAction, {useSelector} from "@/store";
import {GlobalState} from "@/types/states";
import * as GLOBAL_ACT from "@/store/global/actions";

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}


type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: string;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: `transparent !important`,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent !important',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',

    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  }),
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {labelIcon &&
            <Typography variant="body2">
              {labelIcon}
            </Typography>}
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  }),
);



export default function JournalTreeView() {
  const classes = useStyles();
  const history = useHistory()
  const { journals }: GlobalState = useSelector(state => state.get('global'))

  useEffect(() => {
    sagaAction({ type: GLOBAL_ACT.SAGA_LOAD_JOURNAL_LIST })
  }, [])

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={[]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {journals.map(x => (
        <StyledTreeItem
          key={x._id}
          nodeId={x._id}
          labelIcon={x.titleIcon || '📒'}
          labelText={x.title || '未命名笔记本'}
          onClick={() => history.push(`/o/journal/${x._id}`)}>
          {x.views ? x.views.map(y =>
            <StyledTreeItem
              key={y.viewId}
              nodeId={y.viewId}
              labelText={y.label}
              onClick={() => history.push(`/o/journal/${x._id}/${y._id}`)}/>)
            : null}
        </StyledTreeItem>
      ))}
    </TreeView>
  );
}
