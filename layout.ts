import dagre from '@dagrejs/dagre';
import type { Node, Edge } from '@xyflow/react';

const PADDING = 20;
const DEFAULT_NODE_WIDTH = 150;
const DEFAULT_NODE_HEIGHT = 36;

export function getLayoutedNodes(nodes: Node[], edges: Edge[]): Node[] {
  const groupNodes = nodes.filter((n) => !n.parentId);
  const childNodes = nodes.filter((n) => n.parentId);

  const updatedChildren: Node[] = [];
  const groupSizes = new Map<string, { width: number; height: number }>();

  // Step 1: layout children within each group
  for (const group of groupNodes) {
    const children = childNodes.filter((n) => n.parentId === group.id);

    if (children.length === 0) {
      groupSizes.set(group.id, {
        width: (group.style?.width as number) ?? DEFAULT_NODE_WIDTH,
        height: (group.style?.height as number) ?? DEFAULT_NODE_HEIGHT,
      });
      continue;
    }

    const childIds = new Set(children.map((c) => c.id));
    const intraEdges = edges.filter(
      (e) => childIds.has(e.source) && childIds.has(e.target),
    );

    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 20, ranksep: 30 });
    g.setDefaultEdgeLabel(() => ({}));

    for (const child of children) {
      const w = child.measured?.width ?? DEFAULT_NODE_WIDTH;
      const h = child.measured?.height ?? DEFAULT_NODE_HEIGHT;
      g.setNode(child.id, { width: w, height: h });
    }

    for (const edge of intraEdges) {
      g.setEdge(edge.source, edge.target);
    }

    dagre.layout(g);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const child of children) {
      const { x, y } = g.node(child.id);
      const w = child.measured?.width ?? DEFAULT_NODE_WIDTH;
      const h = child.measured?.height ?? DEFAULT_NODE_HEIGHT;
      minX = Math.min(minX, x - w / 2);
      minY = Math.min(minY, y - h / 2);
      maxX = Math.max(maxX, x + w / 2);
      maxY = Math.max(maxY, y + h / 2);
    }

    for (const child of children) {
      const { x, y } = g.node(child.id);
      const w = child.measured?.width ?? DEFAULT_NODE_WIDTH;
      const h = child.measured?.height ?? DEFAULT_NODE_HEIGHT;
      updatedChildren.push({
        ...child,
        position: {
          x: x - w / 2 - minX + PADDING,
          y: y - h / 2 - minY + PADDING,
        },
      });
    }

    groupSizes.set(group.id, {
      width: maxX - minX + 2 * PADDING,
      height: maxY - minY + 2 * PADDING,
    });
  }

  // Step 2: layout top-level groups
  const topGraph = new dagre.graphlib.Graph();
  topGraph.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 80 });
  topGraph.setDefaultEdgeLabel(() => ({}));

  const groupIds = new Set(groupNodes.map((n) => n.id));

  for (const group of groupNodes) {
    const size = groupSizes.get(group.id)!;
    topGraph.setNode(group.id, { width: size.width, height: size.height });
  }

  for (const edge of edges.filter(
    (e) => groupIds.has(e.source) && groupIds.has(e.target),
  )) {
    topGraph.setEdge(edge.source, edge.target);
  }

  dagre.layout(topGraph);

  const updatedGroups = groupNodes.map((group) => {
    const { x, y } = topGraph.node(group.id);
    const size = groupSizes.get(group.id)!;
    return {
      ...group,
      position: {
        x: x - size.width / 2,
        y: y - size.height / 2,
      },
      style: {
        ...group.style,
        width: size.width,
        height: size.height,
      },
    };
  });

  return [...updatedGroups, ...updatedChildren];
}
