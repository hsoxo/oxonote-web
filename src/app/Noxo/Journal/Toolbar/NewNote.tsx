import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import action, {useSelector} from "@/store";
import NOTE_ACT from "@/store/note/actions";
import {Button} from "@material-ui/core";
import {JournalState} from "@/types/states";

const NewNote: React.FunctionComponent = () => {
  const { journal }: JournalState = useSelector(state => state.get('journal'))

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      startIcon={<AddIcon />}
      onClick={() => action(NOTE_ACT.SAGA_CREATE_NOTE, journal._id)}>
      新笔记
    </Button>
  );
};

export default NewNote;