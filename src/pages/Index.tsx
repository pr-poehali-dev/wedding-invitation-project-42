import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-08-08T16:00:00");
const CONFIRM_URL = "https://functions.poehali.dev/89ebb219-0410-4069-b584-255ca16e1982";

// Палитра — кремовый фон, тёмный текст
const C = {
  bg: "#e8dcc8",
  bgDark: "#e8dcc8",
  section2: "#e8dcc8",
  olive: "#5a4a2a",
  oliveMid: "#6b5a38",
  oliveLight: "#8a7550",
  brown: "#2e1f0e",
  brownMid: "#3d2a14",
  cream: "#e8dcc8",
  sand: "#8a7550",
  text: "#2e1f0e",
  textMid: "#4a3520",
  textLight: "#6b5538",
};

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Август 2026: 1-е — суббота (индекс 5 при ПН=0)
const CALENDAR_DAYS: (number | null)[] = [
  null, null, null, null, null, 1, 2,
  3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30,
  31, null, null, null, null, null, null,
];

const SCHEDULE = [
  { time: "16:00", title: "Сбор гостей", desc: "Захватите с собой хорошее настроение и улыбки" },
  { time: "16:30", title: "Выездная регистрация", desc: "Торжественный момент создания новой семьи" },
  { time: "17:00", title: "Начало банкета", desc: "Музыка, танцы и незабываемые моменты" },
  { time: "22:00", title: "Завершение вечера", desc: "Спасибо, что разделили этот день с нами" },
];

// Цвета дресс-кода с мудборда
const DRESSCODE_SWATCHES = [
  { color: "#5a6642", label: "Оливковый" },
  { color: "#4a3428", label: "Коричневый" },
  { color: "#9aaa78", label: "Шалфей" },
  { color: "#c8b898", label: "Кремовый" },
];

type Phase = "cover" | "opening" | "content";

export default function Index() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [ripples, setRipples] = useState<number[]>([]);
  const countdown = useCountdown(WEDDING_DATE);

  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    if (phase !== "cover") return;
    setRipples([Date.now()]);
    setPhase("opening");
    setTimeout(() => setPhase("content"), 1400);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await fetch(CONFIRM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen font-cormorant ${phase === "cover" ? "fabric-idle" : "fabric-live"}`}>

      {/* ЗАСТАВКА */}
      {phase !== "content" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between cursor-pointer ${phase === "opening" ? "cover-fade-out pointer-events-none" : ""}`}
          onClick={handleOpen}
        >


          <div className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-sm mx-auto px-8 pt-24 pb-24">
            <div className="text-center">
              <p className="font-montserrat text-[11px] tracking-[0.4em] uppercase mb-3 animate-fade-up delay-100" style={{ color: C.brownMid }}>
                ВАМ ПРИШЛО
              </p>
              <h1 className="font-cormorant italic font-light text-[52px] leading-none animate-fade-up delay-200" style={{ color: C.brown }}>
                Приглашение
              </h1>
              <div className="flex items-center gap-3 justify-center mt-5 animate-fade-up delay-300">
                <span className="flex-1 h-px" style={{ background: `${C.olive}50` }} />
                <span className="font-vibes text-[32px] leading-none" style={{ color: C.oliveMid }}>Кристина & Даниил</span>
                <span className="flex-1 h-px" style={{ background: `${C.olive}50` }} />
              </div>
            </div>

            {/* Сердце */}
            <div className="relative flex items-center justify-center animate-fade-in delay-400">
              {ripples.map((r) => (
                <span key={r} className="ripple-ring absolute rounded-full"
                  style={{ width: 160, height: 160, marginLeft: -80, marginTop: -80, borderColor: `${C.olive}60` }} />
              ))}
              <div className={phase === "opening" ? "heart-tap" : "heart-idle"}>
                <svg viewBox="0 0 200 190" width="170" height="160" fill="none">
                  <defs>
                    <clipPath id="heart-clip">
                      <path d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z" />
                    </clipPath>
                    <radialGradient id="heart-glow" cx="50%" cy="45%" r="60%">
                      <stop offset="0%" stopColor={`${C.oliveLight}50`} />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <path d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z" fill="url(#heart-glow)" />
                  <path d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z"
                    stroke={`${C.olive}cc`} strokeWidth="1.5" fill="none" />
                  {[...Array(16)].map((_, i) => (
                    <ellipse key={i} cx="100" cy="92" rx={8 + i * 6} ry={6 + i * 5}
                      stroke={`${C.olive}50`} strokeWidth="1" fill="none" clipPath="url(#heart-clip)" />
                  ))}
                </svg>
              </div>
            </div>

            <div className="text-center animate-fade-up delay-600">
              <p className="font-cormorant font-light text-[19px] tracking-wide leading-relaxed" style={{ color: C.brownMid }}>
                нажмите, чтобы открыть<br /><span className="italic">приглашение</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      {phase === "content" && (
        <div className="content-reveal">

          {/* СЕКЦИЯ 1: Имена */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "transparent" }}>

            {/* Оливковый декор */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: C.olive }} />
            <div className="relative z-10 text-center px-8 pt-20 pb-16 w-full max-w-sm mx-auto">
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: C.olive }}>
                ПРИГЛАШЕНИЕ НА СВАДЬБУ
              </p>
              <div className="flex items-center gap-3 justify-center mb-10">
                <span className="flex-1 h-px" style={{ background: `${C.olive}60` }} />
                <span style={{ color: C.olive, fontSize: 14 }}>✦</span>
                <span className="flex-1 h-px" style={{ background: `${C.olive}60` }} />
              </div>
              <h1 className="font-vibes leading-none" style={{ color: C.brown, fontSize: "80px", marginLeft: "-8px", textShadow: "0 2px 12px rgba(46,31,14,0.13)" }}>
                Кристина
              </h1>
              <div className="flex items-center gap-4 justify-center my-1">
                <span className="w-10 h-px" style={{ background: C.sand }} />
                <span className="font-vibes leading-none" style={{ color: C.olive, fontSize: "52px" }}>&amp;</span>
                <span className="w-10 h-px" style={{ background: C.sand }} />
              </div>
              <h1 className="font-vibes leading-none" style={{ color: C.brown, fontSize: "92px", textShadow: "0 2px 12px rgba(46,31,14,0.13)" }}>
                Даниил
              </h1>
              <div className="flex items-center gap-3 justify-center mt-10">
                <span className="flex-1 h-px" style={{ background: `${C.olive}60` }} />
                <span style={{ color: C.olive, fontSize: 14 }}>✦</span>
                <span className="flex-1 h-px" style={{ background: `${C.olive}60` }} />
              </div>
              <p className="font-montserrat text-[11px] tracking-[0.3em] uppercase mt-4" style={{ color: C.brownMid }}>
                8 августа 2026
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: C.olive }} />
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 2: Дорогие гости */}
          <section className="relative px-8 py-16 max-w-sm mx-auto overflow-hidden">
            <div className="absolute right-[-20px] top-16 w-36 h-36 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${C.olive}, transparent)` }} />
            <div className="absolute left-[-20px] bottom-28 w-48 h-48 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${C.brownMid}, transparent)` }} />
            <div className="relative z-10">
              <h2 className="font-cormorant italic font-light text-[56px] leading-[1.1] mb-8" style={{ color: C.brown }}>
                Дорогие<br />гости
              </h2>
              <div className="border-l-2 pl-4 mb-12" style={{ borderColor: `${C.olive}80` }}>
                <p className="font-cormorant font-light text-[18px] leading-[1.7]" style={{ color: C.text }}>
                  В нашей жизни предстоят счастливые перемены! Мы хотим, чтобы в этот день рядом с нами были самые близкие и дорогие для нас люди. Мы рады пригласить Вас стать свидетелями этого торжества и разделить с нами самые яркие моменты.
                </p>
              </div>
              <div className="text-center mb-8">
                <p className="font-cormorant-sc font-light text-[28px] tracking-[0.12em]" style={{ color: C.brownMid }}>
                  8 АВГУСТА 2026
                </p>
                <div className="w-16 h-px mx-auto mt-3" style={{ background: `${C.olive}80` }} />
              </div>
              {/* Календарь */}
              <div className="mt-8">
                <div className="grid grid-cols-7 gap-0 text-center">
                  {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(d => (
                    <div key={d} className="font-montserrat text-[11px] tracking-wider py-2" style={{ color: C.olive }}>
                      {d}
                    </div>
                  ))}
                  {CALENDAR_DAYS.map((day, i) => (
                    <div key={i} className="py-1 flex items-center justify-center">
                      {day ? (
                        <span className="font-cormorant text-[18px] w-9 h-9 flex items-center justify-center relative"
                          style={{ color: day === 8 ? C.brown : C.textMid }}>
                          {day === 8 && (
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" fill="none">
                              <path d="M18 28 C12 24 4 20 4 13 C4 8 8 5 13 6.5 C15.2 7.2 17 9 18 11 C19 9 20.8 7.2 23 6.5 C28 5 32 8 32 13 C32 20 24 24 18 28Z"
                                stroke={C.olive} strokeWidth="1.2" fill="none" />
                            </svg>
                          )}
                          {day}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 3: Обратный отсчёт */}
          <section className="relative px-8 py-16 text-center overflow-hidden">
            <div className="absolute right-[-20px] top-8 w-40 h-40 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${C.olive}, transparent)` }} />
            <p className="font-montserrat text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: C.olive }}>
              ДО СВАДЬБЫ ОСТАЛОСЬ...
            </p>
            <div className="flex justify-center gap-3">
              {[
                { val: countdown.days, label: "дней" },
                { val: countdown.hours, label: "часов" },
                { val: countdown.minutes, label: "минут" },
                { val: countdown.seconds, label: "секунд" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border"
                    style={{ borderColor: `${C.olive}60`, background: `${C.olive}0d` }}>
                    <span className="font-cormorant font-light text-[22px]" style={{ color: C.brown }}>
                      {String(val).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-montserrat text-[10px] tracking-wider mt-2 uppercase" style={{ color: C.olive }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 4: План дня */}
          <section className="relative px-8 py-16 max-w-sm mx-auto overflow-hidden">
            <div className="absolute right-[-10px] top-16 w-36 h-36 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, ${C.olive}, transparent)` }} />
            <div className="absolute left-[-20px] bottom-20 w-44 h-44 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${C.brownMid}, transparent)` }} />
            <div className="relative z-10">
              <h2 className="font-cormorant italic font-light text-[56px] leading-[1.1] mb-6" style={{ color: C.brown }}>
                План<br />дня
              </h2>
              <div className="border-l-2 pl-4 mb-12" style={{ borderColor: `${C.olive}80` }}>
                <p className="font-cormorant font-light text-[17px] leading-[1.7]" style={{ color: C.text }}>
                  Наш день будет наполнен любовью, радостью и тёплыми моментами. Ниже — программа торжества, чтобы вы могли быть частью каждого из них.
                </p>
              </div>
              <div className="space-y-10">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 min-w-[70px]">
                      <p className="font-cormorant font-light text-[28px] leading-none" style={{ color: C.brown }}>
                        {item.time}
                      </p>
                      <div className="w-10 h-px mt-2" style={{ background: `${C.olive}80` }} />
                    </div>
                    <div>
                      <p className="font-cormorant italic text-[22px] leading-tight mb-1" style={{ color: C.brown }}>
                        {item.title}
                      </p>
                      <p className="font-cormorant font-light text-[15px] leading-snug" style={{ color: C.textLight }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 5: Место */}
          <section className="relative overflow-hidden">
            <div className="px-8 py-16 max-w-sm mx-auto">
              <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] mb-8 text-center" style={{ color: C.brown }}>
                Место<br />торжества
              </h2>
              <div className="overflow-hidden mb-8 aspect-[4/3]">
                <img
                  src="https://cdn.poehali.dev/projects/a540970c-91ee-4184-9179-bffb7270ac57/bucket/236258e1-3b0b-4b67-920c-0c1fbc224fc2.jpeg"
                  alt="Огни Баку"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Надписи в рамке */}
              <div className="relative border p-6 text-center" style={{ borderColor: `${C.olive}50` }}>
                <span className="absolute top-0 left-0 w-5 h-5 border-t border-l" style={{ borderColor: C.olive }} />
                <span className="absolute top-0 right-0 w-5 h-5 border-t border-r" style={{ borderColor: C.olive }} />
                <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l" style={{ borderColor: C.olive }} />
                <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r" style={{ borderColor: C.olive }} />
                <p className="font-cormorant italic text-[26px] mb-1" style={{ color: C.brown }}>
                  Ресторан «Огни Баку»
                </p>
                <div className="w-10 h-px mx-auto my-3" style={{ background: `${C.olive}60` }} />
                <p className="font-montserrat font-light text-[12px] tracking-wider uppercase" style={{ color: C.textLight }}>
                  пгт Васильево, Республика Татарстан
                </p>
              </div>
            </div>
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 6: Дресс-код */}
          <section className="px-8 py-16 max-w-sm mx-auto text-center">
            <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] mb-4" style={{ color: C.brown }}>
              Дресс-код
            </h2>
            <p className="font-cormorant font-light text-[17px] leading-relaxed mb-8" style={{ color: C.textMid }}>
              Мы будем очень рады, если вы<br />поддержите цветовую гамму праздника
            </p>
            <div className="overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://cdn.poehali.dev/projects/a540970c-91ee-4184-9179-bffb7270ac57/bucket/d3171644-da01-4b19-9bd0-adca2e3fffaf.png"
                alt="Дресс-код"
                className="w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 30%",
                  filter: "contrast(1.05) saturate(1.1)",
                  transform: "scale(1.08)",
                }}
              />
            </div>
          </section>

          {/* Разделитель */}
          <div className="flex items-center gap-4 px-8 py-2 max-w-sm mx-auto">
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
            <span style={{ color: C.sand, fontSize: 18, letterSpacing: 6 }}>✦ ✦ ✦</span>
            <span className="flex-1 h-px" style={{ background: `${C.olive}30` }} />
          </div>

          {/* СЕКЦИЯ 7: Подтвердить присутствие */}
          <section className="relative px-8 py-16 overflow-hidden">
            <div className="absolute left-[-20px] top-10 w-40 h-40 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${C.olive}, transparent)` }} />
            <div className="relative z-10 max-w-sm mx-auto">
              <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] mb-3 text-center" style={{ color: C.brown }}>
                Подтвердить<br />присутствие
              </h2>
              <p className="font-cormorant font-light text-[17px] text-center mb-10 leading-relaxed" style={{ color: C.textMid }}>
                Пожалуйста, дайте нам знать<br />до 1 июля 2026 года
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="flex items-center gap-3 justify-center mb-5">
                    <span className="w-10 h-px" style={{ background: `${C.olive}60` }} />
                    <span style={{ color: C.olive }}>✦</span>
                    <span className="w-10 h-px" style={{ background: `${C.olive}60` }} />
                  </div>
                  <p className="font-cormorant italic text-[28px] mb-2" style={{ color: C.brown }}>
                    Спасибо, {name}!
                  </p>
                  <p className="font-cormorant font-light text-[18px]" style={{ color: C.textMid }}>
                    Ждём вас с нетерпением
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirm} className="space-y-6">
                  <div>
                    <label className="font-montserrat text-[11px] tracking-[0.25em] uppercase block mb-2" style={{ color: C.olive }}>
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Введите имя"
                      className="w-full bg-transparent pb-2 font-cormorant text-[19px] placeholder-[#a89878] focus:outline-none"
                      style={{
                        borderBottom: `1px solid ${C.olive}80`,
                        color: C.brown,
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 font-cormorant italic text-[20px] tracking-wide transition-all relative"
                      style={{
                        border: `1px solid ${C.olive}`,
                        color: loading ? C.textLight : "#fff",
                        background: loading ? "transparent" : C.olive,
                      }}
                    >
                      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: C.oliveLight }} />
                      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: C.oliveLight }} />
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: C.oliveLight }} />
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: C.oliveLight }} />
                      {loading ? "Отправляем..." : "Я приду на свадьбу"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* СЕКЦИЯ 8: Финал */}
          <section className="relative min-h-[55vh] flex flex-col items-center justify-center px-8 py-20 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: C.olive }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
              opacity: 1
            }} />
            <div className="relative z-10">
              <p className="font-cormorant italic font-light text-[22px] leading-relaxed mb-8" style={{ color: C.text }}>
                Ждём вас с нетерпением<br />и любовью
              </p>
              <h2 className="font-cormorant italic font-light text-[48px]" style={{ color: C.brown }}>
                Кристина &amp; Даниил
              </h2>
              <div className="flex items-center gap-4 mt-6 justify-center">
                <span className="w-16 h-px" style={{ background: `${C.olive}80` }} />
                <span style={{ color: C.olive }} className="text-lg">✦</span>
                <span className="w-16 h-px" style={{ background: `${C.olive}80` }} />
              </div>
              <p className="font-montserrat text-[11px] tracking-[0.3em] mt-6 uppercase" style={{ color: C.olive }}>
                8 августа 2026
              </p>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}