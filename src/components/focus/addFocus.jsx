import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

export function AddFocus({ setShowFocusPanel }) {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [objectiveId, setObjectiveId] = useState(null); // Track objective ID
  const BACKEND_URL = import.meta.env.VITE_API_URL;


  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const authData = JSON.parse(localStorage.getItem("authData") || "{}");
    const token = authData.token || null;
    const email = authData.user?.email || null;

    const newMessage = { sender: "user", text: userInput };
    setConversation((prev) => [...prev, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/focus/conversation`,
        {
          email,
          message: userInput,
          history: conversation.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          objectiveId: objectiveId, // null for first message, present later
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save AI response to conversation
      setConversation((prev) => [
        ...prev,
        { sender: "ai", text: response.data.reply },
      ]);

      // Save the objective ID from the response (only once)
      if (!objectiveId && response.data.objectiveId) {
        setObjectiveId(response.data.objectiveId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setConversation((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-800/50 max-w-lg mx-auto"
      style={{ minWidth: "320px" }}
    >
      {/* Header */}
      <div className="p-5 border-b border-purple-900 flex justify-between items-center">
        <h2 className="text-xl px-3 font-bold text-purple-200 leading-snug">
          What’s one meaningful goal you’d like to focus on accomplishing right now?
        </h2>
        <button
          onClick={() => setShowFocusPanel(false)}
          aria-label="Close focus panel"
          className="bg-purple-800 text-pink-200 p-2 rounded-full hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="p-5 space-y-4">
        <div className="max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-700">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`text-sm px-4 py-3 rounded-xl max-w-md break-words ${
                msg.sender === "user"
                  ? "ml-auto bg-pink-600 text-white"
                  : "mr-auto bg-purple-900/40 text-purple-100"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell me your focus..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-purple-700/40 text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            aria-label="Focus input"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-xl text-white transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label="Send focus message"
          >
            {isLoading ? "..." : <FaPaperPlane className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
