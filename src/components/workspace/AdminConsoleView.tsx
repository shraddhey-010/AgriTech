import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Wheat,
  ShoppingBag,
  Package,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles
} from 'lucide-react';
import { Product, Order, OrderStatus, ProductCategory } from '../../types';

interface AdminConsoleViewProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateOrderStatus
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Seed');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('50kg bag');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !stock) return;
    onAddProduct({
      title: title.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      unit: unit.trim() || 'Unit',
      description: description.trim() || 'Certified agricultural input approved for optimal crop performance.'
    });
    setTitle('');
    setPrice('');
    setStock('');
    setDescription('');
    setSuccessMsg('Certified product added to catalog successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Admin Governance & Resource Control</span>
          </h2>
          <p className="text-xs text-slate-400">
            System administration, agricultural catalog provisioning, and order fulfillment pipeline
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
          Admin Access Active
        </span>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Platform Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Farmers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">128</div>
          <div className="text-[11px] text-emerald-400 mt-1">Active across 4 states</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Tracked Crops</span>
            <Wheat className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">340</div>
          <div className="text-[11px] text-slate-400 mt-1">Real-time soil logs</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{orders.length}</div>
          <div className="text-[11px] text-amber-400 mt-1">Resource orders</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Catalog Items</span>
            <Package className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{products.length}</div>
          <div className="text-[11px] text-purple-400 mt-1">Certified agri inputs</div>
        </div>
      </div>

      {/* Main Grid: Add Product & Manage Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Add Product Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">List Certified Agri Input Product</h3>
          </div>

          <form onSubmit={handleProductSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bio-Potash Granules 50kg"
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Seed">Seed</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pesticide">Pesticide</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Packaging Unit</label>
                <input
                  type="text"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. 50kg bag, 1L bottle"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Price (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="750"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Available Stock</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="100"
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Technical Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Composition, benefits, certified standard..."
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>List Certified Agri Product</span>
            </button>
          </form>
        </div>

        {/* Right 7 Cols: Order Fulfillment Pipeline */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Order Fulfillment Pipeline & Dispatch Control</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Transition orders between Processing, Shipped, Delivered, or Cancelled
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">{orders.length} Total</span>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Items & Amount</th>
                  <th className="py-2.5 px-3">Address</th>
                  <th className="py-2.5 px-3">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] font-bold text-white">
                      {o.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200">
                        {o.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-400">₹{o.totalAmount}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 truncate max-w-xs">{o.deliveryAddress}</td>
                    <td className="py-3 px-3">
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
