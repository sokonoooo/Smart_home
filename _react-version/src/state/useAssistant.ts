import { useEffect, useRef, useState } from "react";
import { describeAction, respond } from "../assistant";
import { welcomeMessage } from "../data/home";
import type { ChatMessage, HomeAction, HomeSnapshot } from "../types";

const REPLY_DELAY = 650;

/** Chat history with Haven. Replies are computed by `respond()` and applied via `applyAction`. */
export default function useAssistant(home: HomeSnapshot, applyAction: (action: HomeAction) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [thinking, setThinking] = useState(false);
  const replyTimer = useRef<number | undefined>(undefined);
  const nextId = useRef(1);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    const reply = respond(trimmed, home);
    setMessages((current) => [...current, { id: nextId.current++, role: "user", text: trimmed }]);
    setThinking(true);
    replyTimer.current = window.setTimeout(() => {
      reply.actions.forEach(applyAction);
      const actions = reply.actions.map((action) => describeAction(action, home.devices));
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", text: reply.text, actions }]);
      setThinking(false);
    }, REPLY_DELAY);
  }

  function clear() {
    window.clearTimeout(replyTimer.current);
    setThinking(false);
    setMessages([welcomeMessage]);
  }

  return { messages, thinking, send, clear };
}
