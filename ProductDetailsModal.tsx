/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../data';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggleIndex(i)}
              className="w-full p-4 md:p-5 flex justify-between items-center text-left hover:bg-white/20 transition-colors outline-none"
            >
              <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-pink-600' : ''
                }`}
              />
            </button>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: isOpen ? '200px' : '0px' }}
            >
              <div className="p-4 md:p-5 pt-0 text-xs text-gray-600 font-body-md leading-relaxed border-t border-dashed border-pink-100/40">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
