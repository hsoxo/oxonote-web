import * as colors from '@material-ui/core/colors';

const SHADE = 100;

// @ts-ignore
export const tagColorList: Array<string> = Object.values(colors).map(x => x[SHADE])
