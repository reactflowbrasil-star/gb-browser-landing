import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const points = [
  "Ideal para quem precisa de um navegador Android mais completo",
  "Controle total por licença e assinatura",
  "Painel para gerenciar acessos, sites, alertas e mensagens",
  "Experiência personalizada com splash em vídeo e identidade própria",
  "Foco em praticidade, privacidade e produtividade",
];

export function WhyChoose() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Por que escolher</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Mais que um navegador. Uma <span className="text-gradient">plataforma completa</span>.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            GB Browser foi pensado para equipes, empresas e usuários que precisam de controle real
            sobre a navegação, acesso e experiência dentro do aplicativo.
          </p>
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <div className="card-surface rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { k: "99.9%", v: "Uptime do painel" },
                { k: "<1s", v: "Tempo médio de abertura" },
                { k: "256-bit", v: "Criptografia TLS" },
                { k: "24/7", v: "Suporte disponível" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-border bg-background/40 p-5">
                  <div className="text-3xl font-display font-bold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
