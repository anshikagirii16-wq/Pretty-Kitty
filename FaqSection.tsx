/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, CreditCard, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: { items: CartItem[]; total: number; id: string; deliveryDetails: any }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddOrder,
}) => {
  const [shippingLocation, setShippingLocation] = useState<'KTM' | 'Outside_KTM'>('KTM');
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'cod'>('cod');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; total: number } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = shippingLocation === 'KTM' ? 100 : 200;
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || !address) return;

    const orderId = `PK-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryDetails = {
      name: customerName,
      phone: phoneNumber,
      address,
      instagram: instagramHandle,
      location: shippingLocation,
      payment: paymentMethod,
    };

    onAddOrder({
      id: orderId,
      items: [...cart],
      total,
      deliveryDetails,
    });

    setLastOrderDetails({ id: orderId, total });
    setCheckoutStep('success');
    onClearCart();
    
    // Reset fields
    setCustomerName('');
    setPhoneNumber('');
    setAddress('');
    setInstagramHandle('');
  };

  const handleReset = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          id="cart-drawer-container"
          className="w-screen max-w-md bg-white/95 backdrop-blur-lg border-l border-pink-100 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-pink-100 flex items-center justify-between bg-pink-50/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-600" />
              <h2 className="text-lg font-bold text-gray-900">Your Craft Bag ({cart.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-pink-100 text-gray-500 hover:text-pink-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mx-auto text-pink-400">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">Your craft bag is empty</p>
                      <p className="text-xs text-gray-500">Pick up some cute handmade items!</p>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || ''}`}
                      className="flex gap-4 p-4 rounded-2xl bg-white border border-pink-100/40 shadow-sm relative group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-pink-50/20 border border-pink-100/10 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-800 line-clamp-1 pr-6">
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <span className="text-[10px] bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 font-medium">
                              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                              {item.selectedColor}
                            </span>
                          )}
                          {item.customNotes && (
                            <p className="text-[10px] text-pink-500 italic mt-1 line-clamp-1">
                              "{item.customNotes}"
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-pink-700">
                            Rs. {item.product.price.toLocaleString()}
                          </span>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-100 rounded-full bg-pink-50/20">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-1 hover:bg-pink-100 text-gray-600 rounded-l-full transition-colors font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-1 hover:bg-pink-100 text-gray-600 rounded-r-full transition-colors font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </>
            )}

            {checkoutStep === 'details' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Delivery Details (Nepal)
                </h3>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reshma Thapa"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-pink-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9841XXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-pink-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Instagram / Tiktok Handle</label>
                  <input
                    type="text"
                    placeholder="e.g. @reshma_crochets (to verify your order)"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-pink-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase">Detailed Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. New Baneshwor, Kathmandu (Near Civil Hospital)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-pink-400 outline-none resize-none"
                  />
                </div>

                {/* Delivery Location Selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-gray-600 uppercase block">Delivery Zone</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setShippingLocation('KTM')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        shippingLocation === 'KTM'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-pink-600" />
                      <span>Inside KTM Valley</span>
                      <span className="text-[10px] text-gray-500 font-normal">Rs. 100 • 1-3 days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingLocation('Outside_KTM')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        shippingLocation === 'Outside_KTM'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-purple-600" />
                      <span>Outside Kathmandu</span>
                      <span className="text-[10px] text-gray-500 font-normal">Rs. 200 • 3-7 days</span>
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-gray-600 uppercase block">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-600" />
                      <span>Cash on Delivery</span>
                      <span className="text-[10px] text-gray-500 font-normal">KTM Valley Only</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('esewa')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'esewa'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span>eSewa / Fonepay</span>
                      <span className="text-[10px] text-gray-500 font-normal">QR Code Transfer</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'esewa' && (
                  <div className="p-3 bg-pink-50/50 border border-dashed border-pink-200 rounded-xl space-y-2 text-center text-xs">
                    <p className="font-semibold text-pink-700 flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Fonepay / eSewa Merchant QR
                    </p>
                    <div className="w-28 h-28 bg-white mx-auto border border-pink-100 flex items-center justify-center relative rounded-lg p-1.5 shadow-sm">
                      {/* Interactive mock QR */}
                      <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-pink-900 opacity-90 rounded flex flex-col items-center justify-center text-[10px] text-white">
                        <span>Pretty Kitty QR</span>
                        <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-[8px] font-bold mt-1">PK</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      Kindly scan the QR to transfer <b>Rs. {total.toLocaleString()}</b> and proceed. We'll verify instantly!
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-full text-sm hover:shadow-lg transition-all mt-4"
                >
                  Place Handmade Order • Rs. {total.toLocaleString()}
                </button>
              </form>
            )}

            {checkoutStep === 'success' && lastOrderDetails && (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  🌸
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Order Placed, Lovely!</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Anshika has received your request and is ready to stitch up your custom goodies!
                  </p>
                </div>

                <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 text-left space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Order Reference:</span>
                    <span className="font-mono font-bold text-gray-800">{lastOrderDetails.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Total Charged:</span>
                    <span className="font-bold text-pink-700">Rs. {lastOrderDetails.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Status:</span>
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-bold text-[9px] uppercase">
                      Pending Stitching
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-500 pt-1.5 border-t border-pink-100/40 text-center italic">
                    We will ping you on your phone or Instagram to confirm shipping details.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-full text-xs transition-all"
                >
                  Keep Browsing Cute Finds
                </button>
              </div>
            )}
          </div>

          {/* Pricing Breakdown & Next Button (Only in 'cart' step and if items exist) */}
          {checkoutStep === 'cart' && cart.length > 0 && (
            <div className="p-5 border-t border-pink-100 bg-white space-y-4">
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Delivery (Nepal):</span>
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                    <select
                      value={shippingLocation}
                      onChange={(e) => setShippingLocation(e.target.value as 'KTM' | 'Outside_KTM')}
                      className="text-[11px] p-0.5 border border-pink-200 rounded outline-none"
                    >
                      <option value="KTM">KTM Valley (Rs. 100)</option>
                      <option value="Outside_KTM">Outside KTM (Rs. 200)</option>
                    </select>
                  </div>
                </div>
                <div className="h-px bg-pink-50" />
                <div className="flex justify-between text-sm font-bold text-gray-900">
                  <span>Estimated Total:</span>
                  <span className="text-pink-700">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={handleNextStep}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-full text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
