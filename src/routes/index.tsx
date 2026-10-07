import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Leaf, Heart, Activity, Sprout, MapPin, Globe2, GraduationCap, Check, Instagram, Menu, X, MessageCircle, Monitor, ArrowDown, ArrowRight } from 'lucide-react'
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

function Brand() {
  return <a href="#inicio" className="brand" aria-label="Laiza Carvalho — início">
    <svg className="brand-symbol" viewBox="0 0 44 52" fill="none" aria-hidden="true"><path d="M22 47V15M22 30C5 30 5 10 5 10c17 0 17 20 17 20ZM22 23C39 23 39 3 39 3 22 3 22 23 22 23Z" stroke="currentColor" strokeWidth="1.3"/><path d="M15 47h14M11 16l11 14M33 9 22 23" stroke="currentColor" strokeWidth="1"/></svg>
    <span><span className="brand-name">Laiza Carvalho</span><span className="brand-caption">Nutrição clínica & esportiva</span></span>
  </a>
}
function AppointmentButton({ light = false, children = 'Agendar minha consulta', modality }: { light?: boolean; children?: React.ReactNode; modality?: 'presencial' | 'on-line' }) {
  const appointmentLink = modality ? 'https://wa.me/5562985398939?text=' + encodeURIComponent(`Olá, Laiza! Gostaria de saber mais sobre a consulta ${modality} e os horários disponíveis.`) : whatsapp
  return <Button asChild variant={light ? 'light' : 'consultation'}><a href={appointmentLink} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16}/></a></Button>
}
const specialties = [
  { icon: Leaf, name: 'Saúde intestinal', description: 'Cuidado com o seu intestino para mais equilíbrio, conforto e bem-estar no dia a dia.' },
  { icon: Sprout, name: 'Emagrecimento sustentável', description: 'Mudanças possíveis, respeitando seu corpo e sua rotina. Sem atalhos, com constância.' },
  { icon: Heart, name: 'Saúde da mulher', description: 'Nutrição que acolhe suas necessidades e acompanha as diferentes fases da sua vida.' },
  { icon: Activity, name: 'Esporte & performance', description: 'Alimentação alinhada aos seus treinos, à recuperação e aos seus objetivos esportivos.' },
]
const faqs = [
  ['Como funciona o atendimento on-line?', 'O atendimento acontece a distância, com uma consulta individualizada para conversar sobre sua rotina, alimentação e objetivos. Entre em contato para saber os detalhes e a disponibilidade de horários.'],
  ['Onde acontecem as consultas presenciais?', 'Laiza realiza atendimentos presenciais em Goiânia e Jaraguá, em Goiás. Pelo WhatsApp, você pode confirmar o local, os horários disponíveis e agendar sua consulta.'],
  ['Preciso praticar esporte para me consultar?', 'Não. Além da nutrição esportiva, o atendimento clínico contempla saúde intestinal, emagrecimento sustentável e saúde da mulher. O cuidado é direcionado às suas necessidades.'],
  ['Como posso agendar uma consulta?', 'Clique em “Agendar minha consulta” para conversar pelo WhatsApp. Informe se prefere atendimento presencial ou on-line e tire suas dúvidas sobre horários e valores.'],
]
function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#inicio')
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = pageRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    elements.forEach(el => { if (!reduced) el.classList.add('will-reveal'); observer.observe(el) })
    const sections = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive('#' + entry.target.id) })
    }, { rootMargin: '-15% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(el => sections.observe(el))
    let frame = 0
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { setScrolled(window.scrollY > 20); const total = document.documentElement.scrollHeight - window.innerHeight; setProgress(total > 0 ? window.scrollY / total : 0) }) }
    window.addEventListener('scroll', update, { passive: true }); update()
    return () => { observer.disconnect(); sections.disconnect(); window.removeEventListener('scroll', update); cancelAnimationFrame(frame) }
  }, [])
  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])
  const links = [['Sobre a Laiza', '#sobre'], ['Especialidades', '#especialidades'], ['Como funciona', '#jornada'], ['Atendimentos', '#atendimentos']]
  return <div ref={pageRef}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} className={active === href ? 'active' : ''}>{label}</a>)}<AppointmentButton children="Agendar consulta" /></nav>
      <Button variant="ghost" size="icon" className="menu-trigger" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação celular">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<AppointmentButton /></nav>}
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero" aria-label="Laiza Carvalho, nutricionista">
        <img className="hero-photo" src={portrait.url} alt="Laiza Carvalho em seu consultório, trabalhando em um plano nutricional" fetchPriority="high" />
        <div className="hero-inner"><span className="hero-pill"><span/> Cuidado que cabe na sua vida</span>
          <div className="eyebrow">Laiza Carvalho · Nutricionista · CRN 9396</div>
          <h1>Comer bem.<br/>Viver melhor.<br/><em>Sem complicar.</em></h1>
          <p className="hero-description">Mais saúde, equilíbrio e liberdade à mesa.<br/>Um cuidado que respeita quem você é e faz sentido para a sua rotina.</p>
          <div className="hero-actions"><AppointmentButton light /><a className="text-link" href="#sobre">Conheça sua nutri <ArrowDown size={15}/></a></div>
          <div className="hero-caption"><Check size={13}/> Atendimento presencial e on-line</div>
        </div>
        <a className="scroll-hint" href="#especialidades" aria-label="Conhecer as especialidades"><ArrowDown size={18}/></a><div className="hero-signature"><strong>Laiza Carvalho</strong><span>A Nutri que não complica.</span></div>
      </section>
      <div className="trust-strip" data-reveal>
        <div className="trust-item"><GraduationCap/><div><strong>Nutrição clínica e esportiva</strong><span>American College · Estados Unidos</span></div></div>
        <div className="trust-item"><MapPin/><div><strong>Goiânia & Jaraguá, GO</strong><span>Cuidado de perto, no atendimento presencial</span></div></div>
        <div className="trust-item"><Globe2/><div><strong>Presente em mais de 7 países</strong><span>Nutrição sem fronteiras, no atendimento on-line</span></div></div>
      </div>
      <section id="especialidades" className="section">
        <div className="section-intro" data-reveal><div><div className="eyebrow">Um olhar completo para você</div><h2 className="section-heading">Seu objetivo. <em>Nosso caminho.</em></h2></div><p>Cada corpo tem uma história. Seu cuidado nutricional também precisa ser único.</p></div>
        <div className="specialties">{specialties.map(({ icon: Icon, name, description }, i) => <article className="specialty" data-reveal style={{ transitionDelay: `${i * 75}ms` }} key={name}><span className="specialty-number">0{i + 1}</span><Icon className="specialty-icon"/><h3>{name}</h3><p>{description}</p><a className="specialty-link" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Conversar sobre ${name}`}>Vamos conversar<ArrowUpRight size={15}/></a></article>)}</div>
      </section>
      <section id="sobre" className="about-band">
        <div className="section about-layout"><div className="about-photo-wrap" data-reveal><img className="about-photo" src={aboutPortrait.url} alt="Nutricionista Laiza Carvalho em atendimento no consultório" loading="lazy"/><div className="photo-label"><GraduationCap/><span>Ciência no cuidado.<br/>Leveza no dia a dia.</span></div></div>
          <div className="about-copy" data-reveal><div className="eyebrow">Prazer, sua nutri</div><h2 className="section-heading">Sou Laiza Carvalho.<br/><em>A Nutri que não complica.</em></h2><p>Acredito em uma nutrição que cabe na vida — não em uma vida que precisa caber em uma dieta.</p><p>Meu trabalho une o cuidado clínico à nutrição esportiva, com um olhar atento à saúde intestinal, ao emagrecimento sustentável, à saúde da mulher e à performance.</p><p>Seja no consultório ou do outro lado da tela, o ponto de partida é você: sua rotina, suas necessidades e o que deseja construir para a sua saúde.</p><p className="about-quote">Comer bem pode ser mais leve<br/>do que você imagina.</p><div className="about-credentials"><GraduationCap size={18}/> Nutricionista esportiva · American College 🇺🇸</div><AppointmentButton children="Quero cuidar de mim"/></div>
        </div>
      </section>
      <section className="philosophy-band"><div className="section" data-reveal><span className="eyebrow">Menos regras impossíveis. Mais vida.</span><p>Uma alimentação que respeita<br/>o seu corpo, <em>a sua história</em><br/>e o seu tempo.</p><span className="philosophy-note">Ciência para orientar. Escuta para entender. Leveza para continuar.</span><Leaf className="philosophy-leaf" aria-hidden="true"/></div></section>
      <section id="jornada" className="section journey-section"><div className="section-intro" data-reveal><div><div className="eyebrow">Um passo de cada vez</div><h2 className="section-heading">O cuidado começa<br/><em>com uma boa conversa.</em></h2></div><p>Você não precisa chegar com tudo resolvido. Vamos entender, juntas, por onde começar.</p></div><div className="journey-grid">{[
        ['01', 'Vamos nos conhecer', 'Sua rotina, preferências, objetivos e dúvidas são o ponto de partida da conversa.'],
        ['02', 'Um caminho possível', 'Orientações nutricionais pensadas para suas necessidades e para a vida que você leva.'],
        ['03', 'Evoluir com constância', 'O cuidado nutricional é um processo. Ajustes e próximos passos são alinhados em consulta.'],
      ].map(([number, title, text]) => <article className="journey-step" data-reveal key={number}><span className="step-number">{number}</span><div className="step-line"/><h3>{title}</h3><p>{text}</p></article>)}</div><a className="inline-cta" href={whatsapp} target="_blank" rel="noopener noreferrer">Quero dar o primeiro passo <ArrowRight size={18}/></a></section>
      <section id="atendimentos" className="section"><div className="eyebrow">Perto de você, onde você estiver</div><h2 className="section-heading">O mesmo cuidado.<br/><em>Diferentes formas de estar perto.</em></h2><div className="appointment-grid">
        <article className="appointment" data-reveal><span className="appointment-tag">Presencial</span><MapPin size={30}/><h3>No consultório</h3><p>Um encontro para olhar de perto para sua saúde, entender sua história e alinhar a alimentação aos seus objetivos.</p><div className="appointment-meta"><MapPin/>Goiânia e Jaraguá · Goiás</div><AppointmentButton modality="presencial" children="Agendar presencial"/></article>
        <article className="appointment" data-reveal><span className="appointment-tag">On-line</span><Monitor size={30}/><h3>De onde você estiver</h3><p>Cuidado individualizado e conexão de verdade, com a praticidade de uma consulta on-line que acompanha a sua rotina.</p><div className="appointment-meta"><Globe2/>Atendimento em mais de 7 países</div><AppointmentButton modality="on-line" children="Agendar on-line"/></article>
      </div></section>
      <section className="about-band"><div className="section faq-layout"><div className="faq-copy" data-reveal><div className="eyebrow">Antes do nosso encontro</div><h2 className="section-heading">Vamos tirar<br/><em>suas dúvidas?</em></h2><p>Seu primeiro passo pode ser uma conversa. Estou aqui para te ajudar.</p></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="instagram-section section" data-reveal><div className="instagram-mark"><Instagram size={32}/></div><div><div className="eyebrow">Nutrição também fora do consultório</div><h2 className="section-heading">Uma dose de leveza<br/><em>no seu dia a dia.</em></h2><p>Conheça mais do meu trabalho, da minha rotina e da forma como enxergo a alimentação.</p></div><a className="instagram-button" href={instagram} target="_blank" rel="noopener noreferrer">Acompanhe no Instagram <ArrowUpRight size={18}/></a></section>
      <section className="contact-band" data-reveal><div><div className="eyebrow">Seu próximo capítulo começa com você</div><h2 className="section-heading">Vamos cuidar da sua saúde?</h2><p>Uma nutrição possível, um passo de cada vez.</p></div><AppointmentButton light children="Conversar com a Laiza"/></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><Brand/><div className="footer-info">Nutricionista · CRN 9396<br/>Goiânia & Jaraguá, GO · Atendimento on-line</div><a className="footer-social" href={instagram} target="_blank" rel="noopener noreferrer"><Instagram/>@nutrilaizacarvalho<ArrowUpRight size={13}/></a></div><div className="footer-bottom"><span>© 2026 Laiza Carvalho. Todos os direitos reservados.</span><a href="mailto:laizadanyelle@hotmail.com">laizadanyelle@hotmail.com</a><span>Nutrição com ciência. Cuidado com você.</span></div></footer>
    <Button asChild variant="consultation" className="whatsapp-float"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar com Laiza pelo WhatsApp" title="Conversar pelo WhatsApp"><MessageCircle/></a></Button>
  </div>
}
