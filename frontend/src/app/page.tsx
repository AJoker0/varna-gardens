import axios from 'axios';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InteractivePlan from '@/components/InteractivePlan';
import AdvantagesSection from '@/components/AdvantagesSection';
import FaqSection from '@/components/FaqSection';
import ContactFooter from '@/components/ContactFooter';
import InfrastructureMap from '@/components/InfrastructureMap';

async function getFloorData() {
  try {
    const res = await axios.get('https://varna-gardens-production.up.railway.app/api/floors?populate=*');
    return res.data.data;
  } catch (error) {
    console.error("Ошибка сети:", error);
    return [];
  }
}

export default async function Home() {
  const floors = await getFloorData();
  
  let floorLevel = "—";
  let imageUrl = "";
  let apartmentsForPlan = [];

  if (floors && floors.length > 0) {
    const firstFloor = floors[0];
    floorLevel = firstFloor.level;
    imageUrl = firstFloor.planImage?.url || "";
    if (imageUrl.startsWith('/')) {
      imageUrl = `https://varna-gardens-production.up.railway.app${imageUrl}`;
    }
    
    const rawApartments = firstFloor.apartments || [];
    apartmentsForPlan = rawApartments.map((apt: any) => ({
      id: apt.documentId || apt.id,
      number: apt.number,
      status: apt.statusFlat, 
      price: apt.price,
      svgPolygon: apt.svgPolygon || ""
    }));
  }

  return (
    // Убираем отсюда padding, чтобы Hero секция заняла весь экран
    <main className="font-sans bg-gray-50 min-h-screen">
      
      {/* 1. Навигация */}
      <Header />

      {/* 2. Главный экран */}
      <HeroSection />

      {/* 3. О микрорайоне */}
      <AboutSection />

      {/* НОВЫЙ БЛОК: Интерактивный генплан */}
      <InfrastructureMap />

      {/* 4. Выбор недвижимости (Наш интерактивный план) */}
      <section id="plan" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-bold text-gray-800 mb-4">Выбор недвижимости</h2>
             <p className="text-gray-500">Секция 1 • Выбор на этаже {floorLevel}</p>
          </div>
          
          {apartmentsForPlan.length > 0 ? (
            <InteractivePlan apartments={apartmentsForPlan} imageUrl={imageUrl} />
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow">Данные этажа не найдены в Strapi.</div>
          )}
        </div>
      </section>
      <AdvantagesSection />
      <FaqSection />
      <ContactFooter />

    </main>
  );
}