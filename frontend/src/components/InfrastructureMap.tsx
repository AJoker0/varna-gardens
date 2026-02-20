'use client';

import { useState } from 'react';

// Типизация для наших точек инфраструктуры
interface MapPoint {
  id: number;
  x: number; // Координата X в процентах (от левого края)
  y: number; // Координата Y в процентах (от верхнего края)
  number: string;
  title: string;
}

export default function InfrastructureMap() {
  // Состояние для хранения ID активной (наведенной) точки
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // Хардкодим точки для начала. 
  // В идеале (и ты уже знаешь как это делать) эти данные потом можно перенести в Strapi!
  const points: MapPoint[] = [
    { id: 1, x: 10, y: 67, number: "1", title: "Прогулочная аллея" },
    { id: 2, x: 55, y: 61, number: "2", title: "Детская площадка" },
    { id: 3, x: 36, y: 61, number: "3", title: "Подземный паркинг" },
    { id: 4, x: 71, y: 59, number: "4", title: "Супермаркет и кафе" },
    { id: 5, x: 52, y: 25, number: "5", title: "Спортивная зона" },
    { id: 6, x: 64, y: 32, number: "6", title: "Школа и детский сад" },
    { id: 7, x: 81, y: 15, number: "7", title: "Зона выгула собак" },
  ];

  return (
    <section id="infrastructure" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <span className="text-[#8cc63f] text-3xl">🌿</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 flex items-center justify-center gap-4">
            <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
            Инфраструктура
            <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Всё необходимое для комфортной жизни находится прямо на территории микрорайона.
          </p>
        </div>

        {/* Контейнер карты */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          
          {/* Сама картинка генплана */}
          <img 
            src="/master-plan.jpg" 
            alt="Генплан Варненские Сады" 
            className="w-full h-auto object-cover select-none"
          />

          {/* Темный оверлей для контрастности (опционально, если картинка слишком светлая) */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

          {/* Рендерим точки поверх картинки */}
          {points.map((point) => (
            <div
              key={point.id}
              // Позиционируем в процентах! Это делает карту адаптивной.
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => setActivePoint(point.id)}
              onMouseLeave={() => setActivePoint(null)}
            >
              {/* Сама кнопка-кружок */}
              <div className="relative group cursor-pointer">
                <div className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center 
                  font-bold text-sm md:text-base border-2 transition-all duration-300 shadow-lg
                  ${activePoint === point.id 
                    ? 'bg-white text-[#8cc63f] border-[#8cc63f] scale-110' 
                    : 'bg-[#8cc63f] text-white border-white hover:scale-110'}
                `}>
                  {point.number}
                </div>

                {/* Пульсирующий круг вокруг (красивый эффект) */}
                <div className="absolute inset-0 rounded-full border-2 border-[#8cc63f] animate-ping opacity-70 pointer-events-none"></div>
              </div>

              {/* Всплывающая подсказка (Tooltip) */}
              <div className={`
                absolute left-1/2 bottom-full mb-3 transform -translate-x-1/2 
                w-max bg-[#8cc63f] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl
                transition-all duration-300 ease-out origin-bottom pointer-events-none
                ${activePoint === point.id ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'}
              `}>
                {point.title}
                {/* Маленький треугольник снизу подсказки */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#8cc63f]"></div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}