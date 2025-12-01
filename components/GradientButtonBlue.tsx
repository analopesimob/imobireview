import React from 'react';

interface GradientButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
	onClick, 
	children, 
	className = ''
}) => {
	return (
		<>
			<style dangerouslySetInnerHTML={{__html: `
				@keyframes gradientMove {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				.gradient-animated-btn {
					background: linear-gradient(
						135deg,
						#f3f4f5ff 0%,
						#bfd3ecff 25%,
						#88a1deff 50%,
						#b5d2dbff 75%,
						#f3f4f5ff 100%
					);
					background-size: 300% 300%;
					animation: gradientMove 4s ease-in-out infinite;
				}

				.gradient-animated-btn:hover {
					animation-duration: 2.5s;
					box-shadow: 0 10px 25px rgba(107, 168, 122, 0.3);
					transform: translateY(-2px);
				}

				.gradient-animated-btn:active {
					transform: translateY(0px);
				}
			`}} />
			
			<button 
				onClick={onClick}
				className={`gradient-animated-btn px-6 py-3 text-primary font-bold rounded-lg transition-all duration-300 inline-block ${className}`}
			>
				{children}
			</button>
		</>
	);
};

export default GradientButton;