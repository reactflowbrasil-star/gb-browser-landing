import logo from "@/assets/gb-logo-transparent.png.asset.json";
import mockup from "@/assets/gb-mockup.png.asset.json";
import { Shield, Monitor, Settings2, KeyRound } from "lucide-react";

const badges = [
  { icon: Monitor, label: "Modo desktop" },
  { icon: Shield, label: "Modo privado" },
  { icon: Settings2, label: "Painel administrativo" },
  { icon: KeyRound, label: "Licença por código" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-cyan/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            Disponível agora para Android
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
            Navegação <span className="text-gradient">privada, rápida</span> e completa para Android
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            GB Browser é um navegador com modo desktop, modo privado, múltiplas abas, downloads,
            sites personalizados, notificações e licença integrada — tudo gerenciado por um painel próprio.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#planos" className="px-6 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition glow-primary">
              Assinar agora
            </a>
            <a href="#recursos" className="px-6 py-3.5 rounded-xl border border-border bg-card/40 backdrop-blur hover:bg-secondary transition font-medium">
              Conhecer recursos
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((b) => (
              <div key={b.label} className="card-surface rounded-xl p-3 flex items-center gap-2">
                <b.icon className="w-4 h-4 text-cyan flex-shrink-0" />
                <span className="text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-brand opacity-30 blur-3xl rounded-full" />
          <div className="relative flex justify-center">
            <img src={mockup.url} alt="GB Browser no smartphone" className="relative max-h-[640px] w-auto drop-shadow-[0_30px_60px_rgba(0,80,200,0.45)]" />
            <img src={logo.url} alt="" className="absolute -top-6 -left-6 w-28 h-28 opacity-90 glow-cyan animate-pulse" style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
