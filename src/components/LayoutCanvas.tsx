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
  type NodeTypes
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type {
  LayoutNodeData
} from "../types";

type TreatmentNode = Node<
  LayoutNodeData,
  "treatment"
>;

function TreatmentNodeComponent({
  data
}: NodeProps<TreatmentNode>) {

  return (
    <div
      className="flowNode"
      style={{
        borderColor: color[data.kind]
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
  treatment: TreatmentNodeComponent
};

interface LayoutCanvasProps {
  nodes: TreatmentNode[];

  edges: Edge[];

  onNodesChange: (
    changes: NodeChange<TreatmentNode>[]
  ) => void;
}

export function LayoutCanvas({
  nodes,
  edges,
  onNodesChange
}: LayoutCanvasProps) {

  return (
    <main className="panel canvas">

      <header>
        <b>Installation layout</b>
        <span>Drag components freely</span>
      </header>

      <div className="flow">

        <ReactFlow<TreatmentNode, Edge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.2
          }}
        >

          <Background gap={20} />

          <Controls />

          <MiniMap
            pannable
            zoomable
          />

        </ReactFlow>

      </div>

    </main>
  );
}
