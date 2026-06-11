import { useCallback, useState } from 'react';
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

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onLayout = useCallback(() => {
    setNodes((nds) => getLayoutedNodes(nds, edges));
  }, [edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
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
