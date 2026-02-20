import axios from 'axios';
import Header from '@/components/Header';
import ContactFooter from '@/components/ContactFooter';
import FilterWrapper from '@/components/FilterWrapper';

// Серверная функция для загрузки ВСЕХ квартир
// Серверная функция для загрузки ВСЕХ квартир
async function getAllApartments() {
  try {
    // ИСПРАВЛЕНИЕ: Меняем сложный populate на универсальный ?populate=*
    const res = await axios.get('http://127.0.0.1:1337/api/apartments?populate=*');
    return res.data.data;
  } catch (error) {
    console.error("Ошибка при загрузке квартир:", error);
    return [];
  }
}

export default async function SearchPage() {
  const rawData = await getAllApartments();

  // Причесываем данные из Strapi перед тем как отдать их в клиентский компонент
  const apartments = rawData.map((item: any) => {
    const data = item.attributes || item;
    
    // Формируем правильный путь к картинке планировки
    let imgUrl = data.layoutImage?.url || "";
    if (imgUrl.startsWith('/')) {
      imgUrl = `http://127.0.0.1:1337${imgUrl}`;
    }

    return {
      id: item.documentId || item.id,
      number: data.number,
      price: data.price,
      area: data.area,
      rooms: data.rooms,
      status: data.statusFlat,
      imageUrl: imgUrl,
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 font-sans pt-20">
      <Header />
      
      {/* Передаем чистые данные в наш умный фильтр */}
      <FilterWrapper initialApartments={apartments} />

      <ContactFooter />
    </main>
  );
}