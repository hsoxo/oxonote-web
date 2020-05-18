import { EditorContent } from '@/types/note'

const HEADER_LIST = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const toc = (content: EditorContent[]) => {
  const headerContents = content.filter(x => HEADER_LIST.includes(x.type))
  let result = ''
  if (headerContents.length === 0) return result
  const ulStart = () => { result += '<ul>' }
  const ulEnd = () => { result += '</ul>' }
  const liAdd = (c: any) => { result += `<li><a href="#${c.children[0].text}">${c.children[0].text}</a></li>` }
  let level = Number(headerContents[0].type[1])
  ulStart()
  for (const c of headerContents) {
    const curLevel = Number(c.type[1])
    let diff = curLevel - level
    if (diff > 0) {
      while (diff --) {
        ulStart()
      }
    } else if (diff < 0) {
      diff = -diff
      while (diff --) {
        ulEnd()
      }
    }
    liAdd(c)
    level = curLevel
  }
  ulEnd()
  return result
}


export default toc
