export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновая картинка с затемнением */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* Затемнение для читаемости текста */}
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl md:text-4xl font-light mb-4 tracking-widest uppercase">
          «ВАРНЕНСКИЕ САДЫ»
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg">
          МИКРОРАЙОН, В КОТОРОМ <br /> КОМФОРТНО
        </h1>
        
        <div className="flex gap-6 justify-center mt-12">
          <button className="bg-[#8cc63f] hover:bg-[#7ab033] text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold transition-transform hover:scale-105 shadow-xl">
            <span className="text-2xl">3D</span>
            <span className="text-xs uppercase">Тур</span>
          </button>
          <button className="bg-[#8cc63f] hover:bg-[#7ab033] text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold transition-transform hover:scale-105 shadow-xl">
            <span className="text-2xl">▶</span>
            <span className="text-xs uppercase">Видео</span>
          </button>
        </div>
      </div>
    </section>
  );
}