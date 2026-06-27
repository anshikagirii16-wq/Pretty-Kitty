/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  Search,
  Sparkles,
  Instagram,
  Compass,
  Smile,
  CheckCircle,
  Clock,
  ArrowRight,
  Gift,
  HelpCircle,
  User,
} from 'lucide-react';
import { Product, Review, CartItem, CustomOrderRequest } from './types';
import { PRODUCTS, CATEGORIES, INITIAL_REVIEWS } from './data';
import { ShaderBackground } from './components/ShaderBackground';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomOrderForm } from './components/CustomOrderForm';
import { ReviewCarousel } from './components/ReviewCarousel';
import { FaqSection } from './components/FaqSection';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<'shop' | 'custom' | 'about' | 'wishlist' | 'orders'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Storage states (saved to localStorage for persistent durability)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('pk_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<any[]>(() => {
    const saved = localStorage.getItem('pk_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [customInquiries, setCustomInquiries] = useState<any[]>(() => {
    const saved = localStorage.getItem('pk_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pk_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('pk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pk_inquiries', JSON.stringify(customInquiries));
  }, [customInquiries]);

  // Notifications helper
  const triggerNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, selectedColor?: string, customNotes?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevCart, { product, quantity, selectedColor, customNotes }];
    });

    triggerNotification(`🌸 Added ${product.name} to craft bag!`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerNotification('🗑️ Item removed from craft bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlready = prevWishlist.some((item) => item.id === product.id);
      if (isAlready) {
        triggerNotification('🤍 Removed from your favorites');
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        triggerNotification('💖 Added to your favorites!');
        return [...prevWishlist, product];
      }
    });
  };

  // Review Handlers
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const formattedReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [formattedReview, ...prev]);
    triggerNotification('✨ Thank you for leaving a review!');
  };

  // Order Handlers
  const handleAddOrder = (order: { items: CartItem[]; total: number; id: string; deliveryDetails: any }) => {
    setOrders((prev) => [order, ...prev]);
    setActiveTab('orders');
    triggerNotification('🎉 Order placed successfully! Thank you!');
  };

  // Custom Inquiry Handler
  const handleAddCustomInquiry = (inquiry: any) => {
    setCustomInquiries((prev) => [inquiry, ...prev]);
    triggerNotification('💝 Custom inquiry submitted to Anshika!');
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative font-body-md text-gray-800 selection:bg-pink-200 selection:text-pink-900 pb-24 md:pb-12">
      {/* WebGL animated background blobs */}
      <ShaderBackground />

      {/* Atmospheric icons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <span className="absolute text-pink-300/10 text-9xl animate-pulse top-1/4 left-10">🌸</span>
        <span className="absolute text-purple-300/10 text-[120px] animate-bounce top-2/3 right-12" style={{ animationDuration: '8s' }}>✨</span>
        <span className="absolute text-amber-200/15 text-8xl top-10 right-1/4">🌻</span>
      </div>

      {/* Floating Notifications */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-md border-l-4 border-pink-500 px-4 py-3 rounded-r-xl shadow-lg shadow-pink-100/40 text-xs font-semibold text-gray-800 flex items-center justify-between animate-fade-in-up"
          >
            <span>{notif}</span>
          </div>
        ))}
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 w-full z-40 bg-[#fff8f8]/50 backdrop-blur-md border-b border-white/30 shadow-[0_4px_30px_rgba(255,143,177,0.06)] transition-all">
        <div className="flex justify-between items-center px-4 md:px-8 py-3.5 max-w-7xl mx-auto">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('shop')}>
            <span className="text-2xl">🌸</span>
            <div>
              <h1 className="font-display font-extrabold text-lg md:text-xl text-pink-700 tracking-tight leading-none">
                Pretty Kitty
              </h1>
              <span className="text-[9px] font-bold text-pink-500/80 uppercase tracking-widest block mt-0.5">
                Handmade Kathmandu
              </span>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveTab('shop')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'shop' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Compass className="w-4 h-4" /> Browse Shop
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'custom' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Gift className="w-4 h-4" /> Custom Design
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'about' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Smile className="w-4 h-4" /> Meet Anshika
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'wishlist' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Heart className="w-4 h-4" /> Favorites ({wishlist.length})
            </button>
            {orders.length > 0 && (
              <button
                onClick={() => setActiveTab('orders')}
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'orders' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                <Clock className="w-4 h-4" /> My Orders ({orders.length})
              </button>
            )}
          </nav>

          {/* Cart Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              id="cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-all hover:scale-105 active:scale-95 shadow-inner"
              title="View craft bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-md animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* VIEW: Shop Catalog */}
        {activeTab === 'shop' && (
          <>
            {/* Hero Banner Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/40 shadow-xl overflow-hidden relative">
              <div className="space-y-6 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-pink-100/70 border border-pink-200/50 px-3 py-1.5 rounded-full text-xs font-bold text-pink-700 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Handcrafted in Kathmandu
                </div>
                <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 leading-tight">
                  Your cozy corner for <span className="text-pink-600 underline decoration-pink-300 decoration-wavy">cute finds.</span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-body-md max-w-lg">
                  Handcrafted with love by Anshika. Discover a whimsical world of handmade crochet flowers, bespoke jewelry, and unique everlasting gifts designed to bring warmth to your home.
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => {
                      const el = document.getElementById('shop-section-anchor');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold tracking-wider hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95"
                  >
                    Explore Handcrafted Catalog
                  </button>
                  <button
                    onClick={() => setActiveTab('custom')}
                    className="px-8 py-3.5 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs font-bold tracking-wider hover:bg-pink-50/50 transition-all active:scale-95"
                  >
                    Custom Designs Wizard
                  </button>
                </div>
              </div>

              {/* Showcase Image with Floating elements */}
              <div className="relative flex justify-center items-center">
                <div className="absolute w-72 h-72 bg-pink-300/20 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="relative max-w-md w-full">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDpDaPtwH_-XgmocpbC2TRjoQzzDG00zog44VCde83AFXfSVDoIUdV33OlUfjmVb5RPnonH7Te_ZYNFrjcN6hL40p3XhwzZnykK5etoXtt67YLFiXw4BfrmAR70AdkGMSN9K-bLPo8m9dFBgpZj7bxBTf2-JM2kEZfni_i_czYbA-wTwd8DYsOyT5KIaxEW-0c-DX6u2af7GKATtahyQQd1k4_Cu-IvD-kVrr25nxnY9smwV4FlSu_c9DMjTWrZMqQ0rPlWRfvEos"
                    alt="Stunning Crochet Bouquet"
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-3xl"
                  />
                  {/* Small floating tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-pink-100 flex items-center gap-2">
                    <span className="text-xl">💐</span>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-gray-800">Eternal Roses</p>
                      <p className="text-[8px] text-pink-600 font-extrabold">Rs. 1,800</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shop Categories Grid & Search Anchor */}
            <div id="shop-section-anchor" className="space-y-6 pt-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                    Our Hand-knit Collections
                  </span>
                  <h3 className="text-2xl font-bold font-display text-gray-900">
                    Browse Categories
                  </h3>
                </div>

                {/* Quick Search Input */}
                <div className="relative w-full md:max-w-xs">
                  <input
                    type="text"
                    placeholder="Search cute keychains, tulips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs px-4 py-2.5 pl-9 rounded-full border border-pink-100 bg-white/70 focus:border-pink-400 focus:ring focus:ring-pink-100 outline-none transition-all shadow-inner"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Category Bubbles Scroll list */}
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap active:scale-95 ${
                      selectedCategory === cat.id
                        ? 'bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-200'
                        : 'bg-white/60 border-pink-100/40 text-gray-700 hover:border-pink-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Products Results Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-3xl border border-pink-100/40">
                  <p className="text-sm text-gray-500 font-semibold">No cozy items found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-pink-600 font-bold hover:underline mt-2"
                  >
                    Clear Filter Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={(p) => setSelectedProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      isWishlisted={wishlist.some((w) => w.id === prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Why Choose Us Features row */}
            <section className="bg-white/30 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-lg mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 space-y-2">
                  <span className="text-3xl">🧶</span>
                  <h4 className="font-bold text-gray-800 text-sm">100% Hand-Stitched</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Every flower petal and tiny loop is woven with extreme patience and premium cotton wool.
                  </p>
                </div>
                <div className="p-4 space-y-2 border-y md:border-y-0 md:border-x border-pink-100/40">
                  <span className="text-3xl">💝</span>
                  <h4 className="font-bold text-gray-800 text-sm">Eternal Keepsake</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Unlike standard flowers that wither away, crochet items stay colorful and blooming forever.
                  </p>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-3xl">🏡</span>
                  <h4 className="font-bold text-gray-800 text-sm">Kathmandu Boutique</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Locally crafted by a student entrepreneur. We deliver cute parcels across KTM and rest of Nepal!
                  </p>
                </div>
              </div>
            </section>

            {/* Scroll Reviews and FAQ Block */}
            <section className="space-y-6 pt-6">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                  Loved by Kitty Friends
                </span>
                <h3 className="text-2xl font-bold font-display text-gray-900">
                  Customer Happiness Stories
                </h3>
              </div>
              <ReviewCarousel />
            </section>

            {/* Collapsible FAQ list */}
            <section className="space-y-6 pt-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                  Learn More About Us
                </span>
                <h3 className="text-2xl font-bold font-display text-gray-900">
                  Frequently Asked Questions
                </h3>
              </div>
              <FaqSection />
            </section>
          </>
        )}

        {/* VIEW: Custom Order Request */}
        {activeTab === 'custom' && (
          <div className="max-w-4xl mx-auto">
            <CustomOrderForm onSubmitInquiry={handleAddCustomInquiry} />
          </div>
        )}

        {/* VIEW: Meet Anshika (Founder Profile Page) */}
        {activeTab === 'about' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            {/* Banner block */}
            <section className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/40 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Meet the Maker 🌸
                </div>
                <h2 className="text-3xl font-bold font-display text-gray-900 leading-tight">
                  Hi Lovelies! I'm Anshika.
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-body-md">
                  Welcome to <strong>Pretty Kitty</strong>! I am a student entrepreneur based in Kathmandu who turned an absolute passion for crochet knitting into a little dream shop of wonders.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed font-body-md">
                  What started as an offline hobby in my college dorm has blossomed into a beautiful way for me to share handcrafted warmth, cute keepsakes, and personalized charms with all of you across Nepal.
                </p>

                {/* Social Badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://instagram.com/prettykitty.888"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
                  >
                    <Instagram className="w-4 h-4" /> Follow @prettykitty.888
                  </a>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-pink-100 text-pink-600 text-xs font-semibold">
                    📞 WhatsApp Support: Kathmandu
                  </span>
                </div>
              </div>

              {/* Creator image and crafting grid */}
              <div className="space-y-4">
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-pink-200/50 shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeRD2CfQw1E9t9JbjzH7L9xS8RIhm9qOgyHyCkwgrzzhjQIXwuLW7EdIE-lI_nyALZ1NbV87trHRVakmO2kNiH01ut2SxqxUhT92QxfnW5smdQk5UzcB9es9a1Du3ag6SEv5iETG38VzvCQMooVA4edtZAN_Gqj-JNqkXjqAIZtAzMtjjH9YXFxgALa_F8wHno2kk7q5G_UoXFjqTNQdv1uAWWXQgGceBOPuKYu8IIA3aCv1ucAN0ZTKB_4RxWu_TRphK1njg7JkQ"
                    alt="Anshika Founder Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Secondary collage of making flowers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-pink-50">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuJxE_LVCG9u9P4GBd42MpnQ4fvfCM3u9e3zCytoIUrFlBa2UW5QlIewo0BNbtF-vz5EA44r93yze-v7U2lxdJ-z7Ti7Ebl91gCEF3XNoMvm__EdZpL38RxiP-sIcqfvcPtymHqpUKKGRXDY_ZES5WrqFgpzwSIeQWQr20e8FeZQS5EaZTvhLEaLvpVMFHDVlnyKIzXO3b1WI80OSHCEe5CHdXv70kIgwK0K4QOvXdvcoG9Yfo5GrFyGfe5N_c5T7mGJeS50xl68o"
                      alt="Hands Crocheting yarn"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-100/30 flex flex-col justify-center space-y-1">
                    <p className="text-xl">🌸</p>
                    <p className="text-xs font-bold text-gray-800">Made With Care</p>
                    <p className="text-[10px] text-gray-500">Every single stitch takes love and dedicated time.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: Wishlist Favorites */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                Saved Items
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900">
                Your Handmade Favorites
              </h2>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-white/30 backdrop-blur-sm rounded-3xl border border-pink-100/40 space-y-4 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto text-2xl">
                  🤍
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">Your wishlist is empty</p>
                  <p className="text-xs text-gray-500">Tap the heart on any product to save it here!</p>
                </div>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-5 py-2 rounded-full bg-pink-600 text-white text-xs font-semibold"
                >
                  Browse Shop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {wishlist.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    isWishlisted={true}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: Virtual Orders Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-1 text-center">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">
                Order Tracking
              </span>
              <h2 className="text-2xl font-bold font-display text-gray-900">
                My Stitching Order History
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white/30 backdrop-blur-sm rounded-3xl border border-pink-100/40">
                <p className="text-sm text-gray-500">No active orders found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white/50 backdrop-blur-md border border-pink-100 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100/40 pb-3">
                      <div>
                        <span className="text-xs text-gray-500 font-semibold block">Order Reference ID:</span>
                        <span className="text-sm font-mono font-bold text-gray-900">{ord.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Stitching Progress:</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" /> Pending Stitching
                        </span>
                      </div>
                    </div>

                    {/* Ordered items */}
                    <div className="space-y-2">
                      {ord.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-pink-600">{item.quantity}x</span>
                            <span className="text-gray-800">{item.product.name}</span>
                            {item.selectedColor && (
                              <span className="text-[10px] text-gray-400">({item.selectedColor})</span>
                            )}
                          </div>
                          <span className="font-semibold text-gray-900">
                            Rs. {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Cost Summary */}
                    <div className="flex justify-between items-center text-xs font-bold pt-3 border-t border-pink-100/40">
                      <span className="text-gray-500">Total Transferred / Payable:</span>
                      <span className="text-sm text-pink-700">Rs. {ord.total.toLocaleString()}</span>
                    </div>

                    <div className="p-3 bg-pink-50/40 rounded-xl border border-pink-100/20 text-[10px] text-gray-500 leading-relaxed">
                      🎁 <strong>Note from Anshika:</strong> Lovely, we have received your order request! We are selecting the wool threads right now and will ping you on <strong>{ord.deliveryDetails.phone}</strong> when we start the crochet loops!
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Branding Panel */}
      <footer className="w-full bg-[#fff8f8]/60 backdrop-blur-md border-t border-pink-100/40 py-12 text-center space-y-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-display text-pink-700">Pretty Kitty</h2>
            <p className="text-xs text-gray-500 italic flex items-center justify-center gap-1.5">
              💓 Handmade with extreme love inside Kathmandu Valley, Nepal
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-600">
            <a
              href="https://instagram.com/prettykitty.888"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600 flex items-center gap-1"
            >
              <Instagram className="w-4 h-4" /> Instagram Portfolio
            </a>
            <span className="text-pink-200">|</span>
            <span className="text-gray-500">⏰ Crafting hours: 10:00 AM - 6:00 PM</span>
          </div>

          <p className="text-[10px] text-gray-400">
            © 2026 Pretty Kitty Nepal. Custom Stitching Boutique. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation (Matches provided mockup design) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-5 pt-2 bg-white/70 backdrop-blur-md border-t border-pink-100/30 shadow-lg md:hidden z-40">
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all ${
            activeTab === 'shop'
              ? 'bg-pink-100 text-pink-700'
              : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5">Shop</span>
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all ${
            activeTab === 'custom'
              ? 'bg-pink-100 text-pink-700'
              : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5">Custom</span>
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all relative ${
            activeTab === 'wishlist'
              ? 'bg-pink-100 text-pink-700'
              : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-0.5 right-3.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          )}
          <span className="text-[9px] font-bold mt-0.5">Favorites</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all ${
            activeTab === 'about'
              ? 'bg-pink-100 text-pink-700'
              : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5">About</span>
        </button>
      </nav>

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onAddOrder={handleAddOrder}
      />

      {/* Product Details Modal Component */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
}
