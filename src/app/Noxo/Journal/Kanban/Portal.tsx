const portal: HTMLElement = document.createElement('div');
portal.classList.add('kanban-view-drag-portal');

if (!document.body) {
  throw new Error('body not ready for portal creation!');
}

document.body.appendChild(portal);
export default portal