import Icon from "@/components/ui/icon";
import { Reveal, PROCESS_STEPS, RESULTS, STATS } from "./shared";

export function ProcessSection() {
  return (
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
  );
}

export function ResultsSection() {
  return (
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
  );
}
