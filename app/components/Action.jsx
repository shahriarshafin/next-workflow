import Image from "next/image";
import GithubLogo from "../../public/github.png";
import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

const Action = ({ data, isConnectable }) => {
	const [option, setOption] = useState(false);
	const actionRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (actionRef.current && !actionRef.current.contains(event.target)) {
				setOption(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative">
			<Handle
				type="target"
				position={Position.Left}
				className="!pointer-events-none"
				isConnectable={isConnectable}
			/>
			<div
				ref={actionRef}
				onClick={() => setOption(!option)}
				className="rounded-full shadow-lg cursor-pointer"
			>
				<Image
					src={GithubLogo}
					alt="githubLogo"
					className="bg-white rounded-full"
				/>
			</div>
			<Handle
				type="source"
				position={Position.Right}
				isConnectable={isConnectable}
				className="text-white text-center"
			>
				+
			</Handle>
			<div className="absolute flex flex-col justify-center items-center w-full mt-3 pointer-events-none">
				<p className="text-lg font-medium text-slate-800">Github</p>
				<p className="text-xs w-24 text-slate-500">Update a Record</p>
			</div>
			{option && (
				<div className="absolute z-10 top-5 left-24 bg-red-500">
					<h1>Action here</h1>
				</div>
			)}
		</div>
	);
};

export default Action;
