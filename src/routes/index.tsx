import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Leaf, Heart, Activity, Sprout, MapPin, Globe2, GraduationCap, Check, Instagram, Menu, X, MessageCircle, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import portrait from '@/assets/laiza-consultorio.png.asset.json'
import aboutPortrait from '@/assets/laiza-retrato.jpg.asset.json'

const instagram = 'https://www.instagram.com/nutrilaizacarvalho/'
const whatsapp = 'https://wa.me/5562985398939?text=Ol%C3%A1%2C%20Laiza!%20Gostaria%20de%20saber%20mais%20sobre%20a%20consulta%20nutricional.'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Laiza Carvalho | Nutrição clínica e esportiva em Goiânia' },
    { name: 'description', content: 'A Nutri que não complica. Saúde intestinal, emagrecimento sustentável, saúde da mulher e performance com Laiza Carvalho, CRN 9396. Em Goiânia, Jaraguá e on-line.' },
    { property: 'og:title', content: 'Laiza Carvalho — A Nutri que não complica' },
    { property: 'og:description', content: 'Nutrição para a vida real. Atendimento clínico e esportivo em Goiânia, Jaraguá e on-line para mais de 7 países.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
})

function BrandSymbol({ draw = false }: { draw?: boolean }) {
  return <svg className={`brand-symbol${draw ? ' is-drawn' : ''}`} viewBox="0 0 44 52" fill="none" aria-hidden="true"><path pathLength={1} d="M22 47V15M22 30C5 30 5 10 5 10c17 0 17 20 17 20ZM22 23C39 23 39 3 39 3 22 3 22 23 22 23Z" stroke="currentColor" strokeWidth="1.3"/><path pathLength={1} d="M15 47h14M11 16l11 14M33 9 22 23" stroke="currentColor" strokeWidth="1"/></svg>
}
function Brand() {
  return <a href="#inicio" className="brand" aria-label="Laiza Carvalho — início">
    <BrandSymbol />
    <span><span className="brand-name">Laiza Carvalho</span><span className="brand-caption">Nutrição clínica & esportiva</span></span>
  </a>
}
function AppointmentButton({ light = false, children = 'Agendar minha consulta' }: { light?: boolean; children?: React.ReactNode }) {
  return <Button asChild variant={light ? 'light' : 'consultation'}><a href={whatsapp} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16}/></a></Button>
}

const specialties = [
  { icon: Leaf, name: 'Saúde intestinal', description: 'Cuidado com o seu intestino para mais equilíbrio, conforto e bem-estar no dia a dia.' },
  { icon: Sprout, name: 'Emagrecimento sustentável', description: 'Mudanças possíveis, respeitando seu corpo e sua rotina. Sem atalhos, com constância.' },
  { icon: Heart, name: 'Saúde da mulher', description: 'Nutrição que acolhe suas necessidades e acompanha as diferentes fases da sua vida.' },
  { icon: Activity, name: 'Esporte & performance', description: 'Alimentação alinhada aos seus treinos, à recuperação e aos seus objetivos esportivos.' },
]
const steps = [
  ['Conversa pelo WhatsApp', 'Você conta o que busca e escolhe entre atendimento presencial ou on-line.'],
  ['Consulta individual', 'Um encontro para entender sua rotina, sua história e seus objetivos.'],
  ['Plano para a sua vida', 'Orientações pensadas para caber na sua rotina, sem complicação.'],
]
const faqs = [
  ['Como funciona o atendimento on-line?', 'O atendimento acontece a distância, com uma consulta individualizada para conversar sobre sua rotina, alimentação e objetivos. Entre em contato para saber os detalhes e a disponibilidade de horários.'],
  ['Onde acontecem as consultas presenciais?', 'Laiza realiza atendimentos presenciais em Goiânia e Jaraguá, em Goiás. Pelo WhatsApp, você pode confirmar o local, os horários disponíveis e agendar sua consulta.'],
  ['Preciso praticar esporte para me consultar?', 'Não. Além da nutrição esportiva, o atendimento clínico contempla saúde intestinal, emagrecimento sustentável e saúde da mulher. O cuidado é direcionado às suas necessidades.'],
  ['Como posso agendar uma consulta?', 'Clique em “Agendar minha consulta” para conversar pelo WhatsApp. Informe se prefere atendimento presencial ou on-line e tire suas dúvidas sobre horários e valores.'],
]
const themes = ['Saúde intestinal', 'Emagrecimento sustentável', 'Saúde da mulher', 'Nutrição esportiva', 'Performance', 'A Nutri que não complica']
const stats = [
  { to: 19.5, suffix: ' mil', decimals: 1, label: 'seguidores no Instagram' },
  { to: 7, prefix: '+', label: 'países atendidos on-line' },
  { to: 1327, label: 'publicações com conteúdo de nutrição' },
]

function formatCount(v: number, decimals = 0) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const links = [['Sobre a Laiza', '#sobre'], ['Especialidades', '#especialidades'], ['Atendimentos', '#atendimentos'], ['Dúvidas', '#duvidas']]

  // Scroll: barra de progresso, header e parallax do hero
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--progress', String(max > 0 ? y / max : 0))
      el.style.setProperty('--hero-shift', `${Math.min(y, 900) * 0.18}px`)
      el.classList.toggle('is-scrolled', y > 40)
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Revelar elementos ao rolar + contadores
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const runCount = (node: HTMLElement) => {
      const to = Number(node.dataset.count)
      const decimals = Number(node.dataset.decimals || 0)
      const prefix = node.dataset.prefix || ''
      const suffix = node.dataset.suffix || ''
      if (reduce) { node.textContent = prefix + formatCount(to, decimals) + suffix; return }
      const start = performance.now(), dur = 1600
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        node.textContent = prefix + formatCount(to * eased, decimals) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const t = entry.target as HTMLElement
        t.classList.add('is-in')
        t.querySelectorAll<HTMLElement>('[data-count]').forEach(runCount)
        if (t.dataset.count) runCount(t)
        io.unobserve(t)
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' })
    root.querySelectorAll('[data-reveal]').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  // Menu mobile: trava a rolagem e fecha com Esc
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [menuOpen])

  return <div ref={rootRef} className="page">
    <div className="intro" aria-hidden="true"><BrandSymbol draw /><span className="intro-name">Laiza Carvalho</span><span className="intro-caption">A Nutri que não complica</span></div>
    <div className="progress" aria-hidden="true"><span /></div>

    <header className="site-header" id="inicio">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}<AppointmentButton children="Agendar consulta" /></nav>
      <Button variant="ghost" size="icon" className="menu-trigger" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="menu-mobile" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>
    <nav id="menu-mobile" className={`mobile-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação celular" aria-hidden={!menuOpen}>
      {links.map(([label, href], i) => <a key={href} href={href} style={{ ['--i' as string]: i }} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <div style={{ ['--i' as string]: links.length }} className="mobile-nav-cta"><AppointmentButton /></div>
      <a className="mobile-nav-social" href={instagram} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}><Instagram size={18}/>@nutrilaizacarvalho</a>
    </nav>

    <main>
      <section className="hero" aria-label="Laiza Carvalho, nutricionista">
        <img className="hero-photo" src={portrait.url} alt="Laiza Carvalho em seu consultório, trabalhando em um plano nutricional" fetchPriority="high" />
        <span className="hero-leaf hero-leaf-a" aria-hidden="true"><Leaf strokeWidth={0.8}/></span>
        <span className="hero-leaf hero-leaf-b" aria-hidden="true"><Sprout strokeWidth={0.8}/></span>
        <div className="hero-inner">
          <div className="eyebrow hero-in" style={{ ['--d' as string]: 0 }}>Laiza Carvalho · Nutricionista · CRN 9396</div>
          <h1>
            <span className="line"><span style={{ ['--d' as string]: 1 }}>Nutrição para</span></span>
            <span className="line"><span style={{ ['--d' as string]: 2 }}>a vida real.</span></span>
            <span className="line"><em style={{ ['--d' as string]: 3 }}>Sem complicar.</em></span>
          </h1>
          <p className="hero-description hero-in" style={{ ['--d' as string]: 4 }}>Mais saúde, equilíbrio e liberdade à mesa.<br/>Um cuidado que respeita quem você é e faz sentido para a sua rotina.</p>
          <div className="hero-in" style={{ ['--d' as string]: 5 }}><AppointmentButton light /></div>
          <div className="hero-caption hero-in" style={{ ['--d' as string]: 6 }}><Check size={13}/> Atendimento presencial e on-line</div>
        </div>
        <div className="hero-signature hero-in" style={{ ['--d' as string]: 7 }}><strong>Laiza Carvalho</strong><span>A Nutri que não complica.</span></div>
        <a className="scroll-cue" href="#especialidades" aria-label="Rolar para baixo"><span /></a>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1].map((k) => <div className="marquee-group" key={k}>{themes.map((t) => <span key={t + k}><Leaf size={14} strokeWidth={1.2}/>{t}</span>)}</div>)}</div></div>

      <div className="trust-strip" data-reveal>
        <div className="trust-item" style={{ ['--i' as string]: 0 }}><GraduationCap/><div><strong>Nutrição clínica e esportiva</strong><span>American College · Estados Unidos</span></div></div>
        <div className="trust-item" style={{ ['--i' as string]: 1 }}><MapPin/><div><strong>Goiânia & Jaraguá, GO</strong><span>Cuidado de perto, no atendimento presencial</span></div></div>
        <div className="trust-item" style={{ ['--i' as string]: 2 }}><Globe2/><div><strong>Presente em mais de 7 países</strong><span>Nutrição sem fronteiras, no atendimento on-line</span></div></div>
      </div>

      <section id="especialidades" className="section">
        <div className="section-intro" data-reveal><div><div className="eyebrow">Um olhar completo para você</div><h2 className="section-heading">Seu objetivo. <em>Nosso caminho.</em></h2></div><p>Cada corpo tem uma história. Seu cuidado nutricional também precisa ser único.</p></div>
        <div className="specialties" data-reveal>{specialties.map(({ icon: Icon, name, description }, i) => <article className="specialty" style={{ ['--i' as string]: i }} key={name}><span className="specialty-number">0{i + 1}</span><span className="specialty-icon-wrap"><Icon className="specialty-icon"/></span><h3>{name}</h3><p>{description}</p><a className="specialty-link" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Conversar sobre ${name}`}>Vamos conversar<ArrowUpRight size={15}/></a></article>)}</div>
      </section>

      <section id="sobre" className="about-band">
        <div className="section about-layout"><div className="about-photo-wrap" data-reveal="mask"><div className="about-frame"><img className="about-photo" src={aboutPortrait.url} alt="Nutricionista Laiza Carvalho em atendimento no consultório" loading="lazy"/></div><div className="photo-label"><GraduationCap/><span>Ciência no cuidado.<br/>Leveza no dia a dia.</span></div></div>
          <div className="about-copy" data-reveal><div className="eyebrow">Prazer, sua nutri</div><h2 className="section-heading">Sou Laiza Carvalho.<br/><em>A Nutri que não complica.</em></h2><p>Acredito em uma nutrição que cabe na vida — não em uma vida que precisa caber em uma dieta.</p><p>Meu trabalho une o cuidado clínico à nutrição esportiva, com um olhar atento à saúde intestinal, ao emagrecimento sustentável, à saúde da mulher e à performance.</p><p>Seja no consultório ou do outro lado da tela, o ponto de partida é você: sua rotina, suas necessidades e o que deseja construir para a sua saúde.</p><p className="about-quote">Comer bem pode ser mais leve<br/>do que você imagina.</p><div className="about-credentials"><GraduationCap size={18}/> Nutricionista esportiva · American College 🇺🇸</div><AppointmentButton children="Quero cuidar de mim"/></div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="stats" data-reveal>{stats.map((s, i) => <div className="stat" style={{ ['--i' as string]: i }} key={s.label}><strong data-count={s.to} data-decimals={s.decimals ?? 0} data-prefix={s.prefix ?? ''} data-suffix={s.suffix ?? ''}>{(s.prefix ?? '') + formatCount(s.to, s.decimals ?? 0) + (s.suffix ?? '')}</strong><span>{s.label}</span></div>)}</div>
      </section>

      <section className="steps-band">
        <div className="section">
          <div className="section-intro" data-reveal><div><div className="eyebrow">Como começa</div><h2 className="section-heading">Do primeiro oi<br/><em>ao seu plano.</em></h2></div><p>Um começo simples, sem burocracia e sem pressão.</p></div>
          <ol className="steps" data-reveal>{steps.map(([title, text], i) => <li key={title} style={{ ['--i' as string]: i }}><span className="step-index">{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        </div>
      </section>

      <section id="atendimentos" className="section"><div data-reveal><div className="eyebrow">Perto de você, onde você estiver</div><h2 className="section-heading">O mesmo cuidado.<br/><em>Diferentes formas de estar perto.</em></h2></div><div className="appointment-grid" data-reveal>
        <article className="appointment" style={{ ['--i' as string]: 0 }}><MapPin size={30}/><h3>No consultório</h3><p>Um encontro para olhar de perto para sua saúde, entender sua história e alinhar a alimentação aos seus objetivos.</p><div className="appointment-meta"><MapPin/>Goiânia e Jaraguá · Goiás</div><AppointmentButton children="Agendar presencial"/></article>
        <article className="appointment" style={{ ['--i' as string]: 1 }}><Monitor size={30}/><h3>De onde você estiver</h3><p>Cuidado individualizado e conexão de verdade, com a praticidade de uma consulta on-line que acompanha a sua rotina.</p><div className="appointment-meta"><Globe2/>Atendimento em mais de 7 países</div><AppointmentButton children="Agendar on-line"/></article>
      </div></section>

      <section className="insta-band">
        <div className="section insta-layout" data-reveal>
          <div><div className="eyebrow">Todo dia tem conteúdo</div><h2 className="section-heading">Acompanhe a Laiza<br/><em>no Instagram.</em></h2><p>Dicas de alimentação, saúde intestinal, treino e rotina — sem complicar, direto no seu feed.</p></div>
          <a className="insta-card" href={instagram} target="_blank" rel="noopener noreferrer"><span className="insta-icon"><Instagram/></span><span className="insta-handle">@nutrilaizacarvalho</span><span className="insta-meta">19,5 mil seguidores · 1.327 publicações</span><span className="insta-go">Seguir no Instagram<ArrowUpRight size={15}/></span></a>
        </div>
      </section>

      <section id="duvidas" className="about-band"><div className="section faq-layout"><div className="faq-copy" data-reveal><div className="eyebrow">Antes do nosso encontro</div><h2 className="section-heading">Vamos tirar<br/><em>suas dúvidas?</em></h2><p>Seu primeiro passo pode ser uma conversa. Estou aqui para te ajudar.</p></div><div data-reveal><Accordion type="single" collapsible className="faq-list">{faqs.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></div></section>

      <section className="contact-band"><span className="contact-leaf" aria-hidden="true"><Leaf strokeWidth={0.6}/></span><div data-reveal><div className="eyebrow">Seu próximo capítulo começa com você</div><h2 className="section-heading">Vamos cuidar da sua saúde?</h2><p>Uma nutrição possível, um passo de cada vez.</p></div><div data-reveal><AppointmentButton light children="Conversar com a Laiza"/></div></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><Brand/><div className="footer-info">Nutricionista · CRN 9396<br/>Goiânia & Jaraguá, GO · Atendimento on-line</div><a className="footer-social" href={instagram} target="_blank" rel="noopener noreferrer"><Instagram/>@nutrilaizacarvalho<ArrowUpRight size={13}/></a></div><div className="footer-bottom"><span>© 2026 Laiza Carvalho. Todos os direitos reservados.</span><a href="mailto:laizadanyelle@hotmail.com">laizadanyelle@hotmail.com</a><span>Nutrição com ciência. Cuidado com você.</span></div></footer>

    <div className="mobile-cta"><Button asChild variant="consultation"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Agendar pelo WhatsApp</a></Button></div>
    <Button asChild variant="consultation" className="whatsapp-float"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar com Laiza pelo WhatsApp" title="Conversar pelo WhatsApp"><MessageCircle/></a></Button>
  </div>
}
