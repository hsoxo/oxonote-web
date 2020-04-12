import React from "react";
import {ElementProps} from "@/app/Noxo/Note/Attributes/Element/types";
import {ContentViewProps} from "@/app/Noxo/Note/Attributes/Element/Base";

interface NoteAttributeTypeObject {
    defaultLabel: string
    special: boolean
    icon: React.ComponentElement<void, any>
    defaultValue: { (): any }
    elem: { (props: ElementProps): JSX.Element }
    contentView: React.FunctionComponent<ContentViewProps>
    operators: Array<{ label: string, needTarget: boolean }>
}

export interface NoteAttributeTypesObject {
    [key: string]: NoteAttributeTypeObject
}