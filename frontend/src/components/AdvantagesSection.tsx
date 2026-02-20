export default function AdvantagesSection() {
  const advantages = [
    { icon: "🛡️", text: "Безопасность" },
    { icon: "☀️", text: "Инсоляция" },
    { icon: "🍃", text: "Экология" },
    { icon: "🔄", text: "Сортировка" },
    { icon: "📍", text: "Локация" },
    { icon: "🏫", text: "Школа и Сад" },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-[#8cc63f] text-3xl">⭐</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 flex items-center justify-center gap-4">
          <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
          Преимущества
          <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
        </h2>
      </div>

      <div className="bg-[#8cc63f] py-8 w-full">
        <div className="max-w-6xl mx-auto px-4 flex justify-center flex-wrap gap-6 md:gap-12">
          {advantages.map((adv, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl border-4 border-transparent group-hover:border-white/50">
                {adv.icon}
              </div>
              <span className="mt-4 text-white font-bold text-sm uppercase tracking-wider">
                {adv.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}