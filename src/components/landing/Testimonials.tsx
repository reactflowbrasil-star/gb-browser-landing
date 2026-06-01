import { Reveal } from "./Reveal";

const items = [
  { q: "O modo desktop ajudou muito no acesso a plataformas que não funcionavam bem no navegador comum.", n: "Rafael M.", r: "Analista de TI" },
  { q: "A ativação por licença deixou o controle dos usuários muito mais simples.", n: "Camila R.", r: "Gestora de operações" },
  { q: "O painel facilita o gerenciamento dos sites e notificações em tempo real.", n: "André S.", r: "Coordenador comercial" },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Depoimentos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Quem usa, <span className="text-gradient">recomenda</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.n} delay={i * 80}>
              <div className="card-surface rounded-2xl p-6 h-full flex flex-col">
                <div className="text-4xl font-display text-cyan leading-none mb-3">"</div>
                <p className="text-sm leading-relaxed mb-6 flex-1">{t.q}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center font-semibold text-primary-foreground">
                    {t.n[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
