import axios from 'axios';
import InteractivePlan from '@/components/InteractivePlan';

async function getApartments() {
  try {
    const res = await axios.get('http://127.0.0.1:1337/api/apartments');
    return res.data.data;
  } catch (error) {
    console.error("Ошибка сети:", error);
    return [];
  }
}

export default async function Home() {
  const rawApartments = await getApartments();

  // Подготавливаем данные для компонента
  // Подготавливаем данные для компонента
  const apartmentsForPlan = rawApartments.map((apt: any) => {
    const data = apt.attributes || apt;
    
    // ВАЖНО: Выведем данные в консоль терминала, чтобы точно видеть, 
    // как Strapi присылает названия полей (помогает при дебаге)
    console.log("Данные квартиры:", data); 

    return {
      id: apt.documentId || apt.id,
      number: data.number,
      
      // ИСПРАВЛЕНИЕ 1: Меняем status на statusflat 
      // (или statusFlat, посмотри в консоли терминала, как точно написано)
      status: data.statusFlat, 
      
      price: data.price,
      
      // ИСПРАВЛЕНИЕ 2: Убираем хардкод и берем координаты из базы
      svgPolygon: data.svgPolygon || "" 
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
          ЖК "Солнечный город"
        </h1>
        <p className="text-gray-500 mb-8">Секция 1 • Выбор на этаже</p>
        
        {/* Рендерим наш изолированный компонент */}
        <InteractivePlan apartments={apartmentsForPlan} />
      </div>
    </main>
  );
}