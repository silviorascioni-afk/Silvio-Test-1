import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeChange,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { LayoutNodeData } from "../types";

type TreatmentFlowNode = Node<
  LayoutNodeData,
  "treatment"
>;

const color: Record<string, string> = {
  source: "#2563eb",
  sediment: "#64748b",
  cartridge: "#0891b2",
  roc: "#7c3aed",
  tank: "#d97706",
  remineralizer: "#0d9488",
  appliance: "#94a3b8",
};

function TreatmentNodeComponent({
  data,
}: NodeProps<TreatmentFlowNode>) {
  return (
    <div
      className="flowNode"
      style={{
        borderColor: color[data.kind] ?? "#64748b",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
      />

      <small>{data.kind}</small>

      <b>{data.label}</b>

      <span>{data.subtitle}</span>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  treatment: TreatmentNodeComponent,
};

interface LayoutCanvasProps {
  nodes: TreatmentFlowNode[];
  edges: Edge[];

  onNodesChange: (
    changes: NodeChange<TreatmentFlowNode>[]
  ) => void;
}

export function LayoutCanvas({
  nodes,
  edges,
  onNodesChange,
}: LayoutCanvasProps) {
  return (
    <main className="panel canvas">
      <header>
        <b>Installation layout</b>
        <span>Drag components freely</span>
      </header>

      <div className="flow">
        <ReactFlow<TreatmentFlowNode, Edge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
        >
          <Background gap={20} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
    </main>
  );
}
