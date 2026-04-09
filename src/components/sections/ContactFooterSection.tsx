import Icon from "@/components/ui/icon";
import { Reveal } from "./shared";

interface ContactSectionProps {
  form: { name: string; phone: string; message: string };
  setForm: (f: { name: string; phone: string; message: string }) => void;
  formStatus: "idle" | "loading" | "success" | "error";
  setFormStatus: (s: "idle" | "loading" | "success" | "error") => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export function ContactSection({ form, setForm, formStatus, setFormStatus, handleFormSubmit }: ContactSectionProps) {
  return (
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
  );
}

export function Footer() {
  return (
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
  );
}
