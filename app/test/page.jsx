'use client';
import React, { useCallback, useState, useRef, useEffect } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import Trigger from '@app/components/CustomComp';

const nodeColor = (node) => {
	switch (node.type) {
		case 'input':
			return '#6ede87';
		case 'output':
			return '#6865A5';
		default:
			return '#ff0072';
	}
};
const WorkflowActions = [
	{
		action: { id: 55, name: 'sent message' },
		app: { name: 'slack' },
	},
	{
		action: { id: 55, name: 'sent ssm' },
		app: { name: 'slack' },
	},
	{
		action: { id: 55, name: 'ejwkdhgkjc' },
		app: { name: 'slack' },
	},
	{
		action: { id: 55, name: 'cygsydtf' },
		app: { name: 'slack' },
	},
];

const initialNodes = [
	{
		id: '1',
		sourcePosition: 'right',
		type: 'input',
		label: 'ok',
		position: { x: 200, y: 300 },
	},
];

const initialEdges = [
	{
		id: 'e1-2',
		source: '1',
		target: '2',
		label: 'to the',
		// type: 'step',
		animated: true,
	},
];

const edgeOptions = {
	animated: true,
	style: {
		stroke: '#a854f7',
		strokeWidth: '2',
		strokeLinecap: 'round',
	},
};

function Flow() {
	const connectingNodeId = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	// const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	useEffect(() => {
		const newNodes = WorkflowActions.map((action, index) => ({
			id: String(index + 2),
			sourcePosition: 'right',
			targetPosition: 'left',
			data: {
				label: action.action.name,
			},
			position: { x: 200 + (index + 1) * 200, y: 300 },
		}));

		setNodes((prevNodes) => [...prevNodes, ...newNodes]);
	}, [setNodes]);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	let nodeIds = 1;
	const onConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId;
		console.log(nodeId);
		console.log(nodes);
		// .......
		// console.log(nodes);
		const id = `${++nodeIds}`;
		const newNode = {
			id,
			sourcePosition: 'right',
			targetPosition: 'left',
			data: {
				label: 'here',
			},
			position: {
				x: Math.random() * 500,
				y: Math.random() * 500,
			},
		};

		const newEdge = {
			id: `e${id}-2`,
			source: nodeId,
			target: id,
			label: 'to the',
			animated: true,
		};

		setNodes((prevNodes) => [...prevNodes, newNode]);
		setEdges((prevEdges) => [...prevEdges, newEdge]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// let nodeId = 1;

	const reactFlowInstance = useReactFlow();

	return (
		<div className='w-screen h-screen'>
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				// onConnectEnd={onConnectEnd}
				style={{ backgroundColor: '' }}
				defaultEdgeOptions={edgeOptions}
				connectionLineStyle={{ stroke: '#a854f7' }}
				// defaultViewport={{ x: 0, y: 0, zoom: 5 }}
				// nodeTypes={nodeTypes}
			>
				<Panel position='top-center'>
					<h1 className='text-purple-500 font-semibold text-3xl'>
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
						<circle cx={x} cy={y} r='50' fill={color} />
					)}
				/>
				<Background variant='dots' color='#e5e5e5' gap={12} size={1} />
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
