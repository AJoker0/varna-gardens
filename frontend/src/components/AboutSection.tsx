export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="text-[#8cc63f] text-4xl">🍃</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-10 flex items-center justify-center gap-4">
          <span className="h-[2px] w-16 bg-[#8cc63f]"></span>
          Микрорайон «Таировские Сады»
          <span className="h-[2px] w-16 bg-[#8cc63f]"></span>
        </h2>
        
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Один из самых масштабных и инновационных проектов на юге Украины. Дизайнеры, архитекторы, урбанисты, строители — более 100 лучших специалистов страны работали над разработкой проекта.
          </p>
          <p>
            Одной из важных ценностей является создание экологически чистого пространства. Наша концепция — озеленение в любой точке, где только это возможно.
          </p>
        </div>

        <button className="mt-12 bg-[#8cc63f] hover:bg-[#7ab033] text-white uppercase text-sm font-bold py-4 px-10 rounded-full transition-colors">
          Читать далее
        </button>
      </div>
    </section>
  );
}