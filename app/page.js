"use client";
import React, { useCallback, useState, useRef } from "react";
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Panel,
	ReactFlowProvider,
	useOnSelectionChange,
	useReactFlow,
	removeElements,
	MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import Trigger from "./components/Trigger";
import Action from "./components/Action";
import SettingsEdge from "./components/SettingsEdge";

const nodeColor = (node) => {
	switch (node.type) {
		case "input":
			return "#6ede87";
		case "output":
			return "#6865A5";
		default:
			return "#ff0072";
	}
};

const initialNodes = [
	{
		id: "1",
		sourcePosition: "right",
		type: "input",
		data: { label: <Trigger /> },
		position: { x: 200, y: 300 },
	},
];
const edgeTypes = {
	settingsedge: SettingsEdge,
};

function Flow() {
	const connectingNodeId = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	let nodeIds = 1;
	const onConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId;
		const id = `${++nodeIds}`;
		const newNode = {
			id,
			sourcePosition: "right",
			targetPosition: "left",
			data: {
				label: <Action />,
			},
			position: {
				x: Math.random() * 500,
				y: Math.random() * 500,
				// x: Math.random() * window.innerWidth,
				// y: Math.random() * window.innerHeight,
			},
		};

		const newEdge = {
			id: `e${id}-2`,
			source: nodeId,
			target: id,
			// label: "eitar r kaaj nai",
			type: "settingsedge",
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 15,
				height: 15,
				color: "#FF0072",
			},
			animated: true,
		};

		setNodes((prevNodes) => [...prevNodes, newNode]);
		setEdges((prevEdges) => [...prevEdges, newEdge]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// let nodeId = 1;

	const reactFlowInstance = useReactFlow();

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				edgeTypes={edgeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				// onConnectEnd={onConnectEnd}
				style={{ backgroundColor: "" }}
				defaultEdgeOptions={{
					animated: true,
					style: {
						stroke: "#a854f7",
						strokeWidth: "2",
						strokeLinecap: "round",
					},
				}}
				connectionLineStyle={{ stroke: "#a854f7" }}
				// defaultViewport={{ x: 0, y: 0, zoom: 5 }}
				// nodeTypes={nodeTypes}
			>
				<Panel position="top-center">
					<h1 className="text-purple-500 font-semibold text-3xl">
						Taskeasy Workflow
					</h1>
				</Panel>
				<Controls />
				<MiniMap
					nodeStrokeWidth={3}
					zoomable
					pannable
					nodeColor={nodeColor}
					nodeComponent={({ x, y, color }) => (
						<circle cx={x} cy={y} r="50" fill={color} />
					)}
				/>
				<Background variant="dots" color="#e5e5e5" gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
