import axios from 'axios';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';

async function getApartmentData(id: string) {
  try {
    const res = await axios.get(`http://127.0.0.1:1337/api/apartments?filters[documentId][$eq]=${id}&populate=*`);
    
    const apartments = res.data.data;
    if (apartments && apartments.length > 0) {
      return apartments[0];
    }
    
    return null;
  } catch (error) {
    console.error("Ошибка сети:", error);
    return null;
  }
}

export default async function ApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const apartment = await getApartmentData(resolvedParams.id);

  if (!apartment) {
    return <div className="p-10 text-2xl font-bold flex justify-center mt-20">Квартира не найдена 🚨 Проверь URL или базу данных.</div>;
  }

  const data = apartment.attributes || apartment;

  let imageUrl = data.layoutImage?.url || "";
  if (imageUrl.startsWith('/')) {
    imageUrl = `http://127.0.0.1:1337${imageUrl}`;
  }

  return (
    <main className="min-h-screen bg-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
          &larr; Вернуться к выбору на плане
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          {/* Левая колонка: Картинка планировки */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center justify-center min-h-75">
            {imageUrl ? (
              <img src={imageUrl} alt={`Планировка квартиры ${data.number}`} className="max-w-full h-auto rounded shadow-sm" />
            ) : (
              <div className="text-gray-400">Картинка планировки пока не загружена в Strapi</div>
            )}
          </div>

          {/* Правая колонка: Информация */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Квартира №{data.number}
            </h1>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Количество комнат:</span>
                <span className="font-bold">{data.rooms || "—"}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Общая площадь:</span>
                <span className="font-bold">{data.area ? `${data.area} м²` : "—"}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Стоимость:</span>
                <span className="font-bold text-blue-600">${data.price?.toLocaleString()}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Статус:</span>
                <span className={`font-bold ${
                  data.statusFlat === 'available' ? 'text-green-600' : 
                  data.statusFlat === 'reserved' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.statusFlat === 'available' ? 'Свободна' : 
                   data.statusFlat === 'reserved' ? 'Забронирована' : 'Продана'}
                </span>
              </p>
            </div>

            <BookingForm apartmentNumber={data.number} />
          </div>
        </div>
      </div>
    </main>
  );
}