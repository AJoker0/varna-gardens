'use client';

import { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Где лучше всего купить квартиру в Варне?",
      answer: "При покупке квартиры, прежде всего, следует ориентироваться на удобство расположения и наличие инфраструктуры. Микрорайон «Варненские Сады» расположен в идеальной транспортной развязке, всего в 20 минутах от моря."
    },
    {
      question: "Сколько стоят квартиры в «Варненских Садах»?",
      answer: "Стоимость зависит от площади, этажа и стадии строительства. Воспользуйтесь нашим планом этажей выше или оставьте заявку для получения точного прайса."
    },
    {
      question: "Как купить квартиру в рассрочку?",
      answer: "Мы предоставляем выгодные условия рассрочки от застройщика до 3 лет с первоначальным взносом от 30%. Для деталей свяжитесь с нашим менеджером."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center justify-center gap-4 text-center">
          <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
          FAQ
          <span className="h-0.5 w-12 bg-[#8cc63f]"></span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left font-bold text-white bg-[#7ab033] hover:bg-[#6c9b2d] flex justify-between items-center transition-colors rounded-xl"
              >
                <span>{faq.question}</span>
                <span className="text-2xl leading-none">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              <div 
                className={`px-6 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-125 py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}