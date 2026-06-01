import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "O GB Browser funciona em qualquer Android?", a: "Sim, é compatível com a maioria dos dispositivos Android modernos (Android 7+)." },
  { q: "Como ativo minha licença?", a: "Após instalar o app, basta inserir o código recebido na tela de ativação. A validação é remota e imediata." },
  { q: "O app tem modo privado?", a: "Sim. O modo privado não salva histórico, cookies nem rastreios da sessão." },
  { q: "Posso usar sites em modo desktop?", a: "Sim, o modo desktop renderiza páginas como em um computador, com layout completo." },
  { q: "Existe teste grátis?", a: "Sim, oferecemos um período de testes para você experimentar todos os recursos." },
  { q: "Como recebo suporte?", a: "Por chat ao vivo dentro do app, WhatsApp e e-mail. Planos Premium têm suporte prioritário." },
  { q: "Posso usar em mais de um aparelho?", a: "Sim, no plano Premium é possível liberar múltiplos aparelhos pelo painel administrativo." },
  { q: "O painel administrativo está incluso?", a: "Sim, todos os planos pagos incluem acesso ao painel para gerenciar sites, alertas e usuários." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Dúvidas frequentes</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 30}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full card-surface rounded-xl px-5 py-4 text-left flex items-center justify-between gap-4 hover:border-primary/40 transition"
              >
                <span className="font-medium text-sm sm:text-base">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-cyan flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
