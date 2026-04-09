import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/bucket/dd888cac-31bb-45c1-a539-ba233ec9ef8d.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/8248a09a-6ca8-48ba-815d-c3632a626971.jpg";

const NAV = [
  { label: "Обо мне", href: "#about" },
  { label: "Как работаю", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Отзывы", href: "#testimonials" },
];

const PAIN_CARDS = [
  { icon: "😮‍💨", title: "Хроническая усталость", text: "Вы устаёте, даже когда выспались. Формально «всё нормально», но сил ни на что нет." },
  { icon: "🫀", title: "Тревога без причины", text: "Непонятное беспокойство, которое сложно объяснить. Постоянное ощущение «что-то пойдёт не так»." },
  { icon: "🪞", title: "Кризис идентичности", text: "Ощущение потери себя. Непонятно, чего вы хотите и куда двигаться дальше." },
  { icon: "🧩", title: "Сложности с границами", text: "Трудно говорить «нет» без чувства вины. Чужие нужды часто важнее ваших." },
  { icon: "🌊", title: "После потрясений", text: "Развод, потеря работы, переезд — что-то внутри изменилось, а поддержки нет." },
  { icon: "🔥", title: "Выгорание", text: "Работа когда-то нравилась. Теперь — только обязанность. Нет ни интереса, ни энергии." },
];

const PROCESS_STEPS = [
  { icon: "☕", title: "Знакомство", text: "30 минут бесплатно. Рассказываете, что происходит. Я слушаю без оценок. Определяем, с чего начать.", free: true },
  { icon: "🎯", title: "Первая сессия", text: "Углублённый разбор запроса. Совместно формируем цели — конкретно, без абстракций и пустых обещаний.", free: false },
  { icon: "🌱", title: "Регулярная работа", text: "1–2 встречи в неделю по 50 минут. Вы двигаетесь в своём темпе. Я рядом на каждом этапе.", free: false },
  { icon: "✨", title: "Результат", text: "Конкретные изменения в поведении, состоянии и отношениях. Не «осознание» — настоящие сдвиги.", free: false },
];

const RESULTS = [
  "Перестанете просыпаться с тревогой без видимой причины",
  "Научитесь говорить «нет» — без вины и без скандала",
  "Поймёте, чего вы на самом деле хотите от жизни",
  "Восстановите энергию и интерес к тому, что радовало",
  "Почувствуете устойчивость — даже когда вокруг неопределённость",
];

const STATS = [
  { num: "63%", desc: "клиентов продолжают работу более 6 месяцев" },
  { num: "8–12", desc: "сессий — средняя продолжительность для заметных изменений" },
  { num: "100%", desc: "конфиденциальность всех данных и разговоров" },
];

const TESTIMONIALS = [
  { initial: "М", name: "Марина", meta: "47 лет, Владивосток", text: "Я пришла с ощущением, что просто устала от всего. Через два месяца работы с Ольгой я снова узнала себя. Это не магия — это честная, глубокая работа." },
  { initial: "А", name: "Андрей", meta: "52 года, онлайн", text: "Никогда не думал, что мужчинам нужен психолог. После кризиса на работе понял — нужен. Ольга помогла найти точку опоры, когда казалось, что всё рушится." },
  { initial: "Е", name: "Екатерина", meta: "39 лет, Хабаровск", text: "Работаем онлайн. Сначала боялась, что «не то». Оказалось — очень глубоко и по-настоящему. Рекомендую всем, кто думает «может, само пройдёт»." },
];

const PRICING = [
  { name: "Знакомство", price: "Бесплатно", priceDetail: "", desc: "30 минут. Рассказываете, что происходит. Без обязательств. Просто поговорим.", featured: false, free: true },
  { name: "Разовая сессия", price: "2 500 ₽", priceDetail: "/ 50 мин", desc: "Онлайн или очно. Подходит для первичной консультации или разового вопроса.", featured: false, free: false },
  { name: "Пакет 4 сессии", price: "9 000 ₽", priceDetail: "/ месяц", desc: "Месяц работы. Скидка 10%. Оптимально для разбора конкретного запроса.", featured: true, free: false },
  { name: "Пакет 8 сессий", price: "17 000 ₽", priceDetail: "/ 2 месяца", desc: "Глубокая работа с запросом. Максимальный результат. Экономия 15%.", featured: false, free: false },
];

const ABOUT_TAGS = ["Тревога и стресс", "Выгорание", "Кризисы идентичности", "Семейные конфликты", "Личные границы", "Онлайн и очно"];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-d${delay}` : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/4dc45207-e781-4cb3-961c-a2b1ee3e0ed1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>

      {/* HEADER */}
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

      {/* MOBILE NAV */}
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

      {/* HERO */}
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
                  Записаться бесплатно →
                </a>
                <a href="#about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border-[1.5px] transition-all"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
                  Узнать обо мне
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

      {/* PAIN POINTS */}
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

      {/* ABOUT */}
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

      {/* PROCESS */}
      <section id="process" className="py-20 md:py-24" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal><p className="section-label">Как это работает</p></Reveal>
          <Reveal delay={1}><h2 className="mb-3" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>Четыре шага к себе</h2></Reveal>
          <Reveal delay={2}><p className="text-sm mb-10" style={{ color: "var(--color-text-muted)", maxWidth: "56ch", lineHeight: 1.7 }}>Не нужно точно знать «что не так». Именно для этого существует первая встреча.</p></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 3) as 0|1|2|3}>
                <div className="relative rounded-2xl p-6 border h-full"
                  style={{
                    background: s.free ? "var(--color-primary-light)" : "var(--color-surface)",
                    borderColor: s.free ? "var(--color-primary)" : "var(--color-border)",
                  }}>
                  <span className="absolute top-4 right-5 text-2xl font-bold opacity-20"
                    style={{ fontFamily: "Instrument Serif, serif", color: "var(--color-primary)" }}>
                    0{i + 1}
                  </span>
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="mb-2 text-lg" style={{ fontFamily: "Instrument Serif, serif" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-20 md:py-24" style={{ background: "var(--color-text)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ width: 20, height: 1.5, background: "rgba(255,255,255,0.5)", flexShrink: 0, display: "inline-block" }} />
              После нашей работы
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mb-10" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "white" }}>
              Что изменится в вашей жизни
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="flex flex-col gap-3 list-none">
              {RESULTS.map((r, i) => (
                <Reveal key={r} delay={Math.min(i, 3) as 0|1|2|3}>
                  <li className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--color-primary)" }}>
                      <Icon name="Check" size={13} className="text-white" />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{r}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              {STATS.map((s, i) => (
                <Reveal key={s.num} delay={Math.min(i, 3) as 0|1|2|3}>
                  <div className="rounded-2xl p-6 text-center border"
                    style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}>
                    <span className="block mb-1" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "white", lineHeight: 1 }}>{s.num}</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal><p className="section-label">Отзывы</p></Reveal>
          <Reveal delay={1}><h2 className="mb-10" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>Что говорят клиенты</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i, 3) as 0|1|2|3}>
                <div className="card-hover rounded-2xl p-7 border flex flex-col gap-5 h-full"
                  style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}>
                  <div className="text-base" style={{ color: "var(--color-accent-warm)" }}>★★★★★</div>
                  <p className="flex-1 text-base italic leading-relaxed"
                    style={{ fontFamily: "Instrument Serif, serif", color: "var(--color-text-muted)" }}>
                    «{t.text}»
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--color-divider)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs" style={{ color: "var(--color-text-faint)" }}>{t.meta}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-24" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal><p className="section-label">Форматы работы</p></Reveal>
          <Reveal delay={1}><h2 className="mb-3" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>Выберите свой формат</h2></Reveal>
          <Reveal delay={2}><p className="text-sm mb-10" style={{ color: "var(--color-text-muted)", maxWidth: "56ch", lineHeight: 1.7 }}>Все консультации онлайн (Telegram, Zoom) или очно во Владивостоке — по договорённости.</p></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i, 3) as 0|1|2|3}>
                <div className="card-hover rounded-2xl p-6 border flex flex-col relative h-full"
                  style={{
                    background: p.featured ? "var(--color-primary-light)" : "var(--color-surface)",
                    borderColor: p.featured ? "var(--color-primary)" : "var(--color-border)",
                    outline: p.featured ? "2px solid var(--color-primary)" : "none",
                  }}>
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap"
                      style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
                      Популярный
                    </span>
                  )}
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)" }}>{p.name}</div>
                  <div className="mb-2" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(1.5rem,1.2rem+1.2vw,2.25rem)", color: p.free ? "var(--color-primary)" : "var(--color-text)" }}>
                    {p.price}{" "}
                    <span style={{ fontFamily: "Work Sans, sans-serif", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{p.priceDetail}</span>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 border-t pt-4 mb-6" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-divider)" }}>{p.desc}</p>
                  <a href="#contact" className="w-full py-2.5 rounded-full text-sm font-medium text-center transition-all block"
                    style={p.featured
                      ? { background: "var(--color-primary)", color: "var(--color-text-inverse)" }
                      : { border: "1.5px solid var(--color-border)", color: "var(--color-text)" }}>
                    {p.free ? "Записаться →" : "Начать →"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-24" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <Reveal><p className="section-label justify-center">Сделайте первый шаг</p></Reveal>
          <Reveal delay={1}>
            <h2 className="mb-4" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>
              Это проще,<br />чем кажется
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
              Вам не нужно точно знать «что не так». Именно для этого существует первая встреча. Просто напишите — и мы договоримся о времени, удобном для вас.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="rounded-2xl p-6 border text-left mb-8" style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}>
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                    style={{ background: "var(--color-primary-light)" }}>
                    <Icon name="Check" size={28} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "Instrument Serif, serif" }}>Заявка отправлена!</h3>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Ольга свяжется с вами в течение часа.</p>
                  <button onClick={() => setFormStatus("idle")} className="mt-2 text-xs underline" style={{ color: "var(--color-text-faint)" }}>Отправить ещё</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  {[
                    { key: "name", label: "Ваше имя", placeholder: "Как вас зовут?", type: "text" },
                    { key: "phone", label: "Телефон или Telegram", placeholder: "+7 (___) ___-__-__", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>{label}</label>
                      <input type={type} placeholder={placeholder} required={key !== "message"}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)", fontFamily: "inherit" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>С чем хотите поработать?</label>
                    <textarea rows={3} placeholder="Опишите в нескольких словах (необязательно)"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)", fontFamily: "inherit" }} />
                  </div>
                  {formStatus === "error" && (
                    <p className="text-xs text-red-500 text-center">Произошла ошибка. Попробуйте ещё раз или напишите напрямую.</p>
                  )}
                  <button type="submit" disabled={formStatus === "loading"}
                    className="w-full py-3.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
                    style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)", opacity: formStatus === "loading" ? 0.7 : 1 }}>
                    {formStatus === "loading" ? <><Icon name="Loader" size={16} className="animate-spin" /> Отправляем...</> : "Отправить заявку"}
                  </button>
                  <p className="text-center text-xs" style={{ color: "var(--color-text-faint)" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a href="https://t.me/igraol" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium"
                style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
                <Icon name="Send" size={16} /> Написать в Telegram
              </a>
              <a href="tel:+79142755070"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border-[1.5px]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
                <Icon name="Phone" size={16} /> Позвонить
              </a>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-5 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <span className="flex items-center justify-center gap-1.5"><Icon name="Clock" size={14} /> Отвечаю в течение часа</span>
              <span className="flex items-center justify-center gap-1.5"><Icon name="MapPin" size={14} /> Владивосток, онлайн по России</span>
              <span className="flex items-center justify-center gap-1.5"><Icon name="Lock" size={14} /> Конфиденциальность</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ background: "var(--color-text)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "Instrument Serif, serif", fontSize: "1.25rem", color: "white" }}>Ольга — психолог</span>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="tel:+79142755070" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={13} /> +7 914 275-50-70
            </a>
            <a href="https://t.me/igraol" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Icon name="Send" size={13} /> @igraol
            </a>
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026. Все права защищены.</div>
        </div>
      </footer>

    </div>
  );
}