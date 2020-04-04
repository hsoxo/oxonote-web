import React from 'react';
import {NoteState} from "@/store/note/types";
import {useSelector} from "@/store";
import { ElementProps } from "./types";

const CreatedTime = (props: ElementProps) => {
  const { curNote: { createdTime }}: NoteState = useSelector(state => state.get('note'))

  return (
    <div>
      {new Date(createdTime).toLocaleString()}
    </div>
  );
};

export default CreatedTime;
