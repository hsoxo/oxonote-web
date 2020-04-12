import { JournalAttribute } from "@/types/journal";
import notePropTypes from "@/types/constants/note-attributes";
import { NoteObject } from "@/types/note";
import {v4} from "uuid";

export function defaultNote(jAttrs: Array<JournalAttribute>): NoteObject {
    return {
        _id: v4(),
        _rev: '',
        journalId: '',
        title: '',
        titleIcon: '',
        bannerImg: '',
        createdTime: new Date().getTime(),
        createdUser: '',
        modifiedTime: new Date().getTime(),
        modifiedUser: '',
        content: [{ type: 'paragraph', children: [{text: ''}], root: true }],
        attributes: jAttrs.map(x => ({ 
            attrId: x.attrId, 
            value: notePropTypes[x.type].defaultValue()
        })),
    }
}
