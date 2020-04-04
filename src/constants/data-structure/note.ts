import { JournalAttributeObject } from "@/types/journal";
import notePropTypes from "@/constants/note-attributes";
import { NoteType } from "@/types/note";
import {v4} from "uuid";

export function defaultNote(jAttrs: Array<JournalAttributeObject>): NoteType {
    return {
        _id: v4(),
        journalId: '',
        title: '',
        titleIcon: '',
        bannerImg: '',
        createdTime: new Date().getTime(),
        createdUser: '',
        modifiedTime: new Date().getTime(),
        modifiedUser: '',
        content: [{ type: 'paragraph', children: [{text: ''}] }],
        attributes: jAttrs.map(x => ({ 
            attrId: x.attrId, 
            value: notePropTypes[x.type].defaultValue()
        })),
    }
}
