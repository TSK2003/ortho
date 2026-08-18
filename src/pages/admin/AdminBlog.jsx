import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FileText, Plus, Pencil, Trash2, X, Save, Search, ShieldCheck } from 'lucide-react';

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', summary: '', excerpt: '', content: '', author: '', date: '', image: '', category: '', readTime: '5 min read' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = (blogPosts || []).filter((p) => (p.title || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      title: '', 
      slug: '', 
      summary: '',
      excerpt: '', 
      content: '', 
      author: 'Dr. Rajeshwar V. Natarajan, MS (Ortho)', 
      date: new Date().toISOString().split('T')[0], 
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 
      category: 'Robotic Surgery',
      readTime: '6 min read'
    }); 
    setShowForm(true); 
  };
  
  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item, summary: item.summary || item.excerpt }); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updatedData = { ...form, slug, excerpt: form.summary };
    if (editingId) { 
      updateBlogPost(editingId, updatedData); 
    } else { 
      addBlogPost(updatedData); 
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <FileText className="w-5 h-5 text-blue-700" />
            <span>Orthopedic Patient Guides & Clinical Articles</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage patient surgical guides, recovery timelines, and bone health advice (Total: {(blogPosts || []).length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /><span>Add Patient Guide</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search patient guides by title..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs" 
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Guide Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Author Surgeon</th>
                <th className="px-5 py-3.5">Publish Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-md font-bold text-[11px]">{post.category}</span></td>
                  <td className="px-5 py-4 text-slate-700 font-medium">{post.author}</td>
                  <td className="px-5 py-4 text-slate-500">{post.date}</td>
                  <td className="px-5 py-4 text-right space-x-1.5">
                    <button onClick={() => openEdit(post)} className="text-slate-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteConfirm(post.id)} className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-3 border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-950 font-heading">Delete Patient Guide?</h3>
            <p className="text-slate-500">This will remove the guide from the public patient library.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3.5 py-2 bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 rounded-xl">Cancel</button>
              <button onClick={() => { deleteBlogPost(deleteConfirm); setDeleteConfirm(null); }} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-4 max-h-[90vh] overflow-y-auto border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">{editingId ? 'Edit Patient Guide' : 'Add New Patient Guide'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Guide Title *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Robotic Total Knee Replacement Recovery Timeline" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Surgeon</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary / Excerpt</label>
                <textarea rows="2" value={form.summary || form.excerpt} onChange={(e) => setForm({ ...form, summary: e.target.value, excerpt: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Content</label>
                <textarea rows="5" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none font-mono" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-sm cursor-pointer">Save Guide</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlog;
