import {Editor} from "slate";

const withPlugins = (editor: Editor, plugins: Array<any>) => {
  for (const item of plugins) {
    editor = item(editor)
  }
  return editor
}

export default withPlugins
