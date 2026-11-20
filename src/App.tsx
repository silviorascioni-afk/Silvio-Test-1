import { useMemo, useState } from "react";

import {
  applyNodeChanges,
  type NodeChange,
} from "@xyflow/react";

import { SiteForm } from "./components/SiteForm";
import { LayoutCanvas } from "./components/LayoutCanvas";
import { RecommendationPanel } from "./components/RecommendationPanel";

import { buildLayout } from "./engine/layout";

import type {
  ApplianceInput,
  LayoutConfig,
  TankSize,
} from "./types";

import "./styles.css";


const appliances: ApplianceInput[] = [
  {
    type: "espresso",
    label: "Espresso machines",
    quantity: 2,
  },
  {
    type: "batch",
    label: "Batch brewers",
    quantity: 1,
  },
  {
    type: "ice",
    label: "Ice makers",
    quantity: 1,
  },
  {
    type: "oven",
    label: "Combi ovens / steamers",
    quantity: 0,
  },
  {
    type: "dishwasher",
    label: "Dishwashers",
    quantity: 1,
  },
  {
    type: "dispenser",
    label: "Water dispensers",
    quantity: 0,
  },
];


const initialConfig: LayoutConfig = {
  scenario: "direct",

  site: {
    totalHardness: 18,
    carbonateHardness: 14,
    appliances,
  },

  sedimentEnabled: true,

  roc: {
    model: "ROC14",
    tankSize: 8,
  },
};


export default function App() {

  const [config, setConfig] =
    useState<LayoutConfig>(initialConfig);

  const generated =
    useMemo(
      () => buildLayout(config),
      [config]
    );

  const [nodes, setNodes] =
    useState(generated.nodes);


  function updateConfig(
    nextConfig: LayoutConfig
  ) {

    setConfig(nextConfig);

    const layout =
      buildLayout(nextConfig);

    setNodes(layout.nodes);
  }


  function generateLayout() {

    const layout =
      buildLayout(config);

    setNodes(layout.nodes);
  }


  function handleNodesChange(
    changes: NodeChange[]
  ) {

    setNodes((currentNodes) =>
      applyNodeChanges(
        changes,
        currentNodes
      ) as typeof currentNodes
    );
  }


  function changeTank(
    tankSize: TankSize
  ) {

    const nextConfig: LayoutConfig = {
      ...config,

      roc: {
        ...config.roc,
        tankSize,
      },
    };

    updateConfig(nextConfig);
  }


  function reset() {

    setConfig(initialConfig);

    const layout =
      buildLayout(initialConfig);

    setNodes(layout.nodes);
  }


  return (
    <div className="app">

      <div className="title">

        <div>

          <h1>
            Water Treatment Layout Configurator
          </h1>

          <p>
            V1 · Cartridge and ROC solutions
          </p>

        </div>

        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>

      </div>


      <div className="workspace">

        <SiteForm
          config={config}
          onChange={updateConfig}
          onGenerate={generateLayout}
        />


        <LayoutCanvas
          nodes={nodes as any}
          edges={generated.edges}
          onNodesChange={handleNodesChange as any}
        />


        <RecommendationPanel
          config={config}
          recs={generated.recs}
          onTank={changeTank}
        />

      </div>


      <footer>
        V1 excludes flow restriction,
        pressure loss and hydraulic sizing.
        Validate product data before commercial use.
      </footer>

    </div>
  );
}
