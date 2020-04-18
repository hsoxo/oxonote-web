import React, {Fragment, FunctionComponent} from 'react';
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import {
  AttributeIcon, AttributeLabel,
  AttributeName,
  AttributeNameWrapper,
  ClickableChip,
  NoHoverButton
} from "@/app/Noxo/Note/Attributes/components/UI";
import {AttributeRangeType} from "@/types/journal";
import {bindMenu, bindToggle, usePopupState} from "material-ui-popup-state/hooks";
import AddIcon from "@material-ui/icons/Add";
import {Box, Popover} from "@material-ui/core";
import AttributeTypeEditor from "@/app/Noxo/Note/Attributes/components/AttributeTypeEditor";
import ColorPicker from "@/app/Noxo/components/ColorPicker";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {MarginDivider5} from "@/components/OxOUI/Divider";
import {DenseListItem, DenseListItemIcon} from "@/components/OxOUI/List";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

interface SelectionRowProps extends AttributeRangeType {
  handleSelectionClick: (selectionId: string) => void
  handleSelectionColorChange: (selectionId: string, color: string) => void
  handleDelete: (selectionId: string) => void
}

const SelectionRow: FunctionComponent<SelectionRowProps> = (props) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: props.id,
  });

  const onColorChange = (color: string) => {
    props.handleSelectionColorChange(props.id, color)
    popupState.toggle()
  }
  return (
    <Fragment>
      <DragIndicatorIcon
        style={{ fontSize: '1rem', maxWidth: '1rem' }}
      />
      <NoHoverButton
        style={{ width: 'calc(100% - 1rem)' }}
        onClick={() => props.handleSelectionClick(props.id)}
      >
        <ClickableChip
          style={{ backgroundColor: props.color }}
          size="small"
          label={props.label}
        />
      </NoHoverButton>
      <Box width="30px">
        <NoHoverButton
          {...bindToggle(popupState)}>
          <MoreHorizIcon fontSize="inherit" />
        </NoHoverButton>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{
            style: {
              width: '200px',
              marginTop: '-0.5rem',
              marginLeft: '-0.5rem',
              boxShadow: 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
            }
          }}
          {...bindMenu(popupState)}>
          <ColorPicker onChange={onColorChange}/>
          <MarginDivider5 />
          <DenseListItem button={true} onClick={() => props.handleDelete(props.id)}>
            <DenseListItemIcon>
              <HighlightOffIcon fontSize="inherit" />
            </DenseListItemIcon>
            {'删除选项'}
          </DenseListItem>
        </Popover>
      </Box>
    </Fragment>
  );
};

export default SelectionRow;