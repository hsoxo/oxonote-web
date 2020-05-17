import { grey } from '@material-ui/core/colors'

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',

  // change background colour if dragging
  background: isDragging ? grey[100] : 'none',
  borderRadius: 5,

  // styles we need to apply on draggables
  ...draggableStyle
})

export const getListStyle = (isDraggingOver: boolean) => ({
  width: '100%'
})

// a little function to help us with reordering the result
export const reorder = (
  list: Array<any>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
