export const initialNodes = [
  {
    id: 'A',
    type: 'groupNode',
    position: { x: 0, y: 0 },
    dragHandle: '.group-node-header',
    data: { label: 'A' },
    style: {
      width: 170,
      height: 172,
    },
  },
  {
    id: 'A-1',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 42 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'A-2',
    data: { label: 'Child Node 2' },
    position: { x: 10, y: 122 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'B',
    type: 'groupNode',
    position: { x: -100, y: 200 },
    dragHandle: '.group-node-header',
    data: { label: 'B' },
    style: {
      width: 170,
      height: 192,
    },
  },
  {
    id: 'B-1',
    data: { label: 'Child 1' },
    position: { x: 50, y: 42 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-2',
    data: { label: 'Child 2' },
    position: { x: 10, y: 122 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-3',
    data: { label: 'Child 3' },
    position: { x: 100, y: 122 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'C',
    type: 'groupNode',
    position: { x: 100, y: 200 },
    dragHandle: '.group-node-header',
    data: { label: 'C' },
    style: {
      width: 170,
      height: 132,
    },
  },
  {
    id: 'C-1',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 42 },
    parentId: 'C',
    extent: 'parent',
  },
];
