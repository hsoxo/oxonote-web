import React from 'react';
import { ElementProps } from "./types";
import {useSelector} from "@/store";
import {NoteState} from "@/store/note/types";

const ModifiedBy = (props: ElementProps) => {
  const { curNote: { modifiedUser } }: NoteState = useSelector(state => state.get('note'))

  return (
    <div>
      {modifiedUser}
    </div>
  );
};

export default ModifiedBy;