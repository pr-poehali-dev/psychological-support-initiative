import Icon from "@/components/ui/icon";
import { Reveal, HERO_IMG, ABOUT_IMG, NAV, PAIN_CARDS, ABOUT_TAGS } from "./shared";

interface HeaderProps {
  dark: boolean;
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggleDark: () => void;
}

export function Header({ dark, scrolled, mobileOpen, setMobileOpen, toggleDark }: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
          backdropFilter: "blur(16px)",
          borderColor: "var(--color-divider)",
          boxShadow: scrolled ? "0 1px 6px rgba(42,37,32,0.08)" : "none",
          transition: "box-shadow 200ms ease",
        }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="var(--color-primary)" strokeWidth="1.5"/>
                <path d="M18 10 C14 10,10 13,10 17 C10 21,13 24,17 24.5 L17 27 L16 28.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M18 10 C22 10,26 13,26 17 C26 21,23 24,19 24.5 L19 27 L20 28.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <circle cx="18" cy="15" r="2.5" fill="var(--color-primary)" opacity="0.7"/>
              </svg>
              <span style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: "1.25rem" }}>Ольга</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <ul className="flex gap-6 list-none">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="nav-link text-sm transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="text-sm font-medium px-5 py-2 rounded-full border-[1.5px] transition-all"
                style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--color-primary)"; el.style.color = "var(--color-text-inverse)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--color-primary)"; }}>
                Записаться
              </a>
              <button onClick={toggleDark} className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                style={{ color: "var(--color-text-muted)" }}>
                <Icon name={dark ? "Sun" : "Moon"} size={18} />
              </button>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} style={{ color: "var(--color-text-muted)" }}>
              <Icon name="Menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col p-6" style={{ background: "var(--color-bg)" }}>
          <button className="self-end w-11 h-11 flex items-center justify-center rounded-full"
            style={{ background: "var(--color-surface-offset)" }}
            onClick={() => setMobileOpen(false)}>
            <Icon name="X" size={20} />
          </button>
          <ul className="flex flex-col gap-7 mt-10 list-none">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(1.5rem,5vw,2.25rem)" }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setMobileOpen(false)}
            className="mt-8 py-4 rounded-full text-center text-base font-medium"
            style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
            Записаться бесплатно
          </a>
        </div>
      )}
    </>
  );
}

export function HeroSection() {
  return (
    <section className="pt-16">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
        style={{ paddingTop: "clamp(3rem,8vw,5rem)", paddingBottom: "clamp(3rem,8vw,5rem)", minHeight: "90vh" }}>
        <div>
          <Reveal>
            <p className="section-label">Психолог · Социальная психология</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: "clamp(2.4rem,1rem + 4vw,4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Вы справляетесь.<br />
              Но внутри —{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>давно не спокойно.</em>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Усталость, которую не объяснить словами. Тревога без причины. Ощущение, что живёте «не своей жизнью» — хотя всё вроде бы хорошо. Вы не одни. И с этим можно работать.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all"
                style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
                Записаться на бесплатную встречу
                <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border-[1.5px] transition-all"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
                Узнать больше
              </a>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="flex items-center gap-3 mt-8">
              <div className="flex">
                {["М","А","Е","С"].map((l, i) => (
                  <span key={l} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", borderColor: "var(--color-bg)", marginLeft: i === 0 ? 0 : -8 }}>
                    {l}
                  </span>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                <strong style={{ color: "var(--color-text)" }}>Более 100 клиентов</strong> уже прошли путь к себе
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="relative md:block">
          <div className="absolute -inset-5 rounded-2xl opacity-50"
            style={{ background: "linear-gradient(135deg, var(--color-primary-light) 0%, transparent 70%)" }} />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
            <img src={HERO_IMG} alt="Психолог Ольга" className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-xl p-4 flex items-center gap-3 shadow-lg border"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <span className="text-2xl">🎓</span>
            <div>
              <strong className="block text-sm" style={{ color: "var(--color-text)" }}>Дипломированный психолог</strong>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Социальная психология</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PainPointsSection() {
  return (
    <section id="pain" className="py-20 md:py-24" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal><p className="section-label">Вы попали по адресу</p></Reveal>
        <Reveal delay={1}><h2 className="mb-3" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)" }}>Узнайте себя</h2></Reveal>
        <Reveal delay={2}><p className="text-sm mb-10" style={{ color: "var(--color-text-muted)", maxWidth: "56ch", lineHeight: 1.7 }}>Если хотя бы один из этих пунктов резонирует — вы на нужной странице.</p></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAIN_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i % 3, 3) as 0|1|2|3}>
              <div className="card-hover rounded-xl p-5 border flex gap-4 items-start h-full"
                style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}>
                <div className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: "var(--color-primary-light)" }}>{c.icon}</div>
                <div>
                  <strong className="block text-sm mb-1" style={{ color: "var(--color-text)" }}>{c.title}</strong>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "3/4" }}>
              <img src={ABOUT_IMG} alt="Ольга в рабочей обстановке" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -top-5 -right-5 rounded-xl p-5 text-center shadow-lg"
              style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
              <span className="block" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", lineHeight: 1 }}>10+</span>
              <span className="text-xs opacity-80">лет опыта</span>
            </div>
          </Reveal>
          <div>
            <Reveal><p className="section-label">Обо мне</p></Reveal>
            <Reveal delay={1}><h2 className="mb-5" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)" }}>Почему именно я</h2></Reveal>
            <Reveal delay={2}>
              <p className="text-base md:text-lg italic mb-5 pl-5 leading-relaxed"
                style={{ fontFamily: "Instrument Serif, serif", color: "var(--color-text-muted)", borderLeft: "3px solid var(--color-primary)" }}>
                «Я знаю изнутри, что значит выгорание — из жизни, не из книг.»
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
                Меня зовут Ольга. Я практикующий психолог в области социальной психологии. За моими плечами — годы работы с людьми в условиях высокого давления: крупные предприятия, сложные коллективы, кризисные ситуации.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
                Именно поэтому я стала психологом — не из книг, а из жизни. Я работаю со взрослыми людьми, которые умеют держаться. Которые давно привыкли «быть сильными». И которые наконец решили позаботиться о себе.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <div className="flex flex-wrap gap-2">
                {ABOUT_TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
