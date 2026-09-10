import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        ScrollExpandMedia integration
      </h1>
      <p className="max-w-md text-muted-foreground">
        The <code>ScrollExpandMedia</code> component lives at{" "}
        <code>src/components/ui/scroll-expansion-hero.tsx</code>. See it in
        action on the demo page.
      </p>
      <Link
        href="/scroll-expansion-demo"
        className="rounded-lg bg-foreground px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
      >
        View the demo
      </Link>
    </div>
  );
}
