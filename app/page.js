"use client";
import React, { useCallback, useState, useRef, useEffect } from "react";
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
	getIncomers,
	getOutgoers,
	getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";
import Trigger from "./components/Trigger";
import Action from "./components/Action";
import SettingsEdge from "./components/SettingsEdge";

const nodeColor = (node) => {
	switch (node.type) {
		case "trigger":
			return "#6ede87";
		case "action":
			return "#6865A5";
		default:
			return "#ff0072";
	}
};
let nodeIdCounter = 1;
const initialNodes = [
	{
		id: `${nodeIdCounter++}`,
		sourcePosition: "right",
		type: "trigger",
		position: { x: 200, y: 300 },
	},
];
const nodeTypes = { trigger: Trigger, action: Action };
const edgeTypes = {
	settingsedge: SettingsEdge,
};

function Flow() {
	const connectingNodeId = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const reactFlowInstance = useReactFlow();
	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	const onConnectStart = useCallback(
		(event, { nodeId, handleType }) => {
			connectingNodeId.current = nodeId;
			const selectedNode = nodes.find((node) => node.id === nodeId);
			if (edges.some((edge) => edge.source === nodeId)) return;

			const newNode = {
				id: `${parseInt(selectedNode.id) + 1}`,
				sourcePosition: "right",
				targetPosition: "left",
				type: "action",
				position: {
					x: selectedNode.position.x + 300,
					y: selectedNode.position.y,
				},
			};

			const newEdge = {
				id: `${nodeId}-to-${parseInt(selectedNode.id) + 1}`,
				source: nodeId,
				target: `${parseInt(selectedNode.id) + 1}`,
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
		},
		[nodes, edges, setNodes, setEdges]
	);

	const onNodeContextMenu = useCallback(
		(event, node) => {
			event.preventDefault();

			const isInitialNode = initialNodes.some(
				(initialNode) => initialNode.id === node.id
			);
			if (isInitialNode) {
				return;
			}

			setNodes((prevNodes) => prevNodes.filter((n) => n.id !== node.id));
			setEdges((prevEdges) =>
				prevEdges.filter(
					(edge) => edge.source !== node.id && edge.target !== node.id
				)
			);

			const incomingNodes = getIncomers(node, nodes, edges);
			const outgoingNodes = getOutgoers(node, nodes, edges);

			incomingNodes.forEach((incomingNode) =>
				outgoingNodes.forEach((outgoingNode) => {
					const newEdge = {
						id: `${incomingNode.id}-to-${outgoingNode.id}`,
						source: incomingNode.id,
						target: outgoingNode.id,
						type: "settingsedge",
						markerEnd: {
							type: MarkerType.ArrowClosed,
							width: 15,
							height: 15,
							color: "#FF0072",
						},
						animated: true,
					};

					setEdges((prevEdges) => [...prevEdges, newEdge]);
				})
			);
		},
		[nodes, edges, setNodes, setEdges]
	);

	const onSave = useCallback(() => {
		const flow = {
			nodes: nodes,
			edges: edges,
		};
		localStorage.setItem("flow", JSON.stringify(flow));
	}, [nodes, edges]);

	const onRestore = useCallback(() => {
		const flow = JSON.parse(localStorage.getItem("flow"));
		if (flow) {
			setNodes(flow.nodes || []);
			setEdges(flow.edges || []);
		}
	}, [setNodes, setEdges]);

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onNodeContextMenu={onNodeContextMenu}
				// onConnect={onConnect}
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
			>
				<Panel position="top-center">
					<h1 className="text-purple-500 font-semibold text-3xl">
						Taskeasy Workflow
					</h1>
				</Panel>
				<Panel position="top-right">
					<button onClick={onSave}>Save</button>
					<button onClick={onRestore}>Restore</button>
				</Panel>
				<Controls />
				<MiniMap
					nodeStrokeWidth={3}
					zoomable
					pannable
					nodeColor={nodeColor}
					nodeComponent={({ x, y, color }) => (
						<circle cx={x || 0} cy={y || 0} r="50" fill={color} />
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
