import { useState, useEffect, useRef } from "react";

const WEDDING_DATE = new Date("2026-09-05T16:00:00");

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

// Сентябрь 2026: 1-е — вторник
const CALENDAR_DAYS: (number | null)[] = [
  null, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, null, null, null, null,
];

const SCHEDULE = [
  { time: "15:30", title: "Сбор гостей", desc: "Захватите с собой хорошее настроение и свои улыбки" },
  { time: "16:00", title: "Выездная регистрация", desc: "Торжественный момент создания новой семьи" },
  { time: "16:30", title: "Начало банкета", desc: "Музыка, танцы и незабываемые моменты" },
  { time: "23:00", title: "Завершение вечера", desc: "Спасибо, что разделили этот день с нами" },
];

type Phase = "cover" | "exploding" | "content";

export default function Index() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [ripples, setRipples] = useState<number[]>([]);
  const rippleRef = useRef(0);
  const countdown = useCountdown(WEDDING_DATE);

  // Форма подтверждения
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = () => {
    if (phase !== "cover") return;
    // Запускаем рябь
    setRipples([Date.now()]);
    setPhase("exploding");
    // Через 900ms показываем контент
    setTimeout(() => setPhase("content"), 900);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-cormorant" style={{ background: "#f0ebe3" }}>

      {/* ЗАСТАВКА — остаётся в DOM пока exploding, потом убирается */}
      {phase !== "content" && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between cursor-pointer ${phase === "exploding" ? "overlay-exit pointer-events-none" : ""}`}
          style={{ background: "linear-gradient(160deg, #e8dfd0 0%, #d4c5a9 50%, #c9b896 100%)" }}
          onClick={handleOpen}
        >
          {/* Фон */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-35" style={{
              backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 25%, #f5ede0 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, #e8d9c0 0%, transparent 60%)`
            }} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-sm mx-auto px-8 pt-24 pb-24">
            {/* Верх */}
            <div className="text-center">
              <p className="font-montserrat text-[11px] tracking-[0.4em] uppercase text-[#6b5a45] mb-3 animate-fade-up delay-100">
                ВАМ ПРИШЛО
              </p>
              <h1 className="font-cormorant italic font-light text-[52px] leading-none text-[#3d2e1e] animate-fade-up delay-200">
                Приглашение
              </h1>
            </div>

            {/* Сердце + рябь */}
            <div className="relative flex items-center justify-center animate-fade-in delay-400">
              {/* Круги ряби при клике */}
              {ripples.map((r) => (
                <span
                  key={r}
                  className="ripple-ring absolute rounded-full border border-[#c9a96e]/60"
                  style={{ width: 160, height: 160, marginLeft: -80, marginTop: -80 }}
                />
              ))}

              {/* Само сердце */}
              <div className={phase === "exploding" ? "heart-explode" : "heart-idle"}>
                <svg viewBox="0 0 200 190" width="170" height="160" fill="none">
                  <defs>
                    <clipPath id="heart-clip">
                      <path d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z" />
                    </clipPath>
                    <radialGradient id="heart-glow" cx="50%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>

                  {/* Заливка сердца */}
                  <path
                    d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z"
                    fill="url(#heart-glow)"
                  />

                  {/* Контур */}
                  <path
                    d="M100 170 C60 140 10 110 10 65 C10 35 35 15 65 20 C80 23 92 32 100 45 C108 32 120 23 135 20 C165 15 190 35 190 65 C190 110 140 140 100 170Z"
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Линии отпечатка */}
                  {[...Array(16)].map((_, i) => (
                    <ellipse
                      key={i}
                      cx="100"
                      cy="92"
                      rx={8 + i * 6}
                      ry={6 + i * 5}
                      stroke="rgba(255,255,255,0.42)"
                      strokeWidth="1"
                      fill="none"
                      clipPath="url(#heart-clip)"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Низ */}
            <div className="text-center animate-fade-up delay-600">
              <p className="font-cormorant font-light text-[19px] text-[#5a4535] tracking-wide leading-relaxed">
                нажмите, чтобы открыть<br />
                <span className="italic">приглашение</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      {phase === "content" && (
        <div className="content-reveal">

          {/* СЕКЦИЯ 1: Имена */}
          <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #e8dfd0 0%, #d4c5a9 40%, #c9b896 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(ellipse 80% 60% at 75% 25%, #f5ede0 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 15% 75%, #e0d0b8 0%, transparent 55%)`,
              opacity: 0.4
            }} />
            <div className="relative z-10 text-center px-8 pt-20 pb-16 w-full max-w-sm mx-auto">
              <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-[#7a6450] mb-3">
                ПРИГЛАШЕНИЕ
              </p>
              <p className="font-cormorant italic text-[20px] text-[#9e8060] tracking-widest mb-10">
                на свадьбу
              </p>
              <h1 className="font-cormorant italic font-light text-[76px] leading-[1] text-[#2c1e12]">
                Кристина
              </h1>
              <p className="font-cormorant italic text-[44px] text-[#8a6a40] my-0 leading-tight">
                &amp;
              </p>
              <h1 className="font-cormorant italic font-light text-[76px] leading-[1] text-[#2c1e12]">
                Данил
              </h1>
            </div>
          </section>

          {/* СЕКЦИЯ 2: Дорогие гости */}
          <section className="relative px-8 py-16 max-w-sm mx-auto overflow-hidden" style={{ background: "#f0ebe3" }}>
            <div className="absolute right-[-20px] top-16 w-36 h-36 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #d4c5a9, transparent)" }} />
            <div className="absolute left-[-20px] bottom-28 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #c9b896, transparent)" }} />
            <div className="relative z-10">
              <h2 className="font-cormorant italic font-light text-[56px] leading-[1.1] text-[#2c1e12] mb-8">
                Дорогие<br />гости
              </h2>
              <div className="border-l-2 border-[#c9a96e]/50 pl-4 mb-12">
                <p className="font-cormorant font-light text-[18px] leading-[1.7] text-[#3d2e1e]">
                  В нашей жизни предстоят счастливые перемены! Мы хотим, чтобы в этот день рядом с нами были самые близкие и дорогие для нас люди. Мы рады пригласить Вас стать свидетелями этого торжества и разделить с нами самые яркие моменты.
                </p>
              </div>

              <div className="text-center mb-8">
                <p className="font-cormorant-sc font-light text-[28px] tracking-[0.12em] text-[#6b5a45]">
                  5 СЕНТЯБРЯ 2026
                </p>
                <div className="w-16 h-px bg-[#c9a96e]/60 mx-auto mt-3" />
              </div>

              {/* Календарь */}
              <div className="mt-8">
                <div className="grid grid-cols-7 gap-0 text-center">
                  {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(d => (
                    <div key={d} className="font-montserrat text-[11px] tracking-wider text-[#9e8060] py-2">{d}</div>
                  ))}
                  {CALENDAR_DAYS.map((day, i) => (
                    <div key={i} className="py-1 flex items-center justify-center">
                      {day ? (
                        <span className={`font-cormorant text-[18px] w-9 h-9 flex items-center justify-center relative ${day === 5 ? "text-[#2c1e12] font-normal" : "text-[#5a4535]"}`}>
                          {day === 5 && (
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" fill="none">
                              <path d="M18 28 C12 24 4 20 4 13 C4 8 8 5 13 6.5 C15.2 7.2 17 9 18 11 C19 9 20.8 7.2 23 6.5 C28 5 32 8 32 13 C32 20 24 24 18 28Z" stroke="#c9a96e" strokeWidth="1.2" fill="none" />
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

          {/* СЕКЦИЯ 3: Обратный отсчёт */}
          <section className="relative px-8 py-16 text-center overflow-hidden" style={{ background: "#ece6db" }}>
            <div className="absolute right-[-20px] top-8 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #c9b896, transparent)" }} />
            <p className="font-montserrat text-[11px] tracking-[0.35em] uppercase text-[#9e8060] mb-10">
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[#c9a96e]/50" style={{ background: "rgba(201,169,110,0.08)" }}>
                    <span className="font-cormorant font-light text-[22px] text-[#2c1e12]">
                      {String(val).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-montserrat text-[10px] text-[#9e8060] tracking-wider mt-2 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* СЕКЦИЯ 4: План дня */}
          <section className="relative px-8 py-16 max-w-sm mx-auto overflow-hidden" style={{ background: "#f0ebe3" }}>
            <div className="absolute right-[-10px] top-16 w-36 h-36 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #d4c5a9, transparent)" }} />
            <div className="absolute left-[-20px] bottom-20 w-44 h-44 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #c9b896, transparent)" }} />
            <div className="relative z-10">
              <h2 className="font-cormorant italic font-light text-[56px] leading-[1.1] text-[#2c1e12] mb-6">
                План<br />дня
              </h2>
              <div className="border-l-2 border-[#c9a96e]/50 pl-4 mb-12">
                <p className="font-cormorant font-light text-[17px] leading-[1.7] text-[#3d2e1e]">
                  Наш день будет наполнен любовью, радостью и тёплыми моментами. Ниже — программа торжества, чтобы вы могли быть частью каждого из них.
                </p>
              </div>
              <div className="space-y-10">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 min-w-[70px]">
                      <p className="font-cormorant font-light text-[28px] text-[#2c1e12] leading-none">{item.time}</p>
                      <div className="w-10 h-px bg-[#c9a96e]/60 mt-2" />
                    </div>
                    <div>
                      <p className="font-cormorant italic text-[22px] text-[#2c1e12] leading-tight mb-1">{item.title}</p>
                      <p className="font-cormorant font-light text-[15px] text-[#7a6450] leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* СЕКЦИЯ 5: Место */}
          <section className="relative overflow-hidden" style={{ background: "#e8dfd0" }}>
            <div className="px-8 py-16 max-w-sm mx-auto">
              <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] text-[#2c1e12] mb-8 text-center">
                Место<br />торжества
              </h2>
              <div className="rounded-sm overflow-hidden mb-6 aspect-[4/3] bg-[#d4c5a9] flex items-center justify-center">
                <img
                  src="https://sun9-68.userapi.com/uU5xZx7KT-TxZ1cdph2oFb_-w6MU1Dh0QCrzfw/b-k8RfdfMzU.jpg"
                  alt="Огни Баку"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </div>
              <div className="text-center">
                <p className="font-cormorant italic text-[28px] text-[#2c1e12] mb-1">Ресторан «Огни Баку»</p>
                <p className="font-montserrat font-light text-[13px] tracking-wider text-[#7a6450]">
                  пгт Васильево, Республика Татарстан
                </p>
                <div className="w-12 h-px bg-[#c9a96e]/60 mx-auto mt-4" />
              </div>
            </div>
          </section>

          {/* СЕКЦИЯ 6: Дресс-код */}
          <section className="px-8 py-16 max-w-sm mx-auto text-center" style={{ background: "#f0ebe3" }}>
            <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] text-[#2c1e12] mb-8">
              Дресс-код
            </h2>
            <div className="border border-[#c9a96e]/40 p-8 relative">
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c9a96e]" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c9a96e]" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#c9a96e]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c9a96e]" />
              <p className="font-cormorant italic text-[24px] text-[#2c1e12] mb-3">Вечерний наряд</p>
              <div className="w-10 h-px bg-[#c9a96e]/60 mx-auto mb-4" />
              <p className="font-cormorant font-light text-[17px] text-[#5a4535] leading-relaxed">
                Пожалуйста, выбирайте пастельные<br />и нейтральные тона.
              </p>
              <p className="font-cormorant italic text-[15px] text-[#9e8060] mt-2">
                Избегайте белого цвета.
              </p>
            </div>
          </section>

          {/* СЕКЦИЯ 7: Подтвердить присутствие */}
          <section className="relative px-8 py-16 overflow-hidden" style={{ background: "#ece6db" }}>
            <div className="absolute left-[-20px] top-10 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #c9b896, transparent)" }} />
            <div className="relative z-10 max-w-sm mx-auto">
              <h2 className="font-cormorant italic font-light text-[48px] leading-[1.1] text-[#2c1e12] mb-3 text-center">
                Подтвердить<br />присутствие
              </h2>
              <p className="font-cormorant font-light text-[17px] text-[#7a6450] text-center mb-10 leading-relaxed">
                Пожалуйста, дайте нам знать<br />до 1 августа 2026 года
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-[42px] mb-4">❤</div>
                  <p className="font-cormorant italic text-[26px] text-[#2c1e12] mb-2">
                    Спасибо, {name}!
                  </p>
                  <p className="font-cormorant font-light text-[17px] text-[#7a6450]">
                    Ждём вас с нетерпением
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirm} className="space-y-5">
                  {/* Имя */}
                  <div>
                    <label className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-[#9e8060] block mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Введите имя"
                      className="w-full bg-transparent border-b border-[#c9a96e]/60 pb-2 font-cormorant text-[18px] text-[#2c1e12] placeholder-[#b8a080] focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>

                  {/* Количество гостей */}
                  <div>
                    <label className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-[#9e8060] block mb-2">
                      Количество гостей
                    </label>
                    <div className="flex gap-3">
                      {["1", "2", "3+"].map(v => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setGuests(v)}
                          className={`w-12 h-12 rounded-full border font-cormorant text-[18px] transition-all ${
                            guests === v
                              ? "border-[#c9a96e] bg-[#c9a96e]/15 text-[#2c1e12]"
                              : "border-[#c9a96e]/40 text-[#7a6450]"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Кнопка */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 border border-[#c9a96e] font-cormorant italic text-[20px] text-[#2c1e12] tracking-wide transition-all hover:bg-[#c9a96e]/10 relative"
                    >
                      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c9a96e]" />
                      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#c9a96e]" />
                      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#c9a96e]" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c9a96e]" />
                      Я приду на свадьбу ❤
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* СЕКЦИЯ 8: Финал */}
          <section
            className="relative min-h-[55vh] flex flex-col items-center justify-center px-8 py-20 text-center overflow-hidden"
            style={{ background: "linear-gradient(180deg, #e8dfd0 0%, #d4c5a9 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, #f5ede0 0%, transparent 70%)`,
              opacity: 0.35
            }} />
            <div className="relative z-10">
              <p className="font-cormorant italic font-light text-[22px] text-[#3d2e1e] leading-relaxed mb-8">
                Ждём вас с нетерпением<br />и любовью ❤
              </p>
              <h2 className="font-cormorant italic font-light text-[48px] text-[#2c1e12]">
                Кристина &amp; Данил
              </h2>
              <div className="flex items-center gap-4 mt-6 justify-center">
                <span className="w-16 h-px bg-[#c9a96e]/60" />
                <span className="text-[#c9a96e] text-lg">✦</span>
                <span className="w-16 h-px bg-[#c9a96e]/60" />
              </div>
              <p className="font-montserrat text-[11px] tracking-[0.3em] text-[#9e8060] mt-6 uppercase">
                5 сентября 2026
              </p>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
