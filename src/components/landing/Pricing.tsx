import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Teste",
    price: "Grátis",
    period: "10 minutos",
    desc: "Experimente todos os recursos por 10 minutos.",
    features: ["Acesso por 10 minutos", "Todos os recursos liberados", "Suporte via FAQ"],
    cta: "Começar teste",
    href: "http://growmoneydigital.com.br/gb/gbbrowser.apk",
    featured: false,
  },
  {
    name: "Mensal",
    price: "R$ 49,90",
    period: "/mês",
    desc: "Acesso completo com atualizações incluídas.",
    features: ["Acesso completo ao app", "Atualizações incluídas", "Suporte básico", "Painel administrativo"],
    cta: "Assinar mensal",
    href: "https://wa.me/5562981321845?text=Olá!%20Gostaria%20de%20assinar%20o%20plano%20Mensal%20do%20GB%20Browser!",
    featured: true,
  },
  {
    name: "Anual",
    price: "R$ 299,90",
    period: "/ano",
    desc: "Economize com o plano anual e tenha acesso ilimitado.",
    features: ["Acesso completo", "Suporte prioritário", "Economia de 50%", "Multi-aparelhos", "Atualizações incluídas"],
    cta: "Assinar anual",
    href: "https://wa.me/5562981321845?text=Olá!%20Gostaria%20de%20assinar%20o%20plano%20Anual%20do%20GB%20Browser!",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-gradient-radial opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Planos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Escolha o plano <span className="text-gradient">ideal para você</span>
          </h2>
          <p className="text-muted-foreground">Sem fidelidade. Cancele quando quiser.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  p.featured
                    ? "bg-gradient-to-b from-primary/15 to-card border-2 border-primary/50 glow-primary"
                    : "card-surface"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground text-xs font-semibold">
                    Mais escolhido
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold">{p.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-mint mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  download={p.href.endsWith(".apk") ? "" : undefined}
                  target={p.href.startsWith("http") && !p.href.endsWith(".apk") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`block text-center py-3 rounded-xl font-semibold transition ${
                    p.featured
                      ? "bg-gradient-brand text-primary-foreground hover:opacity-90"
                      : "border border-border hover:bg-secondary"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
