import type { Toast as ToastState } from "@/hooks/useToast";

type ToastProps = {
  toast: ToastState;
};

export function Toast({ toast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
      <div
        className={`px-6 py-3 rounded-full shadow-lg text-sm font-medium border flex items-center gap-2 ${
          toast.type === "success"
            ? "bg-green-500/10 text-green-500 border-green-500/20"
            : "bg-red-500/10 text-red-500 border-red-500/20"
        }`}
      >
        <span>{toast.type === "success" ? "✓" : "✕"}</span>
        {toast.message}
      </div>
    </div>
  );
}
