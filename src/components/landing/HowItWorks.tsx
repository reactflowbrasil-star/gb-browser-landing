import { Reveal } from "./Reveal";

const steps = [
  { n: "01", t: "Assine ou receba uma licença", d: "Escolha um plano ou solicite um código de acesso." },
  { n: "02", t: "Baixe e instale o GB Browser", d: "Disponível para Android, instalação rápida." },
  { n: "03", t: "Insira o código de licença", d: "Validação remota e imediata pelo painel." },
  { n: "04", t: "Navegue com tudo liberado", d: "Aproveite todos os recursos sem limites." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Como funciona</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Comece em <span className="text-gradient">4 passos simples</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="card-surface rounded-2xl p-6 h-full relative">
                <div className="text-5xl font-display font-bold text-gradient mb-4 opacity-90">{s.n}</div>
                <h3 className="font-semibold mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
