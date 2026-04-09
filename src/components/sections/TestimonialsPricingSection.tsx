import { Reveal, TestimonialsCarousel, PRICING } from "./shared";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal><p className="section-label">Отзывы</p></Reveal>
        <Reveal delay={1}><h2 className="mb-10" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)" }}>Что говорят клиенты</h2></Reveal>
        <TestimonialsCarousel />
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
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
  );
}
