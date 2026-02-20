'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Apartment {
  id: string;
  number: string;
  price: number;
  area: number;
  rooms: number;
  status: string;
  imageUrl: string;
}

interface Props {
  initialApartments: Apartment[];
}

export default function FilterWrapper({ initialApartments }: Props) {
  // 1. Состояния для отображаемых квартир
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>(initialApartments);

  // 2. Состояния для фильтров
  const [roomsFilter, setRoomsFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(150000); // Дефолтное макс. значение
  const [maxArea, setMaxArea] = useState<number>(150);

  // 3. Эффект, который запускается каждый раз, когда мы меняем любой фильтр
  useEffect(() => {
    let result = initialApartments;

    // Фильтр только по свободным квартирам (по желанию можно убрать)
    result = result.filter(apt => apt.status === 'available');

    // Фильтр по комнатам
    if (roomsFilter !== 'all') {
      result = result.filter(apt => apt.rooms === parseInt(roomsFilter));
    }

    // Фильтр по цене
    result = result.filter(apt => apt.price <= maxPrice);

    // Фильтр по площади
    // Если площадь в базе не указана, считаем её 0, чтобы не сломать код
    result = result.filter(apt => (apt.area || 0) <= maxArea);

    setFilteredApartments(result);
  }, [roomsFilter, maxPrice, maxArea, initialApartments]);

  return (
    <div>
      {/* ПАНЕЛЬ ФИЛЬТРОВ (Зеленая шапка как на референсе) */}
      <div className="bg-[#8cc63f] py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          
          {/* Фильтр: Комнаты */}
          <div>
            <label className="block text-sm font-bold mb-2 opacity-90">Количество комнат:</label>
            <select 
              value={roomsFilter}
              onChange={(e) => setRoomsFilter(e.target.value)}
              className="w-full bg-white text-gray-800 border-none rounded-lg px-4 py-3 font-medium focus:ring-2 focus:ring-white outline-none cursor-pointer"
            >
              <option value="all">Все варианты</option>
              <option value="1">1-комнатные</option>
              <option value="2">2-комнатные</option>
              <option value="3">3-комнатные</option>
            </select>
          </div>

          {/* Фильтр: Площадь */}
          <div>
            <label className="block text-sm font-bold mb-2 opacity-90">
              Площадь: до <span className="text-xl font-extrabold">{maxArea}</span> м²
            </label>
            <input 
              type="range" 
              min="20" 
              max="150" 
              value={maxArea}
              onChange={(e) => setMaxArea(parseInt(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Фильтр: Цена */}
          <div>
            <label className="block text-sm font-bold mb-2 opacity-90">
              Стоимость: до <span className="text-xl font-extrabold">${maxPrice.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="30000" 
              max="150000" 
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

        </div>
      </div>

      {/* СТАТИСТИКА И СОРТИРОВКА */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center text-sm font-medium text-gray-500 border-b border-gray-200">
        <div>Найдено квартир: <span className="font-bold text-gray-800">{filteredApartments.length}</span></div>
        <button 
          onClick={() => {
            setRoomsFilter('all');
            setMaxPrice(150000);
            setMaxArea(150);
          }}
          className="text-[#8cc63f] hover:underline"
        >
          Сбросить фильтры ✖
        </button>
      </div>

      {/* СЕТКА КВАРТИР */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {filteredApartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apt) => (
              <Link href={`/apartment/${apt.id}`} key={apt.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-64 bg-gray-50 p-6 flex items-center justify-center relative">
                  {/* Бейдж статуса */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Свободна
                  </div>
                  {apt.imageUrl ? (
                    <img src={apt.imageUrl} alt={`Квартира ${apt.number}`} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-gray-300 font-medium">Нет плана</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">№{apt.number}</h3>
                  <div className="flex justify-between items-center text-gray-600 mb-2">
                    <span>Комнат:</span>
                    <span className="font-bold text-gray-800">{apt.rooms || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 mb-4">
                    <span>Площадь:</span>
                    <span className="font-bold text-gray-800">{apt.area || '—'} м²</span>
                  </div>
                  <div className="text-2xl font-bold text-[#8cc63f] mb-4">
                    ${apt.price?.toLocaleString()}
                  </div>
                  <div className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#8cc63f] transition-colors">
                    Подробнее →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800">Квартиры не найдены</h3>
            <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтра</p>
          </div>
        )}
      </div>
    </div>
  );
}