import * as React from 'react';
import {useContext} from 'react';
import {Box, Button, ListItemSecondaryAction, Popover} from "@material-ui/core";
import {bindPopover, bindTrigger, usePopupState,} from 'material-ui-popup-state/hooks'
import styled from "styled-components";
import {JournalState} from "@/types/states";
import sagaAction, {useSelector} from "@/store";
import notePropTypes from "@/types/constants/note-attributes";
import {JournalView, JournalViewAttribute} from "@/types/journal";
import {DenseListItemBox, DenseListItemIcon} from "@/components/OxOUI/List";
import {AntSwitch} from "@/components/OxOUI/Switch";
import * as JOURNAL_ACT from "@/store/journal/actions";
import {JournalContext} from "@/app/Noxo/Journal";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";


const InfileBox = styled(Box)`
  margin: 0.3rem 0;
`

const AttributeSetting: React.FunctionComponent = () => {
  const context = useContext(JournalContext)
  const { viewId } = context

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const { views, attrs: jourAttrs, journal }: JournalState = useSelector(state => state.get('journal'))

  const curView = views.find(x => x._id === viewId) as JournalView

  let attributes = jourAttrs
    .map(x => ({...notePropTypes[x.type], ...x}))
    .filter(x => journal.attrIds.indexOf(x._id) > -1)
    .sort((a, b) => journal.attrIds.indexOf(a._id) - journal.attrIds.indexOf(b._id))

  const attrSetting = curView.attribute || []

  const handleToggle = (attrId: string) => {
    let newAttrSetting: Array<JournalViewAttribute> = JSON.parse(JSON.stringify(curView.attribute))
    const toggledAttrIndex = newAttrSetting.findIndex(x => x.attrId === attrId)
    if (toggledAttrIndex >= 0) {
      newAttrSetting.splice(toggledAttrIndex, 1, {
        attrId,
        status: !newAttrSetting[toggledAttrIndex].status
      })
    } else {
      newAttrSetting.push({
        attrId,
        status: true
      })
    }
    sagaAction({ type: JOURNAL_ACT.SAGA_UPDATE_VIEW_ATTR_SETTING, viewId, attribute: newAttrSetting})
  }

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) return;

    const newAttrSetting: Array<string> = JSON.parse(JSON.stringify(journal.attrIds))
    const [removed] = newAttrSetting.splice(result.source.index, 1);
    newAttrSetting.splice(result.destination.index, 0, removed)
    sagaAction({ type: JOURNAL_ACT.SAGA_UPDATE_INFO, payload: { attrs: newAttrSetting} })
  }

  return (
    <div>
      <Button {...bindTrigger(popupState)}>
        显示 / 隐藏属性
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            minWidth: '200px'
        }}}
      >
        <InfileBox>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {attributes.map((x, index) =>
                    <Draggable key={x._id} draggableId={x._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}>
                          <DenseListItemBox key={x.attrId}>
                            <DenseListItemIcon {...provided.dragHandleProps}>
                              <DragIndicatorIcon style={{fontSize: '1rem'}}/>
                            </DenseListItemIcon>
                            <DenseListItemIcon>
                              {x.icon}
                            </DenseListItemIcon>
                            {x.label}
                            <ListItemSecondaryAction>
                              <AntSwitch
                                checked={(attrSetting.find(y => y.attrId === x._id) || {}).status || false}
                                onChange={() => handleToggle(x._id)}
                              />
                            </ListItemSecondaryAction>
                          </DenseListItemBox>
                        </div>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        </InfileBox>
      </Popover>
    </div>
  );
};

export default AttributeSetting;