// @ts-nocheck
import React from "react";
import { Divider, IconButton, Paper, Popper, Radio, List, ListItemIcon, ListItemText, ListItem } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from 'prop-types';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ElementTypePicker from "./components/ElementTypePicker";
import ColorRadio from "./components/ColorRadio";


const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};



class ToolWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      overBtn: false,
      overPop: false,
    }
  }

  handlePopoverOpen = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({
      anchorEl: event.currentTarget,
      overBtn: true,
      open: true
    });
  };

  handlePopoverLeave = (elem) => {
    console.log(elem)
    if (elem === 'btn') {
      this.setState({ overBtn: false })
    } else if (elem === 'pop') {
      this.setState({ overPop: false })
    }
    setTimeout(() => {
      console.log(this.state)
      if (!this.state.overBtn && !this.state.overPop) {
        console.log(123)
        this.setState({ open: false })
      }
    }, 200)
  };

  render() {
    return (
      <div className="inline-toolbox" contentEditable={false}>
        <IconButton
          variant="contained"
          color="primary"
          onMouseEnter={e => this.handlePopoverOpen(e)}
          onMouseLeave={() => this.handlePopoverLeave('btn')}
        >
          <DragIndicatorIcon />
        </IconButton>

        <Popper
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          placement="bottom-start"
          disablePortal={false}
          transition
          style={{zIndex: 10000, marginTop: 0}}
          onMouseEnter={() => this.setState( { overPop: true })}
          onMouseLeave={() => this.handlePopoverLeave('pop')}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper>
                <List dense>
                  <ListItem>
                    <ElementTypePicker />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ColorRadio />
                  </ListItem>
                </List>
              </Paper>
            </Fade>
          )}

        </Popper>
        {this.props.children}
      </div>
    );
  }

};

export default ToolWrapper;
