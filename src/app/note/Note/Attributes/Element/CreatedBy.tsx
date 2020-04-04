import React, {useContext} from 'react';
import { ElementProps } from "./types";
import {useSelector} from "@/store";
import {NoteState} from "@/store/note/types";

const CreatedBy = (props: ElementProps) => {
  const { curNote: { createdUser } }: NoteState = useSelector(state => state.get('note'))

  return (
    <div>
      {createdUser}
    </div>
  );
};

export default CreatedBy;