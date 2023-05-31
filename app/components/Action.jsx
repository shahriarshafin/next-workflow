import Image from 'next/image';
import GithubLogo from '../../public/github.png';
import { useState } from 'react';
const Trigger = () => {
	const [option, setOption] = useState(false);

	return (
		<div className='relative'>
			<div
				onClick={() => setOption(!option)}
				className='border hover:border-[2px] rounded-full shadow-lg'
			>
				<Image src={GithubLogo} height={100} width={100} alt='' />
			</div>
			{option && (
				<div className='absolute z-10 top-5 left-24 bg-red-500'>
					<h1>Action here</h1>
				</div>
			)}
		</div>
	);
};

export default Trigger;
