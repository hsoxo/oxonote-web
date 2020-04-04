import React from "react";
import {ElementProps} from "@/app/note/Note/Attributes/Element/types";

interface NoteAttributeTypeObject {
    defaultLabel: string
    special: boolean
    icon: React.ComponentElement<void, any>
    defaultValue: { (): any }
    elem: { (props: ElementProps): JSX.Element }
}

export interface NoteAttributeTypesObject {
    [key: string]: NoteAttributeTypeObject
}