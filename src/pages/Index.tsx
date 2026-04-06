import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/6d5c7600-4e52-4bd3-9c4c-068a52c503ca.jpg";
const ROOM_IMAGE = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/8248a09a-6ca8-48ba-815d-c3632a626971.jpg";

const NAV_LINKS = [
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Гайды", href: "#guides" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "Heart",
    title: "Индивидуальная консультация",
    desc: "Личная встреча или онлайн. Работаем с тем, что тревожит прямо сейчас.",
    price: "от 4 500 ₽",
    duration: "60 мин",
  },
  {
    icon: "Users",
    title: "Парная терапия",
    desc: "Восстановление диалога, доверия и близости в отношениях.",
    price: "от 6 000 ₽",
    duration: "90 мин",
  },
  {
    icon: "Layers",
    title: "Групповая терапия",
    desc: "Безопасное пространство для роста вместе с другими людьми.",
    price: "от 2 500 ₽",
    duration: "120 мин",
  },
  {
    icon: "Sparkles",
    title: "Программа «Перезагрузка»",
    desc: "8 сессий для глубокой работы с паттернами и жизненными сценариями.",
    price: "от 28 000 ₽",
    duration: "8 встреч",
  },
];

const REVIEWS = [
  {
    name: "Анастасия М.",
    text: "Ольга помогла мне увидеть ситуацию с другой стороны. После трёх сессий я почувствовала, что снова держу жизнь в своих руках.",
    rating: 5,
    tag: "Тревога",
  },
  {
    name: "Дмитрий К.",
    text: "Долго откладывал поход к психологу. Теперь жалею только об одном — что не пришёл раньше. Профессионально и по-человечески тепло.",
    rating: 5,
    tag: "Самооценка",
  },
  {
    name: "Юлия Н.",
    text: "Работали с отношениями в паре. Ольга нашла подход к нам обоим, что очень важно. Рекомендую без колебаний.",
    rating: 5,
    tag: "Отношения",
  },
  {
    name: "Сергей Р.",
    text: "Наконец разобрался с причинами своей прокрастинации и выгорания. Чёткий, структурированный подход.",
    rating: 5,
    tag: "Выгорание",
  },
];

const BLOG_POSTS = [
  {
    tag: "Тревога",
    title: "Почему тревога — это не слабость, а сигнал",
    date: "28 марта 2026",
    read: "5 мин",
    emoji: "🌊",
    bg: "hsl(18,72%,92%)",
  },
  {
    tag: "Отношения",
    title: "Три паттерна, которые разрушают близость незаметно",
    date: "15 марта 2026",
    read: "7 мин",
    emoji: "💞",
    bg: "hsl(150,30%,88%)",
  },
  {
    tag: "Самопознание",
    title: "Как начать слышать себя: простая практика на каждый день",
    date: "2 марта 2026",
    read: "4 мин",
    emoji: "🌱",
    bg: "hsl(40,60%,88%)",
  },
];

const GUIDES = [
  { icon: "🧘", title: "Техники заземления при панических атаках", pages: "12 страниц", color: "bg-orange-50" },
  { icon: "📓", title: "Дневник эмоций: как распознавать и принимать чувства", pages: "18 страниц", color: "bg-green-50" },
  { icon: "💬", title: "Как говорить о своих потребностях в отношениях", pages: "10 страниц", color: "bg-amber-50" },
  { icon: "🌿", title: "Первые шаги к восстановлению после выгорания", pages: "14 страниц", color: "bg-teal-50" },
];

const FAQS = [
  {
    q: "С чего начать, если я никогда не был у психолога?",
    a: "Начните с бесплатной 15-минутной встречи-знакомства. Я расскажу о своём подходе, вы сможете задать вопросы и решить, комфортно ли вам работать вместе.",
  },
  {
    q: "Онлайн-консультации так же эффективны, как очные?",
    a: "Да. Исследования подтверждают, что онлайн-формат не уступает очному по результативности. Многие клиенты даже предпочитают его из-за удобства.",
  },
  {
    q: "Как часто нужно приходить на сессии?",
    a: "Обычно раз в неделю, особенно в начале работы. Со временем частота может снизиться. Мы обсудим оптимальный ритм на первой встрече.",
  },
  {
    q: "Сколько сессий потребуется?",
    a: "Зависит от запроса. Разовые вопросы решаются за 3–5 встреч. Глубинная работа с паттернами — от 3 месяцев. Прогресс вы почувствуете уже после первых сессий.",
  },
  {
    q: "Конфиденциальна ли информация, которую я рассказываю?",
    a: "Абсолютно. Всё, что вы говорите, остаётся между нами. Это основа профессиональной этики психолога.",
  },
];

const ACCENT = "hsl(18,72%,48%)";
const ACCENT_LIGHT = "hsl(18,72%,95%)";
const ACCENT_TEXT = "hsl(18,72%,40%)";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  return (
    <div className="min-h-screen" style={{ background: "hsl(30,20%,97%)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-display text-2xl font-semibold tracking-wide" style={{ color: ACCENT }}>
            Ольга
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-body font-medium text-foreground/70 hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#booking" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105" style={{ background: ACCENT }}>
            Записаться
          </a>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/70 font-body" onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#booking" className="text-center py-2.5 rounded-full text-sm font-semibold text-white font-body" style={{ background: ACCENT }} onClick={() => setMobileMenuOpen(false)}>
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, hsl(18,72%,70%), transparent 70%)` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, hsl(150,40%,60%), transparent 70%)` }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 font-body" style={{ background: ACCENT_LIGHT, color: ACCENT_TEXT }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              Есть свободные окошки на апрель
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.1] mb-6" style={{ color: "hsl(20,15%,12%)" }}>
              Пространство,<br />
              <em className="not-italic" style={{ color: ACCENT }}>где можно</em><br />
              быть собой
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed mb-10 max-w-md font-body">
              Помогаю справляться с тревогой, выстраивать здоровые отношения и находить путь к себе. Онлайн и очно в Москве.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg font-body" style={{ background: ACCENT }}>
                Записаться на консультацию
                <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#about" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 font-body" style={{ borderColor: ACCENT, color: ACCENT }}>
                Узнать обо мне
              </a>
            </div>
            <div className="flex gap-10 mt-12">
              {[["8+", "лет практики"], ["500+", "клиентов"], ["97%", "рекомендуют"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-semibold" style={{ color: ACCENT }}>{num}</div>
                  <div className="text-sm text-foreground/50 font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <div className="absolute -inset-4 blob opacity-25 animate-float" style={{ background: "hsl(18,72%,80%)" }} />
              <img
                src={HERO_IMAGE}
                alt="Ольга — психолог"
                className="relative z-10 w-full h-[560px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: ACCENT_LIGHT }}>
                    🎓
                  </div>
                  <div>
                    <div className="text-xs text-foreground/50 font-body">Образование</div>
                    <div className="text-sm font-semibold font-body">МГУ, клиническая психология</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-semibold text-sm font-body">5.0</span>
                  <span className="text-foreground/40 text-xs font-body">рейтинг</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={ROOM_IMAGE} alt="Кабинет" className="w-full h-[500px] object-cover rounded-3xl shadow-xl" />
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-xl max-w-[220px]">
                <div className="text-3xl mb-2">🌿</div>
                <div className="font-semibold text-sm font-body">Безопасная среда</div>
                <div className="text-xs text-foreground/50 font-body mt-1">Без осуждения и спешки</div>
              </div>
            </div>
            <div>
              <div className="section-divider mb-6" />
              <h2 className="font-display text-5xl font-semibold mb-6 leading-tight">
                Психология — это про смелость<br />
                <em className="not-italic" style={{ color: ACCENT }}>встретиться с собой</em>
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-5 font-body">
                Меня зовут Ольга. Я практикующий психолог с 8-летним опытом. Работаю в интегративном подходе, сочетая элементы КПТ, схема-терапии и телесно-ориентированных практик.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8 font-body">
                Верю, что каждый человек способен измениться — когда рядом есть поддержка и понимание. Моя задача — создать это пространство для вас.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["КПТ", "Когнитивно-поведенческая терапия"],
                  ["Схема-терапия", "Работа с глубинными убеждениями"],
                  ["EMDR", "Травма-терапия"],
                  ["Телесные практики", "Работа с ощущениями тела"],
                ].map(([name, desc]) => (
                  <div key={name} className="p-4 rounded-2xl border border-border">
                    <div className="font-semibold text-sm mb-1 font-body" style={{ color: ACCENT }}>{name}</div>
                    <div className="text-xs text-foreground/50 font-body">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "hsl(30,20%,97%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-display text-5xl font-semibold mb-4">Услуги</h2>
            <p className="text-foreground/50 font-body max-w-lg mx-auto">Выберите формат, который подходит именно вам</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="card-hover bg-white rounded-3xl p-6 border border-border flex flex-col">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: ACCENT_LIGHT }}>
                  <Icon name={s.icon} size={22} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 leading-tight">{s.title}</h3>
                <p className="text-sm text-foreground/55 font-body mb-5 leading-relaxed flex-1">{s.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-lg font-bold font-body" style={{ color: ACCENT }}>{s.price}</div>
                    <div className="text-xs text-foreground/40 font-body">{s.duration}</div>
                  </div>
                  <a href="#booking" className="p-2.5 rounded-xl text-white transition-all hover:scale-110" style={{ background: ACCENT }}>
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-display text-5xl font-semibold mb-4">Отзывы</h2>
            <p className="text-foreground/50 font-body">Истории людей, которые сделали шаг навстречу себе</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-hover rounded-3xl p-6 border border-border flex flex-col" style={{ background: "hsl(30,20%,98%)" }}>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-sm text-foreground/65 font-body leading-relaxed mb-5 flex-1">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm font-body">{r.name}</div>
                  <span className="text-xs px-3 py-1 rounded-full font-body font-medium" style={{ background: ACCENT_LIGHT, color: ACCENT_TEXT }}>
                    {r.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24" style={{ background: "hsl(30,20%,97%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="section-divider mb-6" />
              <h2 className="font-display text-5xl font-semibold">Блог</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold font-body" style={{ color: ACCENT }}>
              Все статьи <Icon name="ArrowRight" size={16} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((p) => (
              <div key={p.title} className="card-hover rounded-3xl overflow-hidden border border-border bg-white">
                <div className="h-48 flex items-center justify-center text-6xl" style={{ background: p.bg }}>
                  {p.emoji}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full font-body" style={{ background: ACCENT_LIGHT, color: ACCENT_TEXT }}>{p.tag}</span>
                  <h3 className="font-display text-xl font-semibold mt-3 mb-2 leading-tight">{p.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-foreground/40 font-body mt-4">
                    <span>{p.date}</span>
                    <span>· {p.read} чтения</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-display text-5xl font-semibold mb-4">PDF-гайды и упражнения</h2>
            <p className="text-foreground/50 font-body max-w-lg mx-auto">
              Практические материалы для самостоятельной работы между сессиями
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDES.map((g) => (
              <div key={g.title} className={`card-hover rounded-3xl p-6 border border-border ${g.color} flex flex-col`}>
                <div className="text-4xl mb-4">{g.icon}</div>
                <h3 className="font-display text-lg font-semibold mb-2 leading-tight flex-1">{g.title}</h3>
                <div className="text-xs text-foreground/40 font-body mb-5">{g.pages}</div>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white font-body transition-all hover:opacity-90" style={{ background: ACCENT }}>
                  Получить бесплатно
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center text-sm text-foreground/40 font-body">
            Гайды доступны для клиентов после консультации или бесплатно при подписке на рассылку
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ background: "hsl(30,20%,97%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-display text-5xl font-semibold mb-4">Частые вопросы</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-body"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm leading-snug">{f.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: ACCENT }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-foreground/60 font-body leading-relaxed border-t border-border pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-24 relative overflow-hidden" style={{ background: ACCENT }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 bg-white" />
        </div>
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl font-semibold text-white mb-4">
              Записаться на консультацию
            </h2>
            <p className="text-white/70 font-body">
              Оставьте заявку — я свяжусь с вами в течение нескольких часов
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold font-body mb-2 block text-foreground/70">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm outline-none focus:border-orange-400 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold font-body mb-2 block text-foreground/70">Телефон или Telegram</label>
                <input
                  type="text"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm outline-none focus:border-orange-400 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold font-body mb-2 block text-foreground/70">С чем хотите поработать?</label>
                <textarea
                  rows={4}
                  placeholder="Опишите в нескольких словах (необязательно)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border font-body text-sm outline-none focus:border-orange-400 transition-all resize-none"
                />
              </div>
              <button
                className="w-full py-4 rounded-xl font-semibold text-white font-body transition-all hover:opacity-90 hover:scale-[1.02] text-base"
                style={{ background: ACCENT }}
              >
                Отправить заявку
              </button>
              <p className="text-center text-xs text-foreground/40 font-body">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-display text-5xl font-semibold mb-4">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (999) 000-00-00", href: "tel:+79990000000" },
              { icon: "Send", title: "Telegram", value: "@olga_psych", href: "https://t.me/olga_psych" },
              { icon: "Mail", title: "Email", value: "olga@psychology.ru", href: "mailto:olga@psychology.ru" },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="card-hover flex flex-col items-center text-center p-8 rounded-3xl border border-border"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: ACCENT_LIGHT }}>
                  <Icon name={c.icon} size={24} style={{ color: ACCENT }} />
                </div>
                <div className="text-xs text-foreground/40 font-body mb-1">{c.title}</div>
                <div className="font-semibold text-sm font-body">{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl font-semibold" style={{ color: ACCENT }}>Ольга</span>
          <p className="text-sm text-foreground/40 font-body">© 2026 · Все права защищены</p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-foreground/40 hover:text-foreground font-body transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
