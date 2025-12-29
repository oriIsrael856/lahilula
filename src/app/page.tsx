"use client";
import { useState } from 'react';

const MENU = [
  { id: 1, name: "קציצות הבית ברוטב", price: 65, desc: "בקר טרי בבישול ארוך עם ירקות שורש", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80", color: "from-orange-500 to-orange-700" },
  { id: 2, name: "מוסקה חצילים", price: 58, desc: "שכבות חצילים קלויים ובשר ברוטב ביתי", image: "https://images.unsplash.com/photo-1590515174093-66f654b7f940?w=400&q=80", color: "from-orange-600 to-red-700" },
  { id: 3, name: "אורז צהוב עם שקדים", price: 28, desc: "אורז בסמטי נימוח עם שקדים קלויים", image: "https://images.unsplash.com/photo-1512058560566-42724afbc2db?w=400&q=80", color: "from-yellow-500 to-orange-600" }
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '' });

  const update = (id: number, delta: number) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = MENU.find(i => i.id === Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const send = () => {
    const items = Object.entries(cart).filter(([_, q]) => q > 0)
      .map(([id, q]) => `${MENU.find(i => i.id === Number(id))?.name} x${q}`).join('\n');
    const text = `הזמנה חדשה מ"המטבח של אילנית":\n\n${items}\n\nסה"כ: ₪${subtotal + 30}\nשם: ${info.name}\nכתובת: ${info.address}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-44 px-4 relative overflow-x-hidden" dir="rtl">
      
      {/* אלמנטים עיצוביים ברקע (הילות כתומות) */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-orange-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header דרמטי */}
      <header className="max-w-2xl mx-auto pt-20 pb-16 text-center relative z-10">
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-orange-500">
            המטבח של אילנית
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-orange-900"></div>
            <p className="text-orange-500 font-bold tracking-[0.3em] text-xs uppercase">Premium Home Cooking</p>
            <div className="h-[1px] w-8 bg-orange-900"></div>
        </div>
      </header>

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        {MENU.map(item => (
          <div key={item.id} className="group bg-[#141414] rounded-[2rem] overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
            <div className="flex flex-col sm:flex-row h-auto sm:h-44">
              
              {/* תמונה עם פילטר כהה שמתבהר ב-Hover */}
              <div className="w-full sm:w-44 h-44 sm:h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>

              {/* תוכן המנה */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{item.name}</h3>
                    <span className="text-orange-500 font-black text-xl">₪{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
                
                <div className="flex items-center justify-end mt-4">
                  {/* בקר כמות מעוצב - שחור וכתום */}
                  <div className="flex items-center gap-4 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                    <button 
                        onClick={() => update(item.id, 1)} 
                        className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl font-bold text-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] active:scale-90 transition-all"
                    >
                        +
                    </button>
                    <span className="font-black text-lg w-4 text-center text-white">{cart[item.id] || 0}</span>
                    <button 
                      onClick={() => update(item.id, -1)} 
                      className={`w-10 h-10 bg-[#222] border border-white/10 text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all ${cart[item.id] ? 'hover:bg-white hover:text-black opacity-100' : 'opacity-20 pointer-events-none'}`}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* שדות קלט בסגנון Dark Mode */}
        <div className="pt-10 space-y-4">
            <input 
                placeholder="שם מלא" 
                className="w-full bg-[#141414] border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500 transition-colors text-white placeholder:text-gray-600"
                onChange={e => setInfo({...info, name: e.target.value})}
            />
            <input 
                placeholder="כתובת למשלוח" 
                className="w-full bg-[#141414] border border-white/10 p-5 rounded-2xl outline-none focus:border-orange-500 transition-colors text-white placeholder:text-gray-600"
                onChange={e => setInfo({...info, address: e.target.value})}
            />
        </div>
      </div>

      {/* כפתור סיכום צף - שחור וכתום עמוק */}
      {subtotal > 0 && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
          <div className="max-w-md mx-auto bg-orange-600 p-1 rounded-[2.5rem] shadow-[0_0_50px_rgba(234,88,12,0.3)]">
            <div className="bg-[#0a0a0a] rounded-[2.4rem] p-6 flex items-center justify-between border border-white/5">
              <div className="text-right">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">סה"כ לתשלום</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black text-white">₪{subtotal}</span>
                   <span className="text-xs text-orange-500 font-medium">(כולל משלוח)</span>
                </div>
              </div>
              
              <button 
                onClick={send}
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] active:scale-95 transition-all flex items-center gap-2"
              >
                להזמנה 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}