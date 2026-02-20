import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b-4 border-[#8cc63f]">
        
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 bg-[#8cc63f] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
            VG
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-800 uppercase">
            Варненские <br /> <span className="text-[#8cc63f]">Сады</span>
          </span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-700 relative">
          <Link href="/#about" className="hover:text-[#8cc63f] transition-colors py-8">О МИКРОРАЙОНЕ</Link>

          {/* ВЫПАДАЮЩЕЕ МЕНЮ (Dropdown) */}
          <div className="group relative py-8 cursor-pointer">
            <span className="hover:text-[#8cc63f] transition-colors flex items-center gap-1">
              ВЫБРАТЬ НЕДВИЖИМОСТЬ <span className="text-[10px]">▼</span>
            </span>
            
            {/* Скрытый блок меню, который появляется при наведении (group-hover) */}
            <div className="absolute top-20 left-0 w-64 bg-[#8cc63f] text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-b-lg overflow-hidden border-t border-white/20">
              <Link href="/#infrastructure" className="block px-6 py-4 hover:bg-[#7ab033] border-b border-white/20 transition-colors">
                КВАРТИРЫ ПО ГЕНПЛАНУ
              </Link>
              <Link href="/apartmentsearch" className="block px-6 py-4 hover:bg-[#7ab033] transition-colors">
                КВАРТИРЫ ПО ПАРАМЕТРАМ
              </Link>
            </div>
          </div>

          <Link href="/#gallery" className="hover:text-[#8cc63f] transition-colors py-8">ГАЛЕРЕЯ</Link>
          <Link href="/#faq" className="hover:text-[#8cc63f] transition-colors py-8">FAQ</Link>
        </nav>

        {/* Контакты */}
        <div className="font-bold text-gray-800 hidden lg:block">
          +35 (911) <span className="text-[#8cc63f] text-lg">777-7-111</span>
        </div>
      </div>
    </header>
  );
}