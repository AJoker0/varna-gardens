export default function ContactFooter() {
  return (
    <footer id="contacts" className="relative bg-[#8cc63f] overflow-hidden">
      {/* Фоновая картинка с наложением */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Форма */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Задайте вопрос и мы с радостью Вам поможем
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Ваше имя*" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 outline-none focus:ring-2 focus:ring-[#8cc63f] text-gray-900 placeholder-gray-400" required />
              <input type="tel" placeholder="Телефон*" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 outline-none focus:ring-2 focus:ring-[#8cc63f] text-gray-900 placeholder-gray-400" required />
            </div>
            <textarea placeholder="Ваш вопрос*" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 outline-none focus:ring-2 focus:ring-[#8cc63f] text-gray-900 placeholder-gray-400" required></textarea>
            <button type="button" className="bg-[#8cc63f] hover:bg-[#7ab033] text-white font-bold uppercase tracking-wider py-4 px-12 rounded-full transition-transform hover:scale-105 shadow-lg">
              Отправить
            </button>
          </form>
        </div>

        {/* Контакты Футера */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-sm border-t border-white/30 pt-10">
          <div>
            <div className="font-extrabold text-2xl tracking-tight mb-2">
              ВАРНЕНСКИЕ <br /> САДЫ
            </div>
            <p className="opacity-80">© «Варненские Сады», 2026</p>
          </div>
          
          <div className="space-y-2 font-medium">
            <p>📍 г. Варна, ул. Академика, 93/1</p>
            <p>📞 +35 (911) 777-7-111</p>
            <p>✉️ sale@varna-gardens.com</p>
          </div>

          <div className="text-right flex flex-col items-end">
            <p className="mb-4 font-bold">Следите за нами:</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 cursor-pointer transition-colors">FB</div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 cursor-pointer transition-colors">IG</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}