import Image from "next/image";
import GithubLogo from "../../public/github.png";
import { useState, useEffect, useRef } from "react";
const Trigger = () => {
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
			<div
				ref={actionRef}
				onClick={() => setOption(!option)}
				className="border hover:border-[1.5px] rounded-full shadow-lg"
			>
				<Image src={GithubLogo} height={100} width={100} alt="" />
			</div>
			{option && (
				<div className="absolute z-10 top-5 left-24 bg-red-500">
					<h1>Action here</h1>
				</div>
			)}
		</div>
	);
};

export default Trigger;
