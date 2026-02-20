'use client';

import { useState } from 'react';

interface Apartment {
  id: string | number;
  number: string;
  status: string;
  price: number;
  svgPolygon: string;
}

interface Props {
  apartments: Apartment[];
}

export default function InteractivePlan({ apartments }: Props) {
  // Состояния для хранения информации о том, над какой квартирой мышка
  // и где именно (координаты X и Y) находится курсор
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="mt-10 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Выбор квартиры на плане</h2>
      
      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
        
        <img 
          src="/floor-plan.jpg" 
          alt="План этажа" 
          className="w-full h-auto block select-none pointer-events-none"
        />

        <svg 
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 875" 
          preserveAspectRatio="none"
        >
          {apartments.map((apt) => {
            if (!apt.svgPolygon) return null; // Защита, если координаты пустые

            const isAvailable = apt.status === 'available';
            const isSold = apt.status === 'sold';
            
            // Логика цветов: Свободна = зеленый, Продана = красный, Иначе = серый
            let fillColor = '#6b7280'; // Серый по умолчанию
            if (isAvailable) fillColor = '#22c55e'; // Зеленый
            if (isSold) fillColor = '#ef4444'; // Красный

            return (
              <polygon
                key={apt.id}
                points={apt.svgPolygon}
                fill={fillColor}
                className={`
                  opacity-40 transition-all duration-200
                  ${isAvailable ? 'hover:opacity-70 hover:stroke-white stroke-[3px] cursor-pointer' : ''}
                  ${isSold ? 'cursor-not-allowed opacity-30' : ''}
                `}
                // Отслеживаем мышь
                onMouseEnter={(e) => {
                  setHoveredApt(apt);
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredApt(null)}
                // Клик только по свободным
                onClick={() => {
                  if (isAvailable) {
                    alert(`Открываем страницу квартиры №${apt.number}`);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Всплывающая подсказка (Tooltip) */}
      {hoveredApt && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 shadow-xl rounded-lg p-4 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-3.75px"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y 
          }}
        >
          <div className="text-lg font-bold text-gray-800 mb-1">
            Квартира №{hoveredApt.number}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Цена: <span className="font-semibold text-blue-600">${hoveredApt.price.toLocaleString()}</span>
          </div>
          
          <div className={`text-xs px-2 py-1 rounded inline-block font-semibold
            ${hoveredApt.status === 'available' ? 'bg-green-100 text-green-700' : ''}
            ${hoveredApt.status === 'sold' ? 'bg-red-100 text-red-700' : ''}
            ${!['available', 'sold'].includes(hoveredApt.status) ? 'bg-gray-100 text-gray-700' : ''}
          `}>
            {hoveredApt.status === 'available' ? 'Свободна' : hoveredApt.status === 'sold' ? 'Продана' : 'Неизвестно'}
          </div>
        </div>
      )}
    </div>
  );
}