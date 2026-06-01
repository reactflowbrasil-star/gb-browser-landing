import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="contato" className="py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden card-surface p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-radial opacity-70" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-cyan/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Comece a usar o <span className="text-gradient">GB Browser hoje</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Tenha um navegador Android completo, privado e preparado para uso profissional.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#planos" className="px-7 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition glow-primary">
                  Assinar agora
                </a>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-xl border border-border bg-card/40 backdrop-blur hover:bg-secondary transition font-medium inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar com suporte
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
