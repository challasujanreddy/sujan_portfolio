import { useEffect } from "react";

// Extend window interface for Jotform global object
declare global {
  interface Window {
    JotformEmbed?: {
      open: () => void;
      close: () => void;
    };
  }
}

export function JotformChatbot() {
  useEffect(() => {
    const scriptId = "jotform-chatbot-script";

    // Prevent duplicate script loading
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.jotfor.ms/agent/embedjs/0198398d64ff7d3f9c19cfb7ef1b114b3f44/embed.js?skipWelcome=1&maximizable=1";
    script.async = true;

    script.onload = () => {
      console.log("✅ Jotform Chatbot script loaded successfully");

      // Optional: Expose open function globally for easy access
      window.openChatbot = () => {
        if (window.JotformEmbed?.open) {
          window.JotformEmbed.open();
        } else {
          console.warn("Jotform chatbot not fully initialized yet.");
        }
      };
    };

    script.onerror = () => {
      console.error("❌ Failed to load Jotform chatbot script. Check internet or URL.");
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      const widget = document.querySelector(".jotform-feedback-widget");
      if (widget) widget.remove();
      const s = document.getElementById(scriptId);
      if (s) s.remove();
      if (window.openChatbot) delete (window as any).openChatbot;
    };
  }, []);

  return null; // This component doesn't render anything
}