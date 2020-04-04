import { Theme } from "@material-ui/core";


export interface OxOTheme extends Theme {
    backgroundColor: {
        primary: string
        secondary: string
    },
    hoverColor: {
        primary: string
        secondary: string
    }
}