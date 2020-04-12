import { SET_TITLE, GlobalActionTypes} from "./types";

export function setTitle(title: string): GlobalActionTypes {
    return {
        type: SET_TITLE,
        title
    }
}

export function checkIsLogin() {

}