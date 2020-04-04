import React from "react";

interface NoteAttributeTypeObject {
    defaultLabel: string
    special: boolean
    icon: React.ComponentElement<void, any>
    defaultValue: { (): any }
    elem: { (): React.ComponentElement<void, any> }
}

export interface NoteAttributeTypesObject {
    [key: string]: NoteAttributeTypeObject
}