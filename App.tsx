import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes } from './nodes';
import { initialEdges } from './edges';

const rfStyle = {
  backgroundColor: '#D0C0F7',
};

let nextGroupId = 1;

// Resolve a node to its top-level parent id (if it's a child).
function resolveToParent(nodeId, nodes) {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return nodeId;
  return node.parentId ? node.parentId : nodeId;
}

// Returns true if the node is a parent/group (type 'group', or has children).
function isParentNode(nodeId, nodes) {
  const node = nodes.find((n) => n.id === nodeId);
  return (node?.type === 'group') || nodes.some((n) => n.parentId === nodeId);
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (connection) => {
      setNodes((currentNodes) => {
        // Rule 1: resolve child endpoints to their parent.
        let sourceId = resolveToParent(connection.source, currentNodes);
        let targetId = resolveToParent(connection.target, currentNodes);

        // Drop self-loops that result from two children of the same parent.
        if (sourceId === targetId) return currentNodes;

        let updatedNodes = currentNodes;

        // Rule 2: wrap standalone (non-parent) leaf nodes in a new group.
        const wrapIfOrphan = (nodeId) => {
          if (isParentNode(nodeId, updatedNodes)) return nodeId;

          const orphan = updatedNodes.find((n) => n.id === nodeId);
          if (!orphan) return nodeId;

          const groupId = `auto-group-${nextGroupId++}`;
          const groupNode = {
            id: groupId,
            type: 'group',
            position: { ...orphan.position },
            style: { width: 170, height: 80 },
          };
          const wrappedChild = {
            ...orphan,
            position: { x: 10, y: 22 },
            parentId: groupId,
            extent: 'parent',
          };
          updatedNodes = updatedNodes
            .filter((n) => n.id !== nodeId)
            // Insert group before the child so React Flow renders correctly.
            .concat([groupNode, wrappedChild]);

          return groupId;
        };

        sourceId = wrapIfOrphan(sourceId);
        targetId = wrapIfOrphan(targetId);

        setEdges((eds) =>
          addEdge({ ...connection, source: sourceId, target: targetId }, eds),
        );

        return updatedNodes;
      });
    },
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={rfStyle}
      attributionPosition="top-right"
    >
      <Background />
    </ReactFlow>
  );
}

export default Flow;
