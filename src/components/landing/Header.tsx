import { useEffect, useState } from "react";
import logo from "@/assets/gb-logo-transparent.png.asset.json";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#planos", label: "Planos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="GB Browser" className="h-12 w-12" />
          <span className="font-display font-semibold tracking-tight text-lg">GB Browser</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="http://growmoneydigital.com.br/gb/gbbrowser.apk"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary transition"
          >
            Baixar para testar
          </a>
          <a
            href="#planos"
            className="text-sm px-4 py-2 rounded-lg bg-gradient-brand text-primary-foreground font-medium hover:opacity-90 transition glow-primary"
          >
            Assinar agora
          </a>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-border"
        >
          <span className="block w-5 h-0.5 bg-foreground mb-1" />
          <span className="block w-5 h-0.5 bg-foreground mb-1" />
          <span className="block w-5 h-0.5 bg-foreground" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-5 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
          <a href="#planos" onClick={() => setOpen(false)} className="block text-center mt-2 px-4 py-2.5 rounded-lg bg-gradient-brand text-primary-foreground font-medium">
            Assinar agora
          </a>
        </div>
      )}
    </header>
  );
}
