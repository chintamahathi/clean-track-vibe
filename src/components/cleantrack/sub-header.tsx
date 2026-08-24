import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Back-button header for secondary screens. */
export function SubHeader({
  title,
  subtitle,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Go back"
        onClick={() => router.history.back()}
        className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 ${
          dark ? "glass-panel-dark text-ivory" : "bg-card text-forest shadow-card"
        }`}
      >
        <ArrowLeft className="size-[18px]" />
      </button>
      <div className="min-w-0">
        <h1 className={`truncate text-xl font-extrabold tracking-tight ${dark ? "text-ivory" : "text-forest"}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xs font-medium ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>{subtitle}</p>
        )}
      </div>
    </header>
  );
}
