import { useState, useEffect } from "react";

const GET_GUESTS_URL = "https://functions.poehali.dev/7b7fd222-2882-4f6e-a2fc-48d644fcc184";

const C = {
  bg: "#f2ede4",
  bgDark: "#e8dfd0",
  section2: "#eae3d6",
  olive: "#5a6642",
  oliveMid: "#7a8a58",
  oliveLight: "#9aaa78",
  brown: "#4a3428",
  brownMid: "#6b4c38",
  cream: "#f0e8d5",
  sand: "#c8b898",
  text: "#2e2218",
  textMid: "#5a4535",
  textLight: "#8a7560",
};

interface Guest {
  id: number;
  name: string;
  confirmed_at: string;
}

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGuests = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(GET_GUESTS_URL, {
        headers: { "X-Admin-Key": adminKey },
      });
      if (res.status === 403) {
        setError("Неверный ключ");
        setLoading(false);
        return;
      }
      const data = await res.json();
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      setGuests(parsed.guests || []);
      setTotal(parsed.total || 0);
      setAuthed(true);
    } catch {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGuests(key);
  };

  const handleRefresh = () => {
    fetchGuests(key);
  };

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: `linear-gradient(160deg, ${C.bgDark} 0%, #ddd4be 50%, #cdc2a6 100%)` }}
      >
        <div className="w-full max-w-xs">
          <div className="text-center mb-10">
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: C.olive }}>
              ПАНЕЛЬ УПРАВЛЕНИЯ
            </p>
            <h1 className="font-cormorant italic font-light text-[44px] leading-tight" style={{ color: C.brown }}>
              Список<br />гостей
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-montserrat text-[11px] tracking-[0.25em] uppercase block mb-2" style={{ color: C.olive }}>
                Ключ доступа
              </label>
              <input
                type="password"
                required
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Введите пароль"
                className="w-full bg-transparent pb-2 font-cormorant text-[19px] focus:outline-none placeholder-[#a89878]"
                style={{ borderBottom: `1px solid ${C.olive}80`, color: C.brown }}
              />
            </div>
            {error && (
              <p className="font-cormorant italic text-[16px] text-center" style={{ color: "#8b3a2a" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 font-cormorant italic text-[20px] tracking-wide relative transition-all"
              style={{
                border: `1px solid ${C.olive}`,
                color: C.cream,
                background: loading ? `${C.olive}80` : C.olive,
              }}
            >
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: C.oliveLight }} />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: C.oliveLight }} />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: C.oliveLight }} />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: C.oliveLight }} />
              {loading ? "Загружаем..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-cormorant" style={{ background: C.bg }}>
      {/* Шапка */}
      <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: C.olive }}>
        <div>
          <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-white/70">
            Кристина &amp; Даниил · 8 августа 2026
          </p>
          <p className="font-cormorant italic text-white text-[20px] leading-tight mt-0.5">
            Список гостей
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="font-montserrat text-[11px] tracking-wider uppercase text-white/80 border border-white/30 px-4 py-2 transition-all hover:bg-white/10"
        >
          {loading ? "..." : "Обновить"}
        </button>
      </div>

      <div className="max-w-sm mx-auto px-6 py-8">
        {/* Счётчик */}
        <div className="flex items-center gap-4 mb-8 p-5 border"
          style={{ borderColor: `${C.olive}40`, background: C.section2 }}>
          <div className="relative flex-shrink-0">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: C.olive }} />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: C.olive }} />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: C.olive }} />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: C.olive }} />
            <div className="px-5 py-3 text-center">
              <p className="font-cormorant font-light text-[52px] leading-none" style={{ color: C.brown }}>{total}</p>
              <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: C.olive }}>
                {total === 1 ? "гость" : total >= 2 && total <= 4 ? "гостя" : "гостей"}
              </p>
            </div>
          </div>
          <div>
            <p className="font-cormorant font-light text-[17px] leading-snug" style={{ color: C.textMid }}>
              подтвердили своё присутствие на свадьбе
            </p>
          </div>
        </div>

        {/* Список */}
        {guests.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-cormorant italic text-[22px]" style={{ color: C.textLight }}>
              Пока никто не подтвердил
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {guests.map((g, i) => (
              <div
                key={g.id}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: `1px solid ${C.olive}20` }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-cormorant font-light text-[15px] w-6 text-right flex-shrink-0"
                    style={{ color: C.sand }}>
                    {i + 1}
                  </span>
                  <span className="font-cormorant font-light text-[20px]" style={{ color: C.brown }}>
                    {g.name}
                  </span>
                </div>
                <span className="font-montserrat text-[11px]" style={{ color: C.textLight }}>
                  {g.confirmed_at}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}