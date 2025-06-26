import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";



export function JournalEntryForm({ onAdd }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter your cosmic thoughts");
      return;
    }
    setIsSubmitting(true);
    const authData = localStorage.getItem('authData');
    const token = authData ? JSON.parse(authData).token : null;

    try {
      const response = await fetch(`${BACKEND_URL}/journal`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = 'Failed to add entry';
        
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const text = await response.text();
          if (text) errorMessage = text;
        }
        
        throw new Error(errorMessage);
      }
      
      const text = await response.text();
      const newEntry = text ? JSON.parse(text) : null;
      
      if (newEntry) {
        onAdd(newEntry);
        setContent("");
      }
    } catch (error) {
      console.error("Entry submission error:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  onSubmit={handleSubmit}
  className="bg-black/30 backdrop-blur-md border border-white/10 ring-1 ring-white/10 shadow-lg rounded-2xl p-6 md:p-8 space-y-6"
>
  <div className="relative">
    <textarea
      placeholder="What cosmic thoughts are swirling in your mind today?"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={8}
      className="w-full px-5 py-4 rounded-xl bg-black/40 text-white placeholder-purple-300 border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none backdrop-blur-sm"
      disabled={isSubmitting}
    />
    <div className="absolute bottom-4 right-4 text-purple-400 text-2xl pointer-events-none">✨</div>
  </div>

  <div className="flex flex-col sm:flex-row gap-4">
    <button
      type="button"
      onClick={() => setContent("")}
      disabled={isSubmitting}
      className="w-full sm:w-1/2 py-3 rounded-xl border border-purple-700/50 hover:border-purple-400 text-white font-medium transition bg-white/5 hover:bg-white/10 backdrop-blur-sm disabled:opacity-50"
    >
      Clear
    </button>

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-md transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Saving..." : "Add Cosmic Entry"}
    </button>
  </div>
</motion.form>

  );
}
