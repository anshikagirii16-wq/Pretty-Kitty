/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star } from 'lucide-react';

interface ReviewItem {
  name: string;
  text: string;
  rating: number;
}

const REVIEWS_DATA: ReviewItem[] = [
  { name: 'Suman Shrestha', text: 'The bouquet is so beautiful and looks exactly like the photo! Perfect gift.', rating: 5 },
  { name: 'Priya Karki', text: 'Requested a custom bag and Anshika did a perfect job. Truly talented student entrepreneur!', rating: 5 },
  { name: 'Neha Gupta', text: 'Super fast delivery in KTM and the packaging was so cute. Highly recommend!', rating: 5 },
  { name: 'Aarav Joshi', text: 'Got a keychain for my sister, she loves it! The crochet details are incredible.', rating: 5 },
  { name: 'Ishani Thapa', text: 'Sweetest seller and even more beautiful products. Eternal flowers > real ones!', rating: 5 },
];

export const ReviewCarousel: React.FC = () => {
  // Duplicate reviews to facilitate infinite loop scrolling
  const doubleReviews = [...REVIEWS_DATA, ...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <div className="w-full overflow-hidden relative py-4">
      {/* Absolute gradient masks on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fff8f8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fff8f8] to-transparent z-10 pointer-events-none" />

      {/* Interactive horizontal scrolling ticker container */}
      <div className="flex gap-6 animate-scroll whitespace-nowrap hover:[animation-play-state:paused] flex-nowrap w-max py-2">
        {doubleReviews.map((rev, index) => (
          <div
            key={index}
            className="inline-block bg-white/40 backdrop-blur-md border border-white/40 p-5 rounded-2xl w-80 whitespace-normal shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-2 text-amber-400">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs text-gray-700 italic font-medium leading-relaxed mb-3">
              "{rev.text}"
            </p>

            {/* Name */}
            <span className="text-xs font-bold text-pink-600">
              — {rev.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
      `}</style>
    </div>
  );
};
