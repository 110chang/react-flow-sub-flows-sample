export const initialNodes = [
  {
    id: 'A',
    position: { x: 0, y: 0 },
    data: { label: 'A' },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: 'A-1',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 10 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'A-2',
    data: { label: 'Child Node 2' },
    position: { x: 10, y: 90 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'B',
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 160,
    },
  },
  {
    id: 'B-1',
    data: { label: 'Child 1' },
    position: { x: 50, y: 10 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-2',
    data: { label: 'Child 2' },
    position: { x: 10, y: 90 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-3',
    data: { label: 'Child 3' },
    position: { x: 100, y: 90 },
    parentId: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'C',
    position: { x: 100, y: 200 },
    data: { label: 'C' },
    style: {
      width: 170,
      height: 100,
    },
  },
  {
    id: 'C-1',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 10 },
    parentId: 'C',
    extent: 'parent',
  },
];
