import React from 'react';

const HelmetSvg = ({ fillColor }) => {
	const printDarkColor = (color) => {
		const colorList = [
			{ colorName: 'yellow', darkColor: '#d9d913' },
			{ colorName: 'white', darkColor: '#d3d3d3' },
		];
		const found = colorList.find((c) => c.colorName == color);
		return found ? found?.darkColor : 'dark' + color;
	};
	return (
		<div style={{ display: 'block', height: 'auto', width: 50 }}>
			{fillColor && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="100%"
					width="100%"
					version="1.1"
					id="Layer_1"
					viewBox="0 0 512 512"
					style={{ display: 'block' }}
				>
					<path
						stroke="black"
						fill={fillColor}
						d="M493.714,374.857c-10.057,0-18.286-8.229-18.286-18.286v-32c0-98.743-65.829-186.514-155.429-214.857  V99.657c0-9.143-8.229-17.371-17.371-17.371h-93.257c-9.143,0-17.371,8.229-17.371,17.371v10.057  C102.4,137.143,36.571,221.257,36.571,320v36.571c0,10.057-8.229,18.286-18.286,18.286H0v54.857h512v-54.857H493.714z"
					></path>
					<g>
						<path
							fill={printDarkColor(fillColor)}
							d="M411.429,384H100.571c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h310.857   c5.486,0,9.143,3.657,9.143,9.143S416.914,384,411.429,384"
						></path>
						<path
							fill={printDarkColor(fillColor)}
							d="M320,164.571c-5.486,0-9.143-3.657-9.143-9.143v-36.571c0-5.486,3.657-9.143,9.143-9.143   c5.486,0,9.143,3.657,9.143,9.143v36.571C329.143,160.914,325.486,164.571,320,164.571"
						></path>
						<path
							fill={printDarkColor(fillColor)}
							d="M192,164.571c-5.486,0-9.143-3.657-9.143-9.143v-36.571c0-5.486,3.657-9.143,9.143-9.143   s9.143,3.657,9.143,9.143v36.571C201.143,160.914,197.486,164.571,192,164.571"
						></path>
						<path
							fill={printDarkColor(fillColor)}
							d="M256,210.286c-5.486,0-9.143-3.657-9.143-9.143V91.429c0-5.486,3.657-9.143,9.143-9.143   c5.486,0,9.143,3.657,9.143,9.143v109.714C265.143,205.714,261.486,210.286,256,210.286"
						></path>
						<path
							fill={printDarkColor(fillColor)}
							d="M372.114,135.314l-33.829,102.4l101.486-33.829l0,0C422.4,176.457,399.543,152.686,372.114,135.314   L372.114,135.314z"
						></path>
						<path
							fill={printDarkColor(fillColor)}
							d="M139.886,135.314l33.829,102.4L72.229,203.886l0,0C89.6,176.457,112.457,152.686,139.886,135.314   L139.886,135.314z"
						></path>
					</g>
				</svg>
			)}
		</div>
	);
};

export default HelmetSvg;
