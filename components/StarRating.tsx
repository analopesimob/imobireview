import React, { useState } from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  mode?: 'display' | 'input';
  onRating?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, mode = 'input', onRating, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rate: number) => {
    if (mode === 'input' && onRating) {
      onRating(rate);
    }
  };

  const handleMouseOver = (rate: number) => {
    if (mode === 'input') {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (mode === 'input') {
      setHoverRating(0);
    }
  };
  
  const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
  }

  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverRating || rating) >= star;
        return (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseOver={() => handleMouseOver(star)}
            onMouseLeave={handleMouseLeave}
            disabled={mode === 'display'}
            className={`transition-transform duration-200 ${mode === 'input' ? 'cursor-pointer transform hover:scale-125' : 'cursor-default'}`}
            aria-label={`Rate ${star} stars`}
          >
            <StarIcon
              className={`${sizeClasses[size]} transition-colors duration-200 ${
                isFilled ? 'text-yellow-400' : 'text-gray-300'
              }`}
              filled={isFilled}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
