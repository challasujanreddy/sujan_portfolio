"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
};

type ReplyPayload = { reply: string };

type Props = {
  webhookUrl?: string;
  startOpen?: boolean;
  storageKey?: string;
};

const DEFAULT_STORAGE_KEY = "portfolio_chat_history_v3";
const WELCOME_MSG: Msg = {
  id: "assistant-welcome",
  role: "assistant",
  text: "👋 Hi! I’m Sujan’s AI Assistant. How can I help you today?",
  ts: Date.now(),
};

const Chatbot: React.FC<Props> = ({
  webhookUrl,
  startOpen = false,
  storageKey = DEFAULT_STORAGE_KEY,
}) => {
  const [open, setOpen] = useState(startOpen);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const panelZ = 2147483001;
  const bubbleZ = 2147483000;

  // Load messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && saved.length > 2) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([WELCOME_MSG]);
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
      setMessages([WELCOME_MSG]);
    }
  }, [storageKey]);

  // Save messages + auto-scroll
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
    } catch (e) {
      console.error("Failed to save chat:", e);
    }

    const t = setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 120);
    return () => clearTimeout(t);
  }, [messages, storageKey]);

  // Append helper
  const append = (role: Msg["role"], text: string) => {
    setMessages((s) => [
      ...s,
      { id: `${role}-${Date.now()}`, role, text, ts: Date.now() },
    ]);
  };

  // Send handler
  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    append("user", text);
    setLoading(true);

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = (await res.json()) as ReplyPayload;
        append("assistant", data.reply || "Thanks! I’ll get back to you.");
      } else {
        setTimeout(() => {
          append("assistant", "This is a demo response as no backend is configured.");
          setLoading(false);
        }, 900);
        return;
      }
    } catch (e) {
      console.error(e);
      append("assistant", "❌ Couldn’t reach the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const handleClear = () => {
    localStorage.removeItem(storageKey);
    setMessages([WELCOME_MSG]);
  };

  // Last message preview for minimized bubble
  const preview =
    messages.length > 0
      ? messages[messages.length - 1].text.slice(0, 20) +
        (messages[messages.length - 1].text.length > 20 ? "…" : "")
      : "Chat with me!";

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <div
          style={{
            position: "fixed",
            left: 24,
            bottom: 24,
            zIndex: bubbleZ,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          <button
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #4f46e5, #9333ea)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            💬
          </button>
          <span
            style={{
              maxWidth: 140,
              padding: "6px 10px",
              borderRadius: 12,
              background: "rgba(20,20,35,0.9)",
              color: "#fff",
              fontSize: 13,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {loading ? "Typing…" : preview}
          </span>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            left: 24,
            bottom: 24,
            zIndex: panelZ,
            width: expanded ? "min(900px, 90vw)" : 360,
            maxHeight: expanded ? "80vh" : "70vh",
            animation: closing ? "chatExit 0.3s ease-in forwards" : "chatEntry 0.35s ease-out",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 18,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(10,10,26,0.96), rgba(10,10,26,0.94))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 16px",
                background: "linear-gradient(90deg, #4f46e5, #9333ea)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: 600 }}>Sujan’s AI Assistant</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleClear}
                  title="Clear chat"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  🗑️
                </button>
                <button
                  onClick={() => setExpanded((s) => !s)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}
                >
                  {expanded ? "🗗" : "🗖"}
                </button>
                <button
                  onClick={handleClose}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}
                >
                  ✖
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              style={{
                flex: 1,
                padding: 12,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    background:
                      m.role === "user"
                        ? "linear-gradient(180deg,#2563eb,#1e40af)"
                        : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 12,
                    maxWidth: "75%",
                    fontSize: 14,
                    wordBreak: "break-word",
                  }}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    alignSelf: "flex-start",
                    color: "#ccc",
                  }}
                >
                  Typing…
                </div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                padding: 10,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type your message…"
                style={{
                  flex: 1,
                  borderRadius: 10,
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.08)",
                  outline: "none",
                  fontSize: 14,
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: input.trim()
                    ? "linear-gradient(180deg,#4f46e5,#9333ea)"
                    : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  border: "none",
                  opacity: !input.trim() || loading ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes chatEntry {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatExit {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(30px) scale(0.95); }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
