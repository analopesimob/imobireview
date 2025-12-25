import React from 'react';

interface EffectBackgroundProps {
  /** Cor base do fundo (default: bg-primary) */
  baseColor?: string;
}

const EffectBackground: React.FC<EffectBackgroundProps> = ({
  baseColor = '',
}) => {
  return (
    <div className={`absolute inset-0 ${baseColor} overflow-hidden`}>
      {/* Blobs de luz */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

      {/* Textura sutil */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    </div>
  );
};

export default EffectBackground;
