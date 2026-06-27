/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Sparkles, Calendar, Heart, Palette, UploadCloud, Info } from 'lucide-react';

interface CustomOrderFormProps {
  onSubmitInquiry: (inquiry: {
    category: string;
    description: string;
    colors: string[];
    quantity: number;
    deliveryDate: string;
    estimatedPrice: number;
    customerName: string;
    phone: string;
    instagram: string;
  }) => void;
}

const COLOR_BUBBLES = [
  { name: 'Soft Rose', hex: '#FFB1C6' },
  { name: 'Lilac Lavender', hex: '#D2BDF5' },
  { name: 'Sunny Yellow', hex: '#FBE36A' },
  { name: 'Mint Green', hex: '#A8E6CF' },
  { name: 'Ocean Blue', hex: '#C7F2FF' },
  { name: 'Cream Beige', hex: '#FFF0F2' },
];

const ITEM_ESTIMATES: Record<string, { basePrice: number; icon: string }> = {
  bouquet: { basePrice: 1500, icon: '💐' },
  single_flower: { basePrice: 250, icon: '🌸' },
  keychain: { basePrice: 400, icon: '🔑' },
  jewelry: { basePrice: 300, icon: '💎' },
  brooch: { basePrice: 250, icon: '⭐' },
  bag: { basePrice: 2000, icon: '👜' },
};

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({ onSubmitInquiry }) => {
  const [category, setCategory] = useState('bouquet');
  const [description, setDescription] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>(['Soft Rose']);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  
  // File upload simulation
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate dynamic price estimate
  const base = ITEM_ESTIMATES[category]?.basePrice || 500;
  const colorPremium = selectedColors.length > 2 ? (selectedColors.length - 2) * 100 : 0;
  const estimatedPrice = (base + colorPremium) * quantity;

  const handleColorToggle = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !description) return;

    onSubmitInquiry({
      category,
      description,
      colors: selectedColors,
      quantity,
      deliveryDate,
      estimatedPrice,
      customerName,
      phone,
      instagram,
    });

    setSuccess(true);
    // Reset Form
    setDescription('');
    setSelectedColors(['Soft Rose']);
    setQuantity(1);
    setDeliveryDate('');
    setUploadedFile(null);
  };

  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
      {success ? (
        <div className="text-center py-10 space-y-5 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-inner text-4xl">
            💝
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 font-display">Inquiry Sent, Lovely!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Anshika will review your custom crochet requirements and get in touch via Instagram or WhatsApp shortly to confirm the designs and colors!
            </p>
          </div>

          <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 max-w-sm mx-auto text-left space-y-2">
            <p className="text-xs text-gray-700"><strong>Customer:</strong> {customerName}</p>
            <p className="text-xs text-gray-700"><strong>Estimated Value:</strong> Rs. {estimatedPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-700"><strong>Product Category:</strong> {category.replace('_', ' ').toUpperCase()}</p>
          </div>

          <button
            onClick={() => {
              setSuccess(false);
              setCustomerName('');
              setPhone('');
              setInstagram('');
            }}
            className="px-6 py-2.5 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 text-xs transition-colors"
          >
            Create New Custom Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center md:text-left space-y-1.5">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
              Cozy Craft Wizard
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900">
              Customize Your Crochet Creation
            </h3>
            <p className="text-xs text-gray-500 font-body-md">
              Pick your colors, patterns, and item types. Anshika will handmade your dream item!
            </p>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Fields */}
            <div className="space-y-4">
              {/* Item Type */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  1. What would you like us to crochet?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(ITEM_ESTIMATES).map(([key, info]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        category === key
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white/60 text-gray-600 hover:border-pink-300'
                      }`}
                    >
                      <span className="text-lg">{info.icon}</span>
                      <span className="capitalize text-[10px]">{key.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-pink-500" /> 2. Pick Your Color Palette (Multi-select):
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_BUBBLES.map((bubble) => {
                    const isSelected = selectedColors.includes(bubble.name);
                    return (
                      <button
                        key={bubble.name}
                        type="button"
                        onClick={() => handleColorToggle(bubble.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500/10 text-pink-700'
                            : 'border-gray-200 bg-white/60 text-gray-600 hover:border-pink-200'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: bubble.hex }}
                        />
                        {bubble.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  3. Design Description & Specifications *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your flower combinations, initials, wrapper colors, cartoon character mascots, or any creative ideas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/60 focus:border-pink-400 outline-none resize-none"
                />
              </div>

              {/* Simulated File upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  4. Design Reference or Photo (Optional)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-pink-500 bg-pink-50'
                      : uploadedFile
                      ? 'border-green-400 bg-green-50/10'
                      : 'border-gray-300 bg-white/40 hover:border-pink-300'
                  }`}
                >
                  <label className="cursor-pointer flex flex-col items-center gap-1 text-xs">
                    <UploadCloud className={`w-8 h-8 ${uploadedFile ? 'text-green-500' : 'text-pink-400'}`} />
                    <span className="font-semibold text-gray-700 text-[11px]">
                      {uploadedFile ? `Uploaded: ${uploadedFile}` : 'Drag & Drop or click to upload references'}
                    </span>
                    <span className="text-[10px] text-gray-400">Supports PNG, JPG (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Fields: Contact & Estimator */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  5. Delivery & Contact Details
                </label>

                {/* Name */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Your Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reshma Thapa"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/60 focus:border-pink-400 outline-none"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Nepal Mobile Number *</span>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9841XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/60 focus:border-pink-400 outline-none"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Instagram Handle</span>
                  <input
                    type="text"
                    placeholder="e.g. @reshma_k (To easily share layout drafts)"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/60 focus:border-pink-400 outline-none"
                  />
                </div>

                {/* Delivery Date & Quantity */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-pink-500" /> Need By Date
                    </span>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white/60 focus:border-pink-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Quantity</span>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-white/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1.5 hover:bg-pink-100 text-gray-700 font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center font-bold text-xs text-gray-800">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1.5 hover:bg-pink-100 text-gray-700 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Estimation Card */}
              <div className="bg-pink-50/40 border border-pink-100 rounded-2xl p-4 mt-auto space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-pink-700">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold">Estimated Cost:</span>
                  </div>
                  <span className="text-lg font-black text-pink-700">
                    Rs. {estimatedPrice.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-2 text-[10px] text-gray-500 leading-relaxed">
                  <Info className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Handmade pricing varies slightly based on yarn choices and stitch density. We will lock in the final price over WhatsApp/Instagram prior to creating!
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-full text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Custom Design Inquiry
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
