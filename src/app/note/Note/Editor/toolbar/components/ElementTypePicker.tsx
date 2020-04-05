import React from 'react';

import {IconButton, ListItem} from "@material-ui/core";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

export default function RadioButtons() {


  return (
    <React.Fragment>
      <IconButton size="small">
        <FormatBoldIcon />
      </IconButton>
      <IconButton size="small">
        <FormatItalicIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="small">
        <FormatUnderlinedIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="small">
        <CodeIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="small">
        <FormatQuoteIcon fontSize="inherit" />
      </IconButton>
    </React.Fragment>
  );
}