import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";
import { AiFillSetting, AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";

const onEdgeClick = (evt, id) => {
	evt.stopPropagation();
	alert(`remove ${id}`);
};

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}) {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});
	const [btnClicked, setBtnClicked] = useState(false);

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
			<EdgeLabelRenderer>
				<div
					style={{
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
					}}
					className="nodrag nopan absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 top-5 z-10"
				>
					<button
						// onClick={(event) => onEdgeClick(event, id)}>
						onClick={() => setBtnClicked(!btnClicked)}
						className="p-2 text-slate-600 hover:text-slate-900 transition ease-in"
					>
						{!btnClicked && <AiFillSetting />}
					</button>
					{btnClicked && (
						<div className="bg-white pt-4 pb-2 shadow rounded border relative w-32 mt-15">
							<div
								className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-white border-4 cursor-pointer"
								onClick={() => setBtnClicked(!btnClicked)}
							>
								<AiFillCloseCircle className="text-slate-600 hover:text-slate-900 transition ease-in" />
							</div>
							<div className="grid grid-cols-1 divide-y !cursor-pointer">
								<div className="px-2 hover:bg-slate-100 transition ease-in">
									Add a note
								</div>
								<div className="px-2 hover:bg-slate-100 transition ease-in">
									Add a module
								</div>
								<div className="px-2 hover:bg-slate-100 transition ease-in">
									Add a router
								</div>
							</div>
						</div>
					)}
				</div>
			</EdgeLabelRenderer>
		</>
	);
}
