import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  MapPin,
  Tag
} from 'lucide-react';
import { Product, Order, ProductCategory, OrderItem } from '../../types';

interface MarketplaceViewProps {
  products: Product[];
  orders: Order[];
  onPlaceOrder: (items: OrderItem[], deliveryAddress: string) => void;
  farmerAddress: string;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  orders,
  onPlaceOrder,
  farmerAddress
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [address, setAddress] = useState(
    farmerAddress || 'Village Dindori, Plot #12, Near Gram Panchayat, Nashik, PIN: 422202'
  );
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Seed',
    'Fertilizer',
    'Pesticide',
    'Equipment'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[productId]) return copy;
      if (copy[productId] === 1) {
        delete copy[productId];
      } else {
        copy[productId] -= 1;
      }
      return copy;
    });
  };

  const clearItemFromCart = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const cartItemsList: OrderItem[] = Object.entries(cart)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return null;
      return {
        productId,
        title: product.title,
        quantity: qty,
        price: product.price
      };
    })
    .filter(Boolean) as OrderItem[];

  const cartTotal = cartItemsList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItemsList.length === 0) return;
    if (!address.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    onPlaceOrder(cartItemsList, address.trim());
    setCart({});
    setOrderSuccessMsg('Order placed successfully! Order status set to Processing.');
    setTimeout(() => setOrderSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <span>Certified Agricultural Resources Marketplace</span>
          </h2>
          <p className="text-xs text-slate-400">
            High-yield certified seeds, balanced bio-fertilizers, IPM biologicals & micro-irrigation gear
          </p>
        </div>
      </div>

      {orderSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{orderSuccessMsg}</span>
        </div>
      )}

      {/* Categories & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search certified inputs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Main Grid: Products Catalog & Cart Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Product Catalog */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((p) => {
            const inCartQty = cart[p.id] || 0;
            return (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                      {p.category}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold flex items-center space-x-1">
                      <span>★</span>
                      <span>{p.rating || 4.8}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-emerald-400">
                      ₹{p.price}{' '}
                      <span className="text-[11px] font-normal text-slate-400">/{p.unit}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Stock: {p.stock} units</div>
                  </div>

                  {inCartQty > 0 ? (
                    <div className="flex items-center space-x-2 bg-slate-800 rounded-xl p-1 border border-slate-700">
                      <button
                        onClick={() => removeFromCart(p.id)}
                        className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs text-white px-1">{inCartQty}</span>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p.id)}
                      disabled={p.stock <= 0}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 4 Cols: Cart & Checkout Section */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Checkout Cart</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {cartItemsList.length} Items
            </span>
          </div>

          {cartItemsList.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <ShoppingCart className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p>Your agricultural cart is empty.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Select inputs on the left to order.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {cartItemsList.map((item) => (
                  <div
                    key={item.productId}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400">
                        {item.quantity} x ₹{item.price}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-emerald-400">
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => clearItemFromCart(item.productId)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Farm Delivery Address</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  placeholder="Village, PIN, Land parcel..."
                />
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-200">₹{cartTotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Subsidized Agritech Delivery</span>
                  <span className="font-bold text-emerald-400">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-white pt-1">
                  <span>Total Payable</span>
                  <span className="text-emerald-400">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Order (Cash on Delivery / UPI)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* My Orders & Tracking Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>My Orders & Real-Time Tracking</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Fulfillment pipeline from certified seed banks & bio-warehouses
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">{orders.length} Placed</span>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Items Ordered</th>
                <th className="py-2.5 px-3">Total Amount</th>
                <th className="py-2.5 px-3">Delivery Address</th>
                <th className="py-2.5 px-3">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {orders.map((o) => {
                const isDelivered = o.status === 'Delivered';
                const isShipped = o.status === 'Shipped';
                return (
                  <tr key={o.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] font-bold text-emerald-300">
                      {o.id}
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      {o.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="py-3 px-3 font-bold text-white">₹{o.totalAmount}</td>
                    <td className="py-3 px-3 text-slate-400 truncate max-w-xs">{o.deliveryAddress}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 w-fit ${
                          isDelivered
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : isShipped
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isDelivered ? 'bg-emerald-400' : isShipped ? 'bg-cyan-400' : 'bg-amber-400'
                          }`}
                        ></span>
                        <span>{o.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
