import logo from "@/assets/gb-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src={logo.url} alt="GB Browser" className="h-8 w-8 rounded-lg" />
          <span className="font-display font-semibold">GB Browser</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Termos</a>
          <a href="#" className="hover:text-foreground transition">Privacidade</a>
          <a href="#contato" className="hover:text-foreground transition">Suporte</a>
          <a href="#contato" className="hover:text-foreground transition">Contato</a>
        </nav>
        <p className="text-xs text-muted-foreground">© 2026 GB Browser. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
