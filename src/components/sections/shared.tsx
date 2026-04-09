import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

export const HERO_IMG = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/bucket/dd888cac-31bb-45c1-a539-ba233ec9ef8d.jpg";
export const ABOUT_IMG = "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/8248a09a-6ca8-48ba-815d-c3632a626971.jpg";

export const NAV = [
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#portfolio" },
  { label: "Как работаю", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Отзывы", href: "#testimonials" },
];

export const PAIN_CARDS = [
  { icon: "😮‍💨", title: "Хроническая усталость", text: "Вы устаёте, даже когда выспались. Формально «всё нормально», но сил ни на что нет." },
  { icon: "🫀", title: "Тревога без причины", text: "Непонятное беспокойство, которое сложно объяснить. Постоянное ощущение «что-то пойдёт не так»." },
  { icon: "🪞", title: "Кризис идентичности", text: "Ощущение потери себя. Непонятно, чего вы хотите и куда двигаться дальше." },
  { icon: "🧩", title: "Сложности с границами", text: "Трудно говорить «нет» без чувства вины. Чужие нужды часто важнее ваших." },
  { icon: "🌊", title: "После потрясений", text: "Развод, потеря работы, переезд — что-то внутри изменилось, а поддержки нет." },
  { icon: "🔥", title: "Выгорание", text: "Работа когда-то нравилась. Теперь — только обязанность. Нет ни интереса, ни энергии." },
];

export const PROCESS_STEPS = [
  { icon: "☕", title: "Знакомство", text: "30 минут бесплатно. Рассказываете, что происходит. Я слушаю без оценок. Определяем, с чего начать.", free: true },
  { icon: "🎯", title: "Первая сессия", text: "Углублённый разбор запроса. Совместно формируем цели — конкретно, без абстракций и пустых обещаний.", free: false },
  { icon: "🌱", title: "Регулярная работа", text: "1–2 встречи в неделю по 50 минут. Вы двигаетесь в своём темпе. Я рядом на каждом этапе.", free: false },
  { icon: "✨", title: "Результат", text: "Конкретные изменения в поведении, состоянии и отношениях. Не «осознание» — настоящие сдвиги.", free: false },
];

export const RESULTS = [
  "Перестанете просыпаться с тревогой без видимой причины",
  "Научитесь говорить «нет» — без вины и без скандала",
  "Поймёте, чего вы на самом деле хотите от жизни",
  "Восстановите энергию и интерес к тому, что радовало",
  "Почувствуете устойчивость — даже когда вокруг неопределённость",
];

export const STATS = [
  { num: "63%", desc: "клиентов продолжают работу более 6 месяцев" },
  { num: "8–12", desc: "сессий — средняя продолжительность для заметных изменений" },
  { num: "100%", desc: "конфиденциальность всех данных и разговоров" },
];

export const TESTIMONIALS = [
  { initial: "М", name: "Марина", meta: "44 года, Владивосток", photo: "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/f96d569f-b57c-4f52-8908-f9435ce972cd.jpg", text: "Пришла, когда просто перестала справляться. Работа, семья, всё навалилось — и я как будто замерла. Оказалось совсем не так, как я ожидала. Ольга сразу дала ощущение, что меня слышат — без лишних слов и без осуждения. Уже через месяц я заметила, что перестала просыпаться в 4 утра с тревогой. Это дорогого стоит." },
  { initial: "Д", name: "Дмитрий", meta: "38 лет, онлайн", photo: "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/c85e5c7d-f924-4739-9e6a-ebad6c44bf87.jpg", text: "Я долго откладывал — думал, само пройдёт. Не прошло. На работе всё было нормально, но внутри — полный ноль, ничего не радовало. Обратился к Ольге онлайн, даже не ожидал, что формат так хорошо зайдёт. Она помогла разобраться, где у меня вообще что-то сломалось. Жизнь правда стала проще. Рекомендую без оговорок." },
  { initial: "С", name: "Светлана", meta: "51 год, Хабаровск", photo: "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/12ef93cc-7b0b-4f97-bf56-ebd4a2ad92b5.jpg", text: "Обратилась после развода — казалось, что это конец всего. Ольга помогла посмотреть на ситуацию с другой стороны. Не навязывала своего мнения. Вместо этого — конкретные инструменты: что делать, когда накрывает, как не уходить в голову с головой. Очень ценю, что записалась именно тогда, когда было совсем плохо." },
  { initial: "А", name: "Андрей", meta: "47 лет, Владивосток", photo: "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/65642024-cd37-43e9-9b0f-393ed433f350.jpg", text: "Мужчины к психологам не ходят — я так думал лет до сорока пяти. Потом случился серьёзный кризис на работе, и я понял: сам не вытяну. Первые минут десять было неловко, потом как отпустило. Ольга умеет задавать правильные вопросы — точные, без лишнего. Жалею только, что не пришёл раньше." },
  { initial: "Е", name: "Екатерина", meta: "33 года, онлайн", photo: "https://cdn.poehali.dev/projects/23da038f-4d57-467c-a4fd-58fc14b73360/files/0d0fe5ad-0148-4eeb-9c8a-5b7d8bedf595.jpg", text: "Работаем уже три месяца. Пришла с тревогой и ощущением, что живу чужую жизнь — угождаю всем вокруг, а себя где-то потеряла. Ольга не просто слушает — она помогает структурировать то, что в голове каша. Я начала говорить «нет» на работе. Для меня это был настоящий прорыв. Советую всем, кто думает: «может, само рассосётся». Не рассосётся." },
];

export const PRICING = [
  { name: "Знакомство", price: "Бесплатно", priceDetail: "", desc: "30 минут. Рассказываете, что происходит. Без обязательств. Просто поговорим.", featured: false, free: true },
  { name: "Разовая сессия", price: "2 500 ₽", priceDetail: "/ 50 мин", desc: "Онлайн или очно. Подходит для первичной консультации или разового вопроса.", featured: false, free: false },
  { name: "Пакет 4 сессии", price: "9 000 ₽", priceDetail: "/ месяц", desc: "Месяц работы. Скидка 10%. Оптимально для разбора конкретного запроса.", featured: true, free: false },
  { name: "Пакет 8 сессий", price: "17 000 ₽", priceDetail: "/ 2 месяца", desc: "Глубокая работа с запросом. Максимальный результат. Экономия 15%.", featured: false, free: false },
];

export const ABOUT_TAGS = ["Тревога и стресс", "Выгорание", "Кризисы идентичности", "Семейные конфликты", "Личные границы", "Онлайн и очно"];

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive(i => (i + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const t = TESTIMONIALS[active];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setActive(i => diff > 0 ? (i + 1) % total : (i - 1 + total) % total);
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="rounded-2xl p-8 md:p-10 border flex flex-col gap-6"
        style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)", minHeight: 280 }}
      >
        <div className="text-lg" style={{ color: "var(--color-accent-warm)" }}>★★★★★</div>
        <p
          className="flex-1 text-base italic leading-relaxed"
          style={{ fontFamily: "Instrument Serif, serif", color: "var(--color-text-muted)", fontSize: "1.1rem" }}
          key={active}
        >
          «{t.text}»
        </p>
        <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--color-divider)" }}>
          <img
            src={t.photo}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            style={{ border: "2px solid var(--color-primary-light)" }}
          />
          <div>
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs" style={{ color: "var(--color-text-faint)" }}>{t.meta}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setActive(i => (i - 1 + total) % total)}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-opacity-80"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", background: "var(--color-surface-2)" }}
        >
          <Icon name="ChevronLeft" size={18} />
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                background: i === active ? "var(--color-primary)" : "var(--color-border)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setActive(i => (i + 1) % total)}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-opacity-80"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", background: "var(--color-surface-2)" }}
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}