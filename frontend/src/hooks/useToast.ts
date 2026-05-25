import { useCallback, useEffect, useState } from "react";

export type ToastType = "success" | "error";

export type Toast = {
  message: string;
  type: ToastType;
};

export function useToast(autoDismissMs = 5000) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), autoDismissMs);
    return () => clearTimeout(timer);
  }, [toast, autoDismissMs]);

  return { toast, showToast, clearToast };
}
