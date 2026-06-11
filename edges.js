// Edges enforce parent-to-parent connections only.
// Original edges were transformed:
//   A-1 → A-2  (child→child, same parent A) → A→A self-loop, dropped
//   A-2 → B    (child→parent)               → A→B
//   A-2 → C    (child→standalone)           → A→C-group (C wrapped in new group)
//   B-1 → B-2  (child→child, same parent B) → B→B self-loop, dropped
//   B-1 → B-3  (child→child, same parent B) → B→B self-loop, dropped
export const initialEdges = [
  { id: 'a-b', source: 'A', target: 'B' },
  { id: 'a-c-group', source: 'A', target: 'C-group' },
];
