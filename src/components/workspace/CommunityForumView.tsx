import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  User,
  Plus,
  HelpCircle,
  Tag,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { ForumPost, User as UserType } from '../../types';

interface CommunityForumViewProps {
  posts: ForumPost[];
  currentUser: UserType;
  onCreatePost: (title: string, content: string, category: ForumPost['category']) => void;
  onAddReply: (postId: string, message: string) => void;
}

export const CommunityForumView: React.FC<CommunityForumViewProps> = ({
  posts,
  currentUser,
  onCreatePost,
  onAddReply
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ForumPost['category']>('Pest Control');
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: string }>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories: (ForumPost['category'] | 'All')[] = [
    'All',
    'Pest Control',
    'Soil Health',
    'Crop Advisory',
    'Subsidies',
    'Market Prices'
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onCreatePost(title.trim(), content.trim(), category);
    setTitle('');
    setContent('');
  };

  const handleSendReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;
    onAddReply(postId, text.trim());
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Expert Consultation & Farmer Community</span>
          </h2>
          <p className="text-xs text-slate-400">
            Ask verified agronomists, share crop symptoms, and collaborate across farming regions
          </p>
        </div>
      </div>

      {/* Ask Question Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Ask an Agricultural Expert / Discuss in Community</h3>
        </div>

        <form onSubmit={handlePostSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Question Title or Symptoms</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. White powdery spots on grape vine leaves after rain..."
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ForumPost['category'])}
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Pest Control">Pest & Disease Control</option>
                <option value="Soil Health">Soil & Fertilizers</option>
                <option value="Crop Advisory">Crop Advisory</option>
                <option value="Subsidies">Government Schemes & Subsidies</option>
                <option value="Market Prices">Mandi & Market Prices</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Detailed Description</label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe symptoms, crop age, soil type, past pesticide applications, or irrigation frequency..."
              className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Question for Agronomists</span>
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm space-y-3.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  {post.category}
                </span>
                {post.isExpertReviewed && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Expert Verified</span>
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{post.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{post.content}</p>
              <div className="text-[11px] text-slate-400 mt-2">
                Asked by: <strong className="text-slate-200">{post.authorName}</strong>
              </div>
            </div>

            {/* Replies Thread */}
            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Agronomist Solutions & Answers ({post.replies.length})</span>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] text-amber-400 font-semibold">
                    *Replying as Admin stamps with Expert Verified seal
                  </span>
                )}
              </div>

              {post.replies.map((reply) => {
                const isAdmin = reply.role === 'admin';
                return (
                  <div
                    key={reply.id}
                    className={`p-3 rounded-2xl text-xs space-y-1.5 ${
                      isAdmin
                        ? 'bg-emerald-950/40 border border-emerald-800/60'
                        : 'bg-slate-800/60 border border-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{reply.responderName}</span>
                        <span
                          className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                            isAdmin
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isAdmin ? 'Agronomist / Scientist' : 'Farmer'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{reply.message}</p>
                  </div>
                );
              })}

              {/* Reply Input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder={`Write advice as ${currentUser.name} (${currentUser.role})...`}
                  value={replyInputs[post.id] || ''}
                  onChange={(e) =>
                    setReplyInputs({ ...replyInputs, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendReply(post.id);
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => handleSendReply(post.id)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
