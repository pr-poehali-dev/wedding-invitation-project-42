const Index = () => {
  return (
    <div className="min-h-screen bg-[#f9f6f1] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">

        {/* Outer border frame */}
        <div className="relative border border-[#c9a96e]/40 p-10 md:p-14">

          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c9a96e]" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#c9a96e]" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#c9a96e]" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#c9a96e]" />

          {/* Inner content */}
          <div className="text-center space-y-0">

            {/* Pre-header */}
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#9e8a70] animate-fade-up delay-100">
              вы приглашены
            </p>

            {/* Top divider */}
            <div className="flex items-center gap-4 py-6 animate-fade-in delay-200">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]/60" />
              <span className="text-[#c9a96e] text-lg">✦</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]/60" />
            </div>

            {/* Names */}
            <div className="animate-fade-up delay-300">
              <h1 className="font-cormorant font-light text-[56px] md:text-[68px] leading-none text-[#2c2420] tracking-wide">
                Александр
              </h1>
              <p className="font-cormorant italic font-light text-[22px] text-[#9e8a70] mt-1 mb-1 tracking-wider">
                и
              </p>
              <h1 className="font-cormorant font-light text-[56px] md:text-[68px] leading-none text-[#2c2420] tracking-wide">
                Екатерина
              </h1>
            </div>

            {/* Middle divider */}
            <div className="flex items-center gap-4 py-6 animate-fade-in delay-500">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]/60" />
              <span className="text-[#c9a96e] text-lg">✦</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]/60" />
            </div>

            {/* Announcement */}
            <p className="font-cormorant italic font-light text-xl text-[#5c4a3a] leading-relaxed animate-fade-up delay-600">
              с радостью приглашают вас<br />разделить с ними<br />этот особенный день
            </p>

            {/* Date */}
            <div className="pt-10 animate-fade-up delay-700">
              <p className="font-cormorant-sc font-light text-[13px] tracking-[0.3em] text-[#9e8a70] uppercase mb-2">
                дата
              </p>
              <p className="font-cormorant font-light text-4xl text-[#2c2420] tracking-widest">
                14 · 09 · 2025
              </p>
              <p className="font-montserrat text-[11px] tracking-[0.2em] text-[#9e8a70] mt-1 uppercase">
                суббота
              </p>
            </div>

            {/* Time */}
            <div className="pt-6 animate-fade-up delay-800">
              <p className="font-cormorant-sc font-light text-[13px] tracking-[0.3em] text-[#9e8a70] uppercase mb-2">
                начало
              </p>
              <p className="font-cormorant font-light text-3xl text-[#2c2420] tracking-widest">
                16 : 00
              </p>
            </div>

            {/* Location */}
            <div className="pt-6 animate-fade-up delay-900">
              <p className="font-cormorant-sc font-light text-[13px] tracking-[0.3em] text-[#9e8a70] uppercase mb-2">
                место
              </p>
              <p className="font-cormorant font-light text-2xl text-[#2c2420]">
                Ресторан «Усадьба»
              </p>
              <p className="font-montserrat font-light text-[12px] text-[#9e8a70] mt-1 tracking-wider">
                ул. Садовая, 12, Москва
              </p>
            </div>

            {/* Dress code */}
            <div className="pt-8 animate-fade-up delay-1000">
              <div className="inline-block border border-[#c9a96e]/50 px-8 py-4">
                <p className="font-cormorant-sc font-light text-[11px] tracking-[0.3em] text-[#9e8a70] uppercase mb-1">
                  дресс-код
                </p>
                <p className="font-cormorant italic font-light text-lg text-[#5c4a3a]">
                  Вечерний наряд
                </p>
                <p className="font-montserrat font-light text-[11px] text-[#b8a080] mt-1 tracking-wider">
                  Пастельные и нейтральные тона
                </p>
              </div>
            </div>

            {/* Bottom divider */}
            <div className="flex items-center gap-4 py-8 animate-fade-in delay-1100">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]/60" />
              <span className="text-[#c9a96e] text-lg">✦</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]/60" />
            </div>

            {/* Footer note */}
            <p className="font-cormorant italic font-light text-base text-[#9e8a70] leading-relaxed animate-fade-up delay-1200">
              Пожалуйста, подтвердите своё присутствие<br />до 1 сентября 2025 года
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
