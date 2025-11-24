import React from 'react';

interface BubbleButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ 
    onClick, 
    children, 
    className = '',
    variant = 'primary'
}) => {
    return (
        <button 
            onClick={onClick}
            className={`relative px-8 py-3 font-bold rounded-lg transition-all duration-300 shadow-lg overflow-hidden group ${
                variant === 'primary' 
                    ? 'bg-accent text-white hover:shadow-xl' 
                    : 'bg-gray-200 text-primary hover:bg-gray-300'
            } ${className}`}
        >
            {/* Efeito de bolinhas flutuantes */}
            <span className="absolute inset-0 overflow-hidden pointer-events-none">
                <span className="bubble bubble-1"></span>
                <span className="bubble bubble-2"></span>
                <span className="bubble bubble-3"></span>
                <span className="bubble bubble-4"></span>
                <span className="bubble bubble-5"></span>
                <span className="bubble bubble-6"></span>
            </span>
            
            {/* Conteúdo do botão */}
            <span className="relative z-10">{children}</span>

            <style jsx>{`
                .bubble {
                    position: absolute;
                    bottom: -20px;
                    background: rgba(139, 210, 158);
                    border-radius: 50%;
                    animation: rise infinite ease-in-out;
                    opacity: 0;
                    pointer-events: none;
                }

                .bubble-1 {
                    width: 10px;
                    height: 10px;
                    left: 10%;
                    animation-delay: 0s;
                    animation-duration: 3.5s;
                }

                .bubble-2 {
                    width: 7px;
                    height: 7px;
                    left: 25%;
                    animation-delay: 0.8s;
                    animation-duration: 4.2s;
                }

                .bubble-3 {
                    width: 12px;
                    height: 12px;
                    left: 45%;
                    animation-delay: 1.5s;
                    animation-duration: 3.8s;
                }

                .bubble-4 {
                    width: 8px;
                    height: 8px;
                    left: 60%;
                    animation-delay: 0.3s;
                    animation-duration: 4.5s;
                }

                .bubble-5 {
                    width: 9px;
                    height: 9px;
                    left: 75%;
                    animation-delay: 1.2s;
                    animation-duration: 4s;
                }

                .bubble-6 {
                    width: 11px;
                    height: 11px;
                    left: 88%;
                    animation-delay: 2s;
                    animation-duration: 3.6s;
                }

                @keyframes rise {
                    0% {
                        bottom: -20px;
                        opacity: 0;
                        transform: translateX(0) scale(0.7);
                    }
                    15% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 0.5;
                        transform: translateX(8px) scale(1);
                    }
                    80% {
                        opacity: 0.3;
                    }
                    100% {
                        bottom: 110%;
                        opacity: 0;
                        transform: translateX(-8px) scale(0.5);
                    }
                }

                button:hover .bubble {
                    animation-play-state: running;
                }
            `}</style>
        </button>
    );
};

export default BubbleButton;