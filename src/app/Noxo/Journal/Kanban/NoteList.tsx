import React from 'react';
import {NoteObject} from "@/types/note";
import NoteCard from "@/app/Noxo/Journal/Kanban/NoteCard";
import {Draggable, DraggableProvided, DraggableStateSnapshot, Droppable} from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import portal from "@/app/Noxo/Journal/Kanban/Portal";

const NoteList: React.FC<{ label: string, notes: Array<NoteObject> }> = x => {
  return (
    <Droppable
      droppableId={x.label}
      type="NOTE"
    >
      {(dropProvided, dropSnapshot) => (
        <div

          {...dropProvided.droppableProps}
        >
          <div
            ref={dropProvided.innerRef}
            style={{minHeight: 100}}
          >
            {x.notes.map((x, i) =>
              <Draggable
                key={x._id}
                draggableId={x._id}
                index={i}
              >
                {(dragProvided, dragSnapshot) => (
                  <PortalWrapper
                    provided={dragProvided}
                    snapshot={dragSnapshot}
                    note={x}
                  />)}
              </Draggable>)}
            {dropProvided.placeholder}
          </div>
        </div>)}
    </Droppable>
  );
};

const PortalWrapper: React.FC<{ provided: DraggableProvided, snapshot: DraggableStateSnapshot, note: NoteObject}> = (p) => {
  const child = (
    <div
      ref={p.provided.innerRef}
      {...p.provided.draggableProps}
      {...p.provided.dragHandleProps}
    >
      <NoteCard
        key={p.note._id}
        note={p.note}
      />
    </div>
  );
  const usePortal: boolean = p.snapshot.isDragging;

  if (!usePortal) {
    return child;
  }

  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal);
}

export default NoteList;