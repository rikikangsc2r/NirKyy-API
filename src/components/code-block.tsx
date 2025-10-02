import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  lang?: string;
  className?: string;
};

export function CodeBlock({ code, lang, className }: CodeBlockProps) {
  return (
    <div className={cn("relative", className)}>
      <pre className="font-code w-full overflow-x-auto rounded-md border bg-muted/50 p-4 text-sm text-foreground">
        <code className={lang ? `language-${lang}` : ""}>{code}</code>
      </pre>
    </div>
  );
}
