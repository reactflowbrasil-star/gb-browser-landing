import { motion } from "framer-motion";
import mockup from "@/assets/gb-mockup-nobg.png";
import { Shield, Monitor, Settings2, KeyRound } from "lucide-react";

const badges = [
  { icon: Monitor, label: "Modo desktop" },
  { icon: Shield, label: "Modo privado" },
  { icon: Settings2, label: "Painel administrativo" },
  { icon: KeyRound, label: "Licença por código" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-cyan/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            Disponível agora para Android · v2.0
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
            Navegação <span className="text-gradient">privada, rápida</span> e completa para Android
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            GB Browser é um navegador com modo desktop, modo privado, múltiplas abas, downloads,
            sites personalizados, notificações e licença integrada — tudo gerenciado por um painel próprio.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <motion.a
              href="#planos"
              className="focus-ring px-6 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold glow-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Assinar agora
            </motion.a>
            <motion.a
              href="#recursos"
              className="focus-ring px-6 py-3.5 rounded-xl border border-border bg-card/40 backdrop-blur font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Conhecer recursos
            </motion.a>
          </div>
          <div className="flex items-center gap-4 mb-10 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-gradient-brand border-2 border-background" />
              <span className="w-7 h-7 rounded-full bg-cyan border-2 border-background" />
              <span className="w-7 h-7 rounded-full bg-mint border-2 border-background" />
            </div>
            <span>
              <strong className="text-foreground">+5.000</strong> usuários ativos · ★ 4,9/5
            </span>
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
            <img src={mockup} alt="GB Browser no smartphone" className="animate-float relative max-h-[640px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,80,200,0.45)]" />
          </div>
        </div>
      </div>
    </section>
  );
}