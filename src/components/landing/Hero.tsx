import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Monitor,
  Settings2,
  KeyRound,
  Star,
  Wifi,
  BatteryFull,
  SignalHigh,
} from "lucide-react";
import logo from "@/assets/gb-logo-transparent.png.asset.json";

const badges = [
  { icon: Monitor, label: "Modo desktop" },
  { icon: Shield, label: "Modo privado" },
  { icon: Settings2, label: "Painel administrativo" },
  { icon: KeyRound, label: "Licença por código" },
];

// Rotating words for the headline typewriter.
const TYPED_WORDS = ["privado.", "ultrarrápido.", "completo.", "profissional."];

function useTypewriter(words: string[], { typeSpeed = 85, deleteSpeed = 40, pause = 1600 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          ),
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* App opening (splash) screen rendered inside the phone mockup. */
function AppSplash() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0a0c] overflow-hidden">
      {/* Ambient splash gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_38%,rgba(6,182,212,0.22),transparent_70%)]" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-primary/25 blur-3xl" />

      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-white/80">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <SignalHigh className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryFull className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Centered logo reveal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative">
          <motion.div
            className="absolute -inset-5 rounded-full border border-primary/25"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-8 rounded-full bg-primary/15 blur-2xl"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src={logo.url}
            alt="GB Browser"
            className="relative h-20 w-20 object-contain drop-shadow-[0_0_28px_rgba(6,182,212,0.55)]"
          />
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-cyan-100 to-cyan bg-clip-text text-transparent">
          GB Browser
        </h3>
        <p className="mt-2 text-[8px] tracking-[0.28em] text-cyan uppercase font-semibold">
          Inovação · Privacidade · Velocidade
        </p>
      </div>

      {/* Loading indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-3">
        <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full w-1/2 rounded-full bg-gradient-brand"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[8px] tracking-wider text-white/40 uppercase">
          Carregando ambiente seguro
        </span>
      </div>
    </div>
  );
}

/* Realistic CSS smartphone mockup. */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-28 h-9 w-[3px] rounded-l bg-white/10" />
      <div className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-white/10" />
      <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-white/10" />

      {/* Device frame */}
      <div className="relative rounded-[2.75rem] p-[3px] bg-gradient-to-b from-white/15 via-white/5 to-white/15 shadow-[0_30px_70px_-20px_rgba(0,80,200,0.55)]">
        <div className="relative rounded-[2.6rem] bg-[#0b0b0e] p-2 ring-1 ring-black/60">
          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.1rem]">
            <AppSplash />

            {/* Punch-hole camera */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-2.5 w-2.5 rounded-full bg-black ring-1 ring-white/10">
              <div className="absolute inset-[3px] rounded-full bg-[#0a1a2a]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(TYPED_WORDS);

  return (
    <section id="top" className="relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-cyan/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ---- Copy ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            Disponível agora para Android · v2.0
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
            O navegador Android que é <span className="text-gradient">{typed}</span>
            <span className="inline-block w-[3px] h-[0.9em] align-middle ml-0.5 bg-cyan animate-pulse" />
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            GB Browser reúne modo desktop, modo privado, múltiplas abas, downloads, sites
            personalizados, notificações e licença integrada — tudo gerenciado por um painel
            administrativo próprio.
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
            <span className="flex items-center gap-1">
              <strong className="text-foreground">+5.000</strong> usuários ativos ·
              <Star className="w-3.5 h-3.5 fill-cyan text-cyan" /> 4,9/5
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
        </motion.div>

        {/* ---- Phone mockup ---- */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-brand opacity-30 blur-3xl rounded-full" />

          <div className="relative animate-float">
            <PhoneMockup />

            {/* Floating feature chips */}
            <motion.div
              className="absolute -left-4 sm:-left-10 top-16 card-surface rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-4 h-4 text-mint" />
              <span className="text-xs font-medium whitespace-nowrap">100% privado</span>
            </motion.div>

            <motion.div
              className="absolute -right-3 sm:-right-8 top-40 card-surface rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <Monitor className="w-4 h-4 text-cyan" />
              <span className="text-xs font-medium whitespace-nowrap">Modo desktop</span>
            </motion.div>

            <motion.div
              className="absolute -right-2 sm:-right-6 bottom-20 card-surface rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <KeyRound className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium whitespace-nowrap">Licença integrada</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
