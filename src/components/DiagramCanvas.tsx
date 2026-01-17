import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import type { Connection, Edge, NodeChange, EdgeChange, Node as RFNode } from "reactflow";
import { CustomNode } from "./CustomNode";
import type { BlockNode, BlockData } from "../types";
import { fixedIds } from "../types";

interface DiagramCanvasProps {
  nodes: BlockNode[];
  setNodes: React.Dispatch<React.SetStateAction<BlockNode[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function DiagramCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
}: DiagramCanvasProps) {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (_: unknown, node: RFNode) => {
    const note = prompt(
      "Enter comment for this block:",
      (node.data as BlockData).comment || ""
    );
    if (note === null) return;

    setNodes((nds) =>
      (nds as BlockNode[]).map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                comment: note || undefined,
              },
            }
          : n
      )
    );
  };

  const deleteSelectedNode = (nodeId: string) => {
    if (fixedIds.includes(nodeId as any)) {
      alert("Cannot delete base blocks!");
      return;
    }

    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
    );
  };

  return (
    <div style={{ flex: 1, overflow: "hidden" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={{ custom: CustomNode }}
        fitView
        onNodeContextMenu={(e, node) => {
          e.preventDefault();
          deleteSelectedNode(node.id);
        }}
      >
        <MiniMap
          style={{
            backgroundColor: "#0e0d0d",
            border: "2px solid #321d1d",
            borderRadius: "6px",
          }}
        />
        <Controls
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "6px",
          }}
        />
      </ReactFlow>
    </div>
  );
}
