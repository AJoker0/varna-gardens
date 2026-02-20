'use client';

import { useState } from 'react';
import axios from 'axios';


interface Props {
    apartmentNumber: string;
}

export default function BookingForm({ apartmentNumber }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    //function to submit data to strapi
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setStatus('loading');

        try {
            await axios.post('https://varna-gardens-production.up.railway.app/api/leads', {
                data: {
                    name: name, 
                    phone: phone,
                    apartment: `Квартира №${apartmentNumber}`
                }
            });
            setStatus('success');
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            setStatus('error');
        }
    };
    return (
    <>
      {/* Кнопка, которая открывает модалку */}
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md"
      >
        Забронировать квартиру
      </button>

      {/* Само всплывающее окно (Модалка) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none"
            >
              &times;
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600">Наш менеджер свяжется с вами в ближайшее время для бронирования квартиры №{apartmentNumber}.</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Бронирование</h3>
                <p className="text-gray-500 mb-6">Оставьте контакты, чтобы закрепить за собой квартиру №{apartmentNumber}</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                      placeholder="+38 (000) 000-00-00"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Произошла ошибка при отправке. Попробуйте еще раз.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors mt-2"
                  >
                    {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}