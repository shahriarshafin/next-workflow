import Image from "next/image";
import GithubLogo from "../../public/github.png";
import { useState, useRef, useEffect } from "react";
const Trigger = () => {
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
		<div className="relative">
			<div
				ref={triggerRef}
				onClick={() => setOption(!option)}
				className="border hover:border-[1.5px] rounded-full shadow-lg"
			>
				<Image src={GithubLogo} style={{ objectFit: "contain" }} alt="" />
			</div>
			{option && (
				<div className="absolute z-10 top-5 left-24 bg-red-500">
					<h1>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint
						aliquid facere quam cum sapiente eaque iure velit dolor unde! Sed
						dolorum labore est blanditiis facere expedita, consectetur
						perferendis itaque.\
					</h1>
				</div>
			)}
		</div>
	);
};

export default Trigger;
