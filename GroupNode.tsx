import { useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import './GroupNode.css';

const HEADER_HEIGHT = 32;

type GroupNodeData = {
  label: string;
  collapsed: boolean;
  expandedWidth: number;
  expandedHeight: number;
};

function GroupNode({ id, data }: NodeProps) {
  const { updateNode } = useReactFlow();
  const { label, collapsed, expandedHeight } = data as unknown as GroupNodeData;

  const onToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      updateNode(id, (node) => ({
        data: { ...node.data, collapsed: !collapsed },
        style: {
          ...node.style,
          height: collapsed ? expandedHeight : 0,
        },
      }));
    },
    [id, collapsed, expandedHeight, updateNode],
  );

  return (
    <div className="group-node" data-collapsed={String(collapsed)}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ top: -HEADER_HEIGHT }}
      />
      <div className="group-node-header">
        <button className="group-node-toggle" onClick={onToggle}>
          {collapsed ? '▶' : '▼'}
        </button>
        {String(label ?? '')}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default GroupNode;
