interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Field({ label, name, type = "text", placeholder, value, onChange, disabled }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-2 w-full rounded-full border border-border bg-background/60 px-4 py-3 text-base outline-none transition-colors focus:border-foreground disabled:opacity-50"
      />
    </div>
  );
}
