import {
  Zap, ShieldCheck, Monitor, Layers, Star, Download,
  Bell, MessageCircle, Globe, ScanFace,
} from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Zap, title: "Navegação rápida", desc: "Engine otimizada para carregamento fluido em qualquer rede." },
  { icon: ShieldCheck, title: "Modo privado", desc: "Sem salvar histórico, cookies ou rastreios de sessão." },
  { icon: Monitor, title: "Modo desktop", desc: "Abre sites como em um computador, com layout completo." },
  { icon: Layers, title: "Múltiplas abas", desc: "Alterne, organize e gerencie várias páginas ao mesmo tempo." },
  { icon: Star, title: "Favoritos & histórico", desc: "Acesse rapidamente o que importa, quando você quiser." },
  { icon: Download, title: "Downloads integrados", desc: "Gerenciador nativo de arquivos com controle total." },
  { icon: Bell, title: "Notificações push", desc: "Receba alertas em tempo real direto do painel." },
  { icon: MessageCircle, title: "Chat ao vivo", desc: "Suporte direto dentro do navegador, sem sair do app." },
  { icon: Globe, title: "Sites configuráveis", desc: "Lista de portais gerenciada remotamente pelo painel." },
  { icon: ScanFace, title: "Galeria facial KYC", desc: "Captura facial integrada para fluxos de verificação." },
];

export function Benefits() {
  return (
    <section id="recursos" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-3">Recursos principais</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tudo que um navegador <span className="text-gradient">profissional</span> precisa ter
          </h2>
          <p className="text-muted-foreground">Construído para velocidade, privacidade e controle total da experiência mobile.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 40}>
              <div className="card-surface rounded-2xl p-5 h-full hover:border-primary/40 transition-all hover:-translate-y-1 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-brand/10 border border-border flex items-center justify-center mb-4 group-hover:glow-cyan transition">
                  <it.icon className="w-5 h-5 text-cyan" />
                </div>
                <h3 className="font-semibold mb-1.5 text-base">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
