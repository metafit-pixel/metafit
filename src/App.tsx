import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Flame,
  Zap,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Utensils,
  Dumbbell,
  Brain,
  ChevronDown,
  Users,
  BookOpen,
  Lock,
  Timer,
  TrendingUp,
  Play,
  Trophy,
  Sparkles,
  Heart,
  Clock,
  Target,
} from "lucide-react";

const CHECKOUT_URL = "#checkout";

/* ───────────── SCROLL ANIMATION WRAPPER ───────────── */
function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────── CTA BUTTON ───────────── */
function CTAButton({ children, large = false, className = "" }: { children: React.ReactNode; large?: boolean; className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full btn-gradient cta-glow font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 ${
        large ? "px-10 py-5 text-lg md:text-xl" : "px-8 py-4 text-base"
      } ${className}`}
    >
      <span className="absolute inset-0 rounded-full animate-shimmer pointer-events-none" />
      {children}
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

/* ───────────── COUNTDOWN TIMER ───────────── */
function CountdownTimer() {
  const [time, setTime] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 animate-countdown">
      {[
        { value: pad(time.hours), label: "HRS" },
        { value: pad(time.minutes), label: "MIN" },
        { value: pad(time.seconds), label: "SEG" },
      ].map((unit, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="glass-strong text-2xl md:text-3xl font-bold text-white px-3 py-2 rounded-lg min-w-[60px] text-center tabular-nums">
              {unit.value}
            </span>
            <span className="text-[10px] text-dark-200 mt-1 font-medium tracking-wider">{unit.label}</span>
          </div>
          {i < 2 && <span className="text-coral-500 text-2xl font-bold mb-4">:</span>}
        </div>
      ))}
    </div>
  );
}

/* ───────────── FAQ ITEM ───────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base md:text-lg font-semibold text-dark-100 transition-colors hover:text-coral-400"
      >
        {question}
        <ChevronDown className={`h-5 w-5 text-coral-500 transition-transform duration-300 shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-dark-200 leading-relaxed pb-5">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ───────────── MAIN APP ───────────── */
export function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-dark-100 overflow-x-hidden">
      
      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-dark-900/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 shadow-lg shadow-coral-500/30">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight font-heading">
              Meta<span className="text-gradient-coral">Fit</span>
            </span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="hidden sm:inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 cta-glow"
          >
            <Zap className="h-4 w-4" />
            COMEÇAR AGORA
          </a>
        </div>
      </nav>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')" }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        {/* Neon glow effects */}
        <div className="absolute top-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-coral-500/15 blur-[150px]" />
        <div className="absolute bottom-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-coral-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-5 py-32 md:py-40 w-full">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-7"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-coral-500/30 bg-coral-500/10 px-4 py-2 text-sm font-medium text-coral-400"
              >
                <Sparkles className="h-4 w-4" />
                Método aprovado por +2.000 alunos
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white font-heading">
                Transforme seu corpo{" "}
                <span className="text-gradient-coral">de verdade.</span>
              </h1>

              <p className="max-w-lg text-lg text-dark-200 leading-relaxed">
                O MetaFit é o programa digital completo que combina alimentação inteligente, 
                treinos de 20 min e mentalidade vencedora para você perder peso de forma 
                saudável e definitiva.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <CTAButton large>QUERO COMEÇAR AGORA</CTAButton>
              </div>

              {/* Prova social */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                <div className="flex -space-x-3">
                  {["C", "R", "A", "M", "J"].map((letter, i) => (
                    <div
                      key={i}
                      className="h-11 w-11 rounded-full border-2 border-dark-900 bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-accent-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                    <span className="text-sm text-dark-200 ml-1">4.9/5</span>
                  </div>
                  <p className="text-sm text-dark-300 mt-0.5">+2.000 alunos transformados</p>
                </div>
              </div>

              {/* Countdown */}
              <div className="pt-2">
                <p className="text-sm text-coral-400 font-semibold mb-3 flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  OFERTA EXPIRA EM:
                </p>
                <CountdownTimer />
              </div>
            </motion.div>

            {/* Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative animate-float">
                <div className="glass-strong rounded-3xl p-10 text-center shadow-2xl max-w-sm">
                  <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center mb-5 shadow-lg shadow-coral-500/30">
                    <TrendingUp className="h-12 w-12 text-white rotate-180" />
                  </div>
                  <p className="text-6xl font-bold text-white font-heading">-15<span className="text-3xl">kg</span></p>
                  <p className="text-dark-200 font-medium mt-2 text-lg">Perda média em 30 dias</p>
                  <div className="mt-5 flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />)}
                  </div>
                  <p className="text-dark-300 text-sm mt-2">Resultado real de alunos</p>
                </div>

                {/* Floating badge 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-5 -left-8 glass-strong rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">97%</p>
                      <p className="text-xs text-emerald-400">Aprovação</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge 2 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -top-5 -right-8 glass-strong rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-coral-500/20 flex items-center justify-center">
                      <Flame className="h-5 w-5 text-coral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">+2.347</p>
                      <p className="text-xs text-coral-400">Alunos</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="relative py-8 md:py-10 border-y border-white/5" style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(238,90,36,0.05))" }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: "2.347+", label: "Alunos ativos", icon: Users },
              { value: "15kg", label: "Perda média", icon: TrendingUp },
              { value: "97%", label: "Taxa de aprovação", icon: Trophy },
              { value: "4.9", label: "Avaliação média", icon: Star },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-2">
                  <stat.icon className="h-5 w-5 text-coral-500" />
                  <p className="text-2xl md:text-3xl font-bold text-white font-heading">{stat.value}</p>
                  <p className="text-dark-300 text-sm">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROBLEMAS ═══════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <FadeInSection className="text-center mb-14">
            <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Você se identifica?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
              Cansado de dietas que{" "}
              <span className="text-gradient-coral">não funcionam?</span>
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Efeito Sanfona",
                desc: "Você emagrece, mas engorda tudo de volta em poucas semanas. Um ciclo frustrante que parece não ter fim.",
                emoji: "😩",
              },
              {
                icon: Utensils,
                title: "Dietas Restritivas",
                desc: "Cortar todos os alimentos que você gosta, passar fome o dia todo e se sentir miserável. Isso não é vida.",
                emoji: "🚫",
              },
              {
                icon: Clock,
                title: "Falta de Tempo",
                desc: "Sua rotina é corrida, não sobra tempo pra academia ou cozinhar refeições elaboradas. Você precisa de algo prático.",
                emoji: "⏰",
              },
            ].map((problem, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="glass rounded-2xl p-7 h-full hover:border-coral-500/30 transition-all duration-300 group">
                  <span className="text-4xl mb-4 block">{problem.emoji}</span>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-coral-400 transition-colors">{problem.title}</h3>
                  <p className="text-dark-200 leading-relaxed">{problem.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUÇÃO ═══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coral-500/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
                  alt="Alimentação saudável"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-strong rounded-xl p-4 inline-flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Nutrição inteligente</p>
                      <p className="text-xs text-emerald-400">Sem passar fome</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                <p className="text-coral-500 font-bold text-sm uppercase tracking-widest font-heading">A solução definitiva</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
                  Conheça o <span className="text-gradient-coral">MetaFit</span>
                </h2>
                <p className="text-dark-200 text-lg leading-relaxed">
                  O MetaFit é um programa digital completo que reúne ciência, praticidade e resultados reais. 
                  Desenvolvido por especialistas, ele combina nutrição inteligente com treinos rápidos e uma 
                  mentalidade vencedora para você transformar seu corpo em 30 dias.
                </p>
                <div className="space-y-4">
                  {[
                    "Plano alimentar flexível — coma o que gosta e emagreça",
                    "Treinos de apenas 20 min por dia, sem academia",
                    "Método comprovado por mais de 2.000 alunos",
                    "Resultados visíveis já na primeira semana",
                    "Acompanhamento completo com comunidade VIP",
                    "Acesso vitalício com todas as atualizações",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-coral-500 shrink-0 mt-0.5" />
                      <span className="text-dark-100">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <CTAButton>QUERO O METAFIT</CTAButton>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════ O QUE VOCÊ RECEBE ═══════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeInSection className="text-center mb-14">
            <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Conteúdo completo</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
              O que você <span className="text-gradient-coral">recebe</span>
            </h2>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Dumbbell, title: "Plano de Treinos", desc: "30 dias de treinos completos de 20 min para fazer em casa, sem equipamentos
