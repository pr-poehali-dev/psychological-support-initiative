import { useState } from "react";
import { Reveal } from "./shared";

const TABS = [
  { label: "Все", id: "all" },
  { label: "Тревога и стресс", id: "anxiety" },
  { label: "Отношения", id: "relations" },
  { label: "Карьера и выгорание", id: "burnout" },
  { label: "Самооценка", id: "selfesteem" },
  { label: "Группа и корпоратив", id: "corporate" },
];

const CARDS = [
  {
    id: "anxiety",
    tag: "Тревога и стресс",
    title: "Тревога и панические атаки",
    text: "Помогаю понять природу тревоги и научиться управлять ею. Работаем с триггерами, телесными реакциями и автоматическими мыслями.",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=340&fit=crop",
    duration: "8–12 сессий",
    format: "Онлайн / очно",
    result: "контроль над тревогой",
  },
  {
    id: "relations",
    tag: "Отношения",
    title: "Семейные и парные отношения",
    text: "Конфликты, дистанция, ревность, кризис доверия. Работаем с паттернами общения и глубинными причинами разногласий.",
    img: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&h=340&fit=crop",
    duration: "10–16 сессий",
    format: "Пара или индивидуально",
    result: "новое качество общения",
  },
  {
    id: "burnout",
    tag: "Карьера и выгорание",
    title: "Выгорание и потеря смысла",
    text: "Когда работа перестала приносить удовольствие, а силы кончаются раньше вечера. Восстанавливаем ресурс и находим новую мотивацию.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=340&fit=crop",
    duration: "6–10 сессий",
    format: "Онлайн / очно",
    result: "возврат энергии и интереса",
  },
  {
    id: "selfesteem",
    tag: "Самооценка",
    title: "Самооценка и личные границы",
    text: "Угождаете всем, но не себе? Работаем с внутренним критиком, страхом осуждения и умением говорить «нет» без чувства вины.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=340&fit=crop",
    duration: "8–14 сессий",
    format: "Онлайн / очно",
    result: "уверенность в себе",
  },
  {
    id: "corporate",
    tag: "Группа и корпоратив",
    title: "Корпоративные тренинги и группы",
    text: "Тренинги по управлению стрессом, коммуникации и командной работе. Работаю с коллективами предприятий и организаций.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=340&fit=crop",
    duration: "1–3 дня",
    format: "Группа 6–20 чел.",
    result: "сплочение команды",
  },
  {
    id: "crisis",
    tag: "Кризис и переход",
    title: "Жизненный кризис и переходы",
    text: "Развод, смена работы, переезд, потеря близкого. Помогаю найти опору, осмыслить происходящее и двигаться дальше.",
    img: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=340&fit=crop",
    duration: "6–12 сессий",
    format: "Онлайн / очно",
    result: "устойчивость и ясность",
  },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("all");

  const visible = activeTab === "all" ? CARDS : CARDS.filter(c => c.id === activeTab);

  return (
    <section id="portfolio" className="py-20 md:py-24" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal><p className="section-label">Направления работы</p></Reveal>
        <Reveal delay={1}>
          <h2 className="mb-3" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>
            С чем я работаю
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)", maxWidth: "56ch", lineHeight: 1.7 }}>
            Выберите направление, которое вам близко — и посмотрите, как именно проходит работа в каждом из них.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="text-sm px-5 py-2 rounded-full border-[1.5px] transition-all"
                style={{
                  background: activeTab === tab.id ? "var(--color-primary)" : "var(--color-surface)",
                  color: activeTab === tab.id ? "var(--color-text-inverse)" : "var(--color-text-muted)",
                  borderColor: activeTab === tab.id ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((card, i) => (
            <div
              key={card.id + card.title}
              className="rounded-2xl border overflow-hidden flex flex-col transition-all duration-300"
              style={{
                background: "var(--color-surface-2)",
                borderColor: "var(--color-border)",
                boxShadow: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(42,37,32,.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  loading={i < 3 ? "eager" : "lazy"}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                />
              </div>
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
                  {card.tag}
                </div>
                <h3 style={{ fontFamily: "Instrument Serif, serif", fontSize: "1.2rem", color: "var(--color-text)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
                  {card.text}
                </p>
                <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--color-text-faint)" }}>
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {card.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {card.format}
                  </span>
                </div>
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full self-start mt-1"
                  style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
                >
                  ✦ Результат: {card.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
