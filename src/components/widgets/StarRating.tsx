'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void
}

export function StarRating({ rating, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`transition-all duration-100 ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          onClick={() => {
            onChange(star)
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          aria-label={`Rate ${star} stars`}
        >
          <Star className="w-8 h-8 fill-current" />
        </button>
      ))}
    </div>
  )
}