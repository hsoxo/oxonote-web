import React from 'react';
import {NoteState} from "@/store/note/types";
import {useSelector} from "@/store";
import { ElementProps } from "./types";

const ModifiedTime = (props: ElementProps) => {
  const { curNote: { modifiedTime }}: NoteState = useSelector(state => state.get('note'))

  return (
    <div>
      {new Date(modifiedTime).toLocaleString()}
    </div>
  );
};

export default ModifiedTime;
