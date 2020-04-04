import React, { useContext, useEffect, useRef, useState } from "react";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import {Button, Popover, Divider, Box, TextField} from "@material-ui/core";
// import { LeftLabelButton, NoBorderInput } from "@/components/CustomUI";
import { Chip } from "@material-ui/core";
// import { tagColorList } from "../constants";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { grey } from "@material-ui/core/colors";
import { v4 as uuid } from "uuid";
import { ElementProps } from "./types";
import {tagColorList} from "@/constants/colors";
import {NoteState} from "@/store/note/types";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/action-declares";
import {AttributeRangeType} from "@/types/journal";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  display: "flex",
  alignItems: "center",

  // change background colour if dragging
  background: isDragging ? grey[100] : "none",
  borderRadius: 5,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  width: "100%",
});

// a little function to help us with reordering the result
const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const MultiSelect = (props: ElementProps) => {
  const [value, setValue] = useState("");


  const ref = useRef<HTMLDivElement>(null);
  const [popWidth, setPopWidth] = useState(200)
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopper",
  });
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    setPopWidth(width)
  }, [ref, setPopWidth]);


  const { curJournal: { jourAttrs }, curNote: { attributes } }: NoteState = useSelector(state => state.get('note'))
  const attrIndex = attributes.findIndex(x => x.attrId === props.attrId)
  const curAttr = attributes[attrIndex]
  const jourAttrIndex = jourAttrs.findIndex(x => x.attrId === props.attrId)
  const jourAttr = jourAttrs[jourAttrIndex]
  const { range } = jourAttr
  let curSelection
  if (range)
    curSelection = range.filter(x => x.id === curAttr.value)[0]

  const handleChangeRange = (newRange: Array<AttributeRangeType>) => {
    const newJourAttrs = jourAttrs.slice()
    newJourAttrs.splice(jourAttrIndex, 1, {
      ...jourAttr,
      range: newRange
    })
    action(NOTE_ACT.SAGA_UPDATE_JOURNAL, { jourAttrs:  newJourAttrs })
  }

  const handleChangeValue = (newValue: string) => {
    const newAttributes = attributes.slice()
    newAttributes.splice(attrIndex, 1, {
      ...curAttr,
      value: newValue
    })
    action(NOTE_ACT.SAGA_UPDATE_NOTE, { attributes:  newAttributes })

  }

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let items = []
    if (range)
      items = reorder(range, result.source.index, result.destination.index);
    handleChangeRange(items);
  };

  const onChange = (item: AttributeRangeType) => {
    handleChangeValue(item.id);
    popupState.toggle();
  };

  const handleEnter = async (label: string) => {
    if (!label) {
      return;
    }
    let filtered: Array<AttributeRangeType> = []
    if (range) {
      filtered = range.filter((x) => x.label === label);
      if (filtered.length) {
        handleChangeValue(filtered[0].id);
      } else {
        const newRange = range.slice();
        const usedColors = range.map((x) => x.color);
        let availColor = tagColorList.filter((x) => !usedColors.includes(x));
        if (availColor.length === 0) {
          availColor = tagColorList;
        }
        const newId = uuid()
        newRange.push({
          id: newId,
          label,
          color: availColor[Math.floor(Math.random() * availColor.length)],
        });
        await handleChangeRange(newRange)
        await handleChangeValue(newId)
        setValue('')
      }
    }
    popupState.toggle();
  };

  const handleKeyDown = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (e.key === "Enter") {
      handleEnter(e.target.value);
    }
  };

  let listedItems: Array<AttributeRangeType> = []
  if (range) {
    listedItems = range.filter(
      (x) => (x.label || "").indexOf(value) !== -1
    )
  }

  return (
    <div ref={ref} style={{width: "100%"}}>
      <div {...bindTrigger(popupState)}>
        {(curAttr.value && curSelection) ? (
          <Chip
            style={{backgroundColor: curSelection.color}}
            size="small"
            label={curSelection.label}
          />
        ) : (
          <span style={{color: "grey"}}>空</span>
        )}
      </div>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 2,
          style: {width: popWidth},
        }}
      >
        <Box style={{display: "flex", alignItems: "center", padding: "0 0.5rem"}}>
          {(curSelection && curSelection.label) ? (
            <Chip
              style={{backgroundColor: curSelection.color}}
              size="small"
              label={curSelection.label}
            />
          ) : (
            <></>
          )}
          <TextField
            style={{width: `${popWidth}px !important`, display: "flex"}}
            value={value}
            autoFocus={true}
            onChange={(e) => setValue(e.target.value)}
            // @ts-ignore
            onKeyDown={handleKeyDown}/>
        </Box>
        <Divider/>
        <div>
          {(value && (!range || !range.some(x => x.label === value))) &&
          <Button
            style={{width: "100%"}}
            onClick={() => handleEnter(value)}
          >
            <Chip size="small" label={`新建 ${value} 选项 `}/>
          </Button>}
          {!range && !value ? (
            <Button style={{width: "100%"}}>
              <Chip size="small" label={`开始输入并新建选项`}/>
            </Button>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {listedItems.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <DragIndicatorIcon
                              style={{fontSize: "1rem", maxWidth: "1rem"}}
                            />
                            <Button
                              style={{width: "calc(100% - 1rem)"}}
                              onClick={() => onChange(item)}
                            >
                              <Chip
                                style={{backgroundColor: item.color}}
                                size="small"
                                label={item.label}
                              />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default MultiSelect;
