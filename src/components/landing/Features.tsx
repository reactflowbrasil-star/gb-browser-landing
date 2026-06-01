import { Compass, Lock, KeyRound, Radio, Palette } from "lucide-react";
import { Reveal } from "./Reveal";

const blocks = [
  {
    icon: Compass,
    title: "Navegação",
    items: ["Barra de endereço", "Abas", "Voltar, avançar, recarregar e início", "Modo desktop", "Downloads"],
  },
  {
    icon: Lock,
    title: "Privacidade",
    items: ["Modo privado", "Limpeza de cookies e cache", "Controle de histórico"],
  },
  {
    icon: KeyRound,
    title: "Painel e assinatura",
    items: ["Código de licença", "Validação remota", "Bloqueio/liberação de aparelho", "Teste grátis", "Gestão de usuários"],
  },
  {
    icon: Radio,
    title: "Comunicação",
    items: ["Push em tempo real", "Chat ao vivo", "Alertas no app"],
  },
  {
    icon: Palette,
    title: "Personalização",
    items: ["Ícone próprio", "Splash em vídeo", "Sites cadastrados no painel", "Categorias de sites"],
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Funcionalidades</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Explore cada <span className="text-gradient">recurso em detalhe</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="card-surface rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-brand/20 border border-border flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-cyan" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{b.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {b.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan mt-2 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
