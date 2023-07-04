import Image from "next/image";
import GithubLogo from "../../public/github.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";
const Trigger = ({ data, isConnectable }) => {
	const [option, setOption] = useState(false);
	const triggerRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (triggerRef.current && !triggerRef.current.contains(event.target)) {
				setOption(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div ref={triggerRef} className="relative">
			<div
				onClick={() => setOption(!option)}
				className="rounded-full shadow-lg cursor-pointer"
			>
				<Image
					src={GithubLogo}
					alt="githubLogo"
					className="bg-white rounded-full flex justify-center items-center"
				/>
			</div>
			<Handle
				type="input"
				position={Position.Right}
				isConnectable={isConnectable}
				className="text-white text-center"
			>
				+
			</Handle>
			<div className="absolute flex flex-col justify-center items-center w-full mt-3 pointer-events-none">
				<p className="text-lg font-medium">Github</p>
				<p className="text-xs w-24 text-slate-500">Update a Record</p>
			</div>
			{option && (
				<div className="absolute z-10 top-5 left-24 bg-red-500">
					<h1>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint
						aliquid facere quam cum sapiente eaque iure velit dolor unde! Sed
						dolorum labore est blanditiis facere expedita, consectetur
						perferendis itaque.
					</h1>
				</div>
			)}
		</div>
	);
};

export default Trigger;
