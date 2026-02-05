"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 font-retro text-lg bg-bg-panel text-text-primary
                   pixel-border-thin placeholder:text-text-secondary
                   focus:outline-none focus:border-accent-green
                   transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary
                     hover:text-text-primary font-pixel text-xs"
        >
          X
        </button>
      )}
    </div>
  );
}
