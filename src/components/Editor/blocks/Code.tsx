import React from "react";
import {Transforms} from 'slate'
import {EditorElementProps} from "../types/index";
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state'
import {Button, Menu} from "@material-ui/core";
import {DenseListItemBox} from '@/components/OxOUI/List'

import {langList} from "../utils/prism";

class CodeElement extends React.Component<EditorElementProps> {
  private focusRef: React.RefObject<HTMLDivElement>;

  constructor(props: EditorElementProps) {
    super(props);
    this.focusRef = React.createRef();
    this.state = {
      language: this.props.element.lang
    }
  }
  handleClick = (lang: string) => {
    this.setState({language: lang})
    const { selection } = this.props.editor
    Transforms.setNodes(this.props.editor, { lang }, { at: selection?.anchor })
  }
  render() {
    // @ts-ignore TODO:change something here
    const tmp = langList.filter(x => x[1] === this.state.language)
    let language = tmp.length ? tmp[0][0] : 'JavaScript'
    return (
      <pre {...this.props.attributes}>
        <div suppressContentEditableWarning={true} contentEditable="false" style={{width: '100%', height: 20, marginTop: -10}}>
          <div style={{float: "right"}}>
          <PopupState variant="popover" popupId="demoMenu">
            {popupState => (
              <React.Fragment>
                <Button variant="contained" size={"small"} {...bindTrigger(popupState)} onMouseDown={() => {
                  let range = document.createRange();
                  let sel = window.getSelection();
                  if (sel && this.focusRef.current) {
                    // @ts-ignore
                    range.setStart(this.focusRef.current, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                  }
                }}>
                  {language}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {langList.map(x =>
                    <DenseListItemBox
                      key={x[1]}
                      onClick={() => {
                        this.handleClick(x[1])
                        popupState.close()
                      }}>
                      {x[0]}
                    </DenseListItemBox>
                  )}
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          </div>
        </div>
        <div tabIndex={0} ref={this.focusRef}>
          <code>{this.props.children}</code>
        </div>
      </pre>
    )
  }
}

export default CodeElement