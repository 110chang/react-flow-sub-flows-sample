import { Handle, Position, type NodeProps } from '@xyflow/react';
import './GroupNode.css';

const HEADER_HEIGHT = 32;

function GroupNode({ data }: NodeProps) {
  return (
    <div className="group-node">
      <Handle
        type="target"
        position={Position.Top}
        style={{ top: -HEADER_HEIGHT }}
      />
      <div className="group-node-header">
        {String((data as { label: string }).label ?? '')}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default GroupNode;
