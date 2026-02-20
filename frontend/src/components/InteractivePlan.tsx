'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Apartment {
  id: string | number;
  number: string;
  status: string;
  price: number;
  svgPolygon: string;
}

// ДОБАВИЛИ imageUrl в пропсы
interface Props {
  apartments: Apartment[];
  imageUrl: string; 
}

export default function InteractivePlan({ apartments, imageUrl }: Props) {
  const [hoveredApt, setHoveredApt] = useState<Apartment | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const router = useRouter();
  
  return (
    <div className="mt-10 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Выбор квартиры на плане</h2>
      
      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
        
        {/* ИЗМЕНИЛИ src на динамический imageUrl */}
        <img 
          src={imageUrl} 
          alt="План этажа" 
          className="w-full h-auto block select-none pointer-events-none"
        />

        <svg 
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 875" 
          preserveAspectRatio="none"
        >
          {apartments.map((apt) => {
            if (!apt.svgPolygon) return null;

            const isAvailable = apt.status === 'available';
            const isSold = apt.status === 'sold';
            const isReserved = apt.status === 'reserved';
            
            let fillColor = '#6b7280';
            if (isAvailable) fillColor = '#22c55e';
            if (isSold) fillColor = '#ef4444';
            if (isReserved) fillColor = '#eab308';

            return (
              <polygon
                key={apt.id}
                points={apt.svgPolygon}
                fill={fillColor}
                className={`
                  opacity-40 transition-all duration-200
                  ${isAvailable ? 'hover:opacity-70 hover:stroke-white stroke-[3px] cursor-pointer' : ''}
                  ${isSold ? 'cursor-not-allowed opacity-30' : ''}
                  ${isReserved ? 'cursor-help opacity-50' : ''}
                `}
                onMouseEnter={(e) => {
                  setHoveredApt(apt);
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredApt(null)}
                onClick={() => {
                  if (isAvailable) {
                    router.push(`/apartment/${apt.id}`);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      {hoveredApt && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 shadow-xl rounded-lg p-4 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-3.75"
          style={{ left: mousePos.x, top: mousePos.y }}
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
            ${hoveredApt.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${!['available', 'sold', 'reserved'].includes(hoveredApt.status) ? 'bg-gray-100 text-gray-700' : ''}
          `}>
            {hoveredApt.status === 'available' ? 'Свободна' : hoveredApt.status === 'sold' ? 'Продана' : hoveredApt.status === 'reserved' ? 'Бронь' : 'Неизвестно'}
          </div>
        </div>
      )}
    </div>
  );
}