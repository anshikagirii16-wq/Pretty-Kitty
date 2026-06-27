/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100/40 flex flex-col h-full cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-pink-50/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Wishlist Button (absolute top right) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/70 text-pink-500 hover:bg-white hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm ${
              product.stockStatus === 'In Stock'
                ? 'bg-green-500/80 text-white'
                : product.stockStatus === 'Low Stock'
                ? 'bg-amber-500/80 text-white'
                : 'bg-pink-600/80 text-white'
            }`}
          >
            {product.stockStatus}
          </span>
          {product.isCustomizable && (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-100/90 text-pink-700 uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-2.5 h-2.5" /> Customized
            </span>
          )}
        </div>

        {/* Hover Action Overlays */}
        <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 rounded-full bg-white text-pink-600 shadow-md hover:bg-pink-50 hover:text-pink-700 transition-transform hover:scale-105 active:scale-95 duration-200"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-3 rounded-full bg-pink-600 text-white shadow-md hover:bg-pink-700 transition-transform hover:scale-105 active:scale-95 duration-200"
            title="Add to Bag"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-2 bg-white/20">
        <div className="space-y-1">
          {/* Category */}
          <span className="text-[11px] font-medium text-pink-600/80 uppercase tracking-widest block">
            {product.category.replace('-', ' ')}
          </span>
          {/* Name */}
          <h4 className="font-display font-semibold text-gray-800 text-base line-clamp-2 group-hover:text-pink-700 transition-colors">
            {product.name}
          </h4>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-pink-100/20">
          {/* Price */}
          <span className="text-lg font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
            <span>★</span>
            <span className="text-gray-800">{product.rating.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
