import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes } from './nodes';
import { initialEdges } from './edges';
import GroupNode from './GroupNode';
import { getLayoutedNodes } from './layout';

const nodeTypes = { groupNode: GroupNode };

const rfStyle = {
  backgroundColor: '#D0C0F7',
};

function seedNodes(nodes) {
  return nodes.map((node) =>
    node.type === 'groupNode'
      ? {
          ...node,
          data: {
            ...node.data,
            collapsed: false,
            expandedWidth: node.style?.width ?? 170,
            expandedHeight: node.style?.height ?? 140,
          },
        }
      : node,
  );
}

function Flow() {
  const [nodes, setNodes] = useState(() => seedNodes(initialNodes));
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
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [],
  );

  const onLayout = useCallback(() => {
    setNodes((nds) => getLayoutedNodes(nds, edges));
  }, [edges]);

  const visibleNodes = useMemo(() => {
    const collapsedIds = new Set(
      nodes
        .filter((n) => n.type === 'groupNode' && n.data?.collapsed)
        .map((n) => n.id),
    );
    return nodes.map((node) =>
      node.parentId && collapsedIds.has(node.parentId)
        ? { ...node, hidden: true }
        : node,
    );
  }, [nodes]);

  const visibleEdges = useMemo(() => {
    const hiddenNodeIds = new Set(
      visibleNodes.filter((n) => n.hidden).map((n) => n.id),
    );
    return edges.map((edge) =>
      hiddenNodeIds.has(edge.source) || hiddenNodeIds.has(edge.target)
        ? { ...edge, hidden: true }
        : edge,
    );
  }, [edges, visibleNodes]);

  return (
    <ReactFlow
      nodes={visibleNodes}
      edges={visibleEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
      attributionPosition="top-right"
    >
      <Background />
      <Panel position="top-left">
        <button onClick={onLayout}>Re-layout</button>
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
