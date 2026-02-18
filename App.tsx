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
              { icon: Dumbbell, title: "Plano de Treinos", desc: "30 dias de treinos completos de 20 min para fazer em casa, sem equipamentos. Para todos os níveis.", badge: "Principal", badgeColor: "coral" },
              { icon: Utensils, title: "Plano Alimentar", desc: "Cardápio flexível de 30 dias com receitas deliciosas. Sem fome, sem restrições absurdas.", badge: "Principal", badgeColor: "coral" },
              { icon: BookOpen, title: "E-book Exclusivo", desc: "Guia completo com a ciência por trás do método MetaFit. Entenda o que funciona e por quê.", badge: "Principal", badgeColor: "coral" },
              { icon: Users, title: "Comunidade VIP", desc: "Acesso ao grupo exclusivo de alunos para trocar experiências, dicas e se manter motivado.", badge: "Bônus", badgeColor: "accent" },
              { icon: Brain, title: "Guia de Mindset", desc: "Técnicas de reprogramação mental para acabar com a auto-sabotagem e criar hábitos que duram.", badge: "Bônus", badgeColor: "accent" },
              { icon: Target, title: "Desafio 21 Dias", desc: "Programa acelerador de resultados com tarefas diárias para máximo engajamento e perda de peso.", badge: "Bônus", badgeColor: "accent" },
            ].map(({ icon: Icon, title, desc, badge, badgeColor }, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-7 h-full hover:border-coral-500/20 transition-all duration-300 group relative">
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${badgeColor === "coral" ? "bg-coral-500/15 text-coral-400" : "bg-accent-400/15 text-accent-400"}`}>
                    {badge}
                  </span>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-500/10 text-coral-500 group-hover:bg-coral-500 group-hover:text-white transition-all duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">{title}</h3>
                  <p className="text-dark-200 leading-relaxed">{desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ COMO FUNCIONA ═══════════════════ */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,107,107,0.03) 0%, transparent 50%, rgba(255,107,107,0.03) 100%)" }} />
        <div className="relative mx-auto max-w-5xl px-5">
          <FadeInSection className="text-center mb-14">
            <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Simples e eficaz</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
              Como funciona em{" "}
              <span className="text-gradient-coral">3 passos</span>
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Play, title: "Faça sua inscrição", desc: "Clique no botão, faça o pagamento seguro e receba acesso imediato a todo o conteúdo do programa." },
              { step: "02", icon: Target, title: "Siga o plano", desc: "Acompanhe o plano alimentar e os treinos diários. Tudo explicado passo a passo, sem complicação." },
              { step: "03", icon: Award, title: "Veja os resultados", desc: "Em 7 dias você já nota diferença. Em 30 dias, a transformação é visível para todos ao seu redor." },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="relative text-center group">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-bold text-coral-500/5 select-none font-heading">{step}</span>
                  <div className="relative z-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-coral-500 to-coral-600 shadow-lg shadow-coral-500/30 group-hover:shadow-coral-500/50 transition-shadow">
                      <Icon className="h-9 w-9 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-heading">{title}</h3>
                    <p className="text-dark-200 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ RESULTADOS ═══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-coral-500/5 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="space-y-6">
                <p className="text-coral-500 font-bold text-sm uppercase tracking-widest font-heading">Resultados comprovados</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
                  Números que falam por si
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: "-15kg", label: "Perda média de peso", icon: TrendingUp },
                    { value: "-12cm", label: "Redução de cintura", icon: Target },
                    { value: "3x", label: "Mais energia", icon: Zap },
                    { value: "97%", label: "Recomendam", icon: Heart },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-5 text-center hover:border-coral-500/20 transition-all">
                      <stat.icon className="h-6 w-6 text-coral-500 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-white font-heading">{stat.value}</p>
                      <p className="text-dark-300 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                  alt="Treino e resultados"
                  className="w-full h-[400px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DEPOIMENTOS ═══════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeInSection className="text-center mb-14">
            <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Histórias reais</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
              O que nossos alunos dizem
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Carla M.",
                lost: "-18kg",
                text: "Em 2 meses eu perdi 18kg com o MetaFit! O plano alimentar é delicioso e os treinos são tão rápidos que não tem desculpa. Minha vida mudou completamente, me sinto outra pessoa!",
                avatar: "C",
              },
              {
                name: "Rafael S.",
                lost: "-12kg",
                text: "Sempre fui cético com programas online, mas o MetaFit me provou errado. Perdi 12kg em 5 semanas seguindo tudo certinho. O suporte da comunidade faz toda a diferença!",
                avatar: "R",
              },
              {
                name: "Ana Paula L.",
                lost: "-10kg",
                text: "Depois de 2 filhos, achei que nunca mais teria meu corpo de volta. Com o MetaFit perdi 10kg em 30 dias e ganhei uma energia que não tinha há anos. Super recomendo!",
                avatar: "A",
              },
            ].map((testimonial, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="glass rounded-2xl p-7 h-full hover:border-coral-500/20 transition-all duration-300">
                  <div className="flex items-center gap-1 text-accent-400 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-dark-100 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-white font-heading">{testimonial.name}</p>
                      <p className="text-sm text-coral-400 font-semibold">Perdeu {testimonial.lost}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PREÇO / CHECKOUT ═══════════════════ */}
      <section id="checkout" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,107,107,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-coral-500/5 blur-[150px]" />

        <div className="relative mx-auto max-w-lg px-5">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Oferta especial</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
                Garanta sua vaga agora
              </h2>
            </div>

            <div className="glass-strong rounded-3xl p-8 md:p-10 relative animate-pulse-glow">
              {/* Discount badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="btn-gradient text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg inline-flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  67% OFF — Oferta limitada!
                </span>
              </div>

              <div className="text-center pt-4">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-dark-300 text-lg line-through mb-1">De R$ 297,00</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl text-coral-400 font-bold">R$</span>
                    <span className="text-7xl md:text-8xl font-bold text-white font-heading">97</span>
                    <span className="text-xl text-dark-200">,00</span>
                  </div>
                  <p className="text-dark-300 mt-2">ou <strong className="text-dark-100">12x de R$ 9,70</strong> no cartão</p>
                </div>

                {/* Included items */}
                <div className="space-y-3 text-left mb-8">
                  {[
                    "Plano de Treinos 30 dias",
                    "Plano Alimentar completo",
                    "E-book exclusivo do método",
                    "Comunidade VIP (bônus)",
                    "Guia de Mindset (bônus)",
                    "Desafio 21 Dias (bônus)",
                    "Acesso vitalício + atualizações",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-coral-500 shrink-0" />
                      <span className="text-dark-100">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <CTAButton large className="w-full justify-center text-center">
                  QUERO GARANTIR MINHA VAGA
                </CTAButton>

                {/* Guarantee */}
                <div className="mt-6 flex items-center justify-center gap-3 glass rounded-xl p-3">
                  <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Garantia de 7 dias</p>
                    <p className="text-xs text-dark-300">Não gostou? Devolvemos 100% do seu dinheiro.</p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-5 mt-5 text-xs text-dark-400">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-dark-400" />
                    Compra segura
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-dark-400" />
                    Dados protegidos
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <FadeInSection className="text-center mb-12">
            <p className="text-coral-500 font-bold text-sm uppercase tracking-widest mb-4 font-heading">Tire suas dúvidas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
              Perguntas frequentes
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="glass rounded-2xl p-6 md:p-8">
              <FAQItem
                question="Preciso de equipamentos ou ir à academia?"
                answer="Não! Todos os treinos foram desenvolvidos para serem feitos em casa, sem nenhum equipamento. Você só precisa de 20 minutos do seu dia e um espaço pequeno."
              />
              <FAQItem
                question="Funciona para pessoas com restrições alimentares?"
                answer="Sim! O plano alimentar é flexível e pode ser adaptado para intolerância a lactose, glúten, vegetarianos e outras restrições. Incluímos opções de substituição para cada refeição."
              />
              <FAQItem
                question="Em quanto tempo vou ver resultados?"
                answer="A maioria dos alunos relata mudanças visíveis já na primeira semana (desinchar, mais energia). Resultados significativos de perda de peso acontecem entre 2 a 4 semanas seguindo o programa."
              />
              <FAQItem
                question="Como funciona a garantia de 7 dias?"
                answer="É simples: se nos primeiros 7 dias você não ficar satisfeito por qualquer motivo, basta enviar um e-mail e devolvemos 100% do valor investido. Sem perguntas, sem burocracia."
              />
              <FAQItem
                question="O acesso é realmente vitalício?"
                answer="Sim! Ao adquirir o MetaFit, você terá acesso para sempre ao conteúdo, incluindo todas as atualizações e novos materiais que adicionarmos no futuro. Compre uma vez, use para sempre."
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-dark-900/90" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.15) 0%, rgba(238,90,36,0.1) 100%)" }} />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <FadeInSection>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-coral-500/30 bg-coral-500/10 px-4 py-2 text-sm font-medium text-coral-400 mb-6">
                <Sparkles className="h-4 w-4" />
                Não perca essa oportunidade
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 font-heading">
                Sua transformação{" "}
                <span className="text-gradient-coral">começa agora</span>
              </h2>
              <p className="text-dark-200 text-lg mb-8 max-w-xl mx-auto">
                Junte-se a mais de 2.000 pessoas que já transformaram seus corpos e suas vidas com o MetaFit. 
                A única coisa que te separa do seu objetivo é uma decisão.
              </p>

              {/* Countdown */}
              <div className="mb-8 flex justify-center">
                <div>
                  <p className="text-sm text-coral-400 font-semibold mb-3 flex items-center justify-center gap-2">
                    <Timer className="h-4 w-4" />
                    PREÇO ESPECIAL ACABA EM:
                  </p>
                  <CountdownTimer />
                </div>
              </div>

              <CTAButton large>
                SIM, QUERO TRANSFORMAR MEU CORPO
              </CTAButton>

              <p className="text-dark-300 text-sm mt-6">
                De <span className="line-through text-dark-400">R$ 297</span> por apenas{" "}
                <strong className="text-coral-400">R$ 97,00</strong> • Garantia de 7 dias
              </p>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-600">
              <Flame className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white font-heading">
              Meta<span className="text-gradient-coral">Fit</span>
            </span>
          </div>
          <p className="text-dark-400 text-sm">
            © {new Date().getFullYear()} MetaFit. Todos os direitos reservados.
          </p>
          <p className="text-dark-500 text-xs mt-2 max-w-md mx-auto">
            Este produto não substitui orientação médica. Consulte um profissional de saúde antes de iniciar qualquer programa de emagrecimento.
          </p>
        </div>
      </footer>
    </div>
  );
}
