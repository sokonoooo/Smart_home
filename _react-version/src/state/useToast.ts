import { useEffect, useRef, useState } from "react";

const TOAST_DURATION = 2400;

export default function useToast() {
  const [notice, setNotice] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function notify(message: string) {
    setNotice(message);
    // Restart the timer so a new toast isn't hidden early by an older one.
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNotice(""), TOAST_DURATION);
  }

  return { notice, notify };
}
