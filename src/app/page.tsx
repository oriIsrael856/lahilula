"use client";
import { useState, useMemo } from 'react';

// הגדרת קטגוריות
const CATEGORIES = ["הכל", "מנות ראשונות", "מגשי אירוח", "פסטות ועיקריות", "מאפים"];

const MENU = [
  { id: 1, name: "סביצ'ה דג", price: 65, category: "מנות ראשונות", desc: "דג טרי בתיבול עדין, שמן זית, לימון ועשבי תיבול מהגינה", color: "from-[#8BA888] to-[#5F7460]" },
  { id: 2, name: "ברוסקטת גבינות", price: 58, category: "מנות ראשונות", desc: "גבינות בוטיק, דבש ופירות העונה", color: "from-[#D4A5A5] to-[#B88686]" },
  { id: 3, name: "לחמניות של אמא", price: 50, category: "מאפים", desc: "לחמניות עבודת יד ממולאות במטבוחה ביתית, חצילים מטוגנים ופשטידה" },
  { id: 4, name: "פריקסה", price: 28, category: "מנות ראשונות", desc: "סנדוויץ' תוניסאי מסורתי מטוגן" },
  { id: 5, name: "קיש בטטה", price: 50, category: "מאפים", desc: "בצק פריך במילוי שמנת ובטטה" },
  { id: 6, name: "קיש תפ''א ופטריות", price: 50, category: "מאפים", desc: "שילוב קלאסי של תפוחי אדמה ופטריות טריות" },
  { id: 7, name: "מיני קישים", price: 50, category: "מגשי אירוח", desc: "מגש מיני קישים במגוון טעמים" },
  { id: 8, name: "מיני טורטיה", price: 50, category: "מגשי אירוח", desc: "טורטיות ביס מגולגלות עם מילויים שונים" },
  { id: 9, name: "מיני פוקאצ'ה", price: 50, category: "מגשי אירוח", desc: "פוקאצ'ות אישיות עם ירקות אנטיפסטי" },
  { id: 10, name: "מגש לביבות תפ''א", price: 50, category: "מגשי אירוח", desc: "לביבות זהובות ופריכות (לטקס)" },
  { id: 11, name: "מגש סושי", price: 50, category: "מגשי אירוח", desc: "סושי צמחוני/דגים טרי ואיכותי" },
  { id: 12, name: "מגש אנטיפסטי", price: 50, category: "מגשי אירוח", desc: "ירקות קלויים בתנור בשמן זית ועשבי תיבול" },
  { id: 13, name: "מגש גבינות מפנק", price: 50, category: "מגשי אירוח", desc: "מבחר גבינות קשות ורכות, פירות ואגוזים" },
  { id: 14, name: "מיני פיתה סביח", price: 50, category: "מגשי אירוח", desc: "פיתות ביס עם חציל, ביצה וטחינה" },
  { id: 15, name: "קרואסונים ממולאים", price: 50, category: "מגשי אירוח", desc: "במילוי גבינת שמנת וסלמון מעושן" },
  { id: 17, name: "קוסקוס של סבתא", price: 50, category: "פסטות ועיקריות", desc: "קוסקוס דק עבודת יד עם מרק ירקות עשיר" },
  { id: 18, name: "פסטה רוזה", price: 50, category: "פסטות ועיקריות", desc: "רוטב עגבניות ושמנת קטיפתי" },
  { id: 19, name: "פסטה שמנת פטריות", price: 50, category: "פסטות ועיקריות", desc: "רוטב שמנת עשיר עם פטריות טריות" },
  { id: 20, name: "פסטה ירקות מוקפצים", price: 50, category: "פסטות ועיקריות", desc: "בשמן זית ושום" },
  { id: 21, name: "שקשוקה", price: 50, category: "מנות ראשונות", desc: "פיקנטית עם לחם ביתי" },
  { id: 22, name: "תפו''א מוקרם", price: 50, category: "פסטות ועיקריות", desc: "פרוסות תפוחי אדמה בשמנת וגבינות" },
  { id: 23, name: "תפו''א/בטטה בתנור", price: 50, category: "פסטות ועיקריות", desc: "פלחי ירקות שורש צלויים" }
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '' });
  const [activeCategory, setActiveCategory] = useState("הכל");

  const filteredMenu = useMemo(() => 
    activeCategory === "הכל" ? MENU : MENU.filter(m => m.category === activeCategory)
  , [activeCategory]);

  const update = (id: number, delta: number) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = MENU.find(i => i.id === Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const send = () => {
    const items = Object.entries(cart).filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const item = MENU.find(i => i.id === Number(id));
        return `• ${item?.name} (${q} יח')`;
      }).join('\n');
    
    const text = `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי לקוח:\nשם: ${info.name}\nכתובת: ${info.address}`;
    window.open(`https://wa.me/972506669062?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white pb-44 px-4 relative overflow-x-hidden font-sans" dir="rtl">
      
      {/* הילות הרקע */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8BA888]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-[#D4A5A5]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="max-w-2xl mx-auto pt-16 pb-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-[#C48F65]/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img src="/logo.jpg" alt="Logo" className="relative w-40 h-40 object-contain rounded-full border border-white/5 shadow-2xl" />
            </div>
        </div>

        {/* כותרת מנצנצת עם האפקט המקורי */}
        <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] rounded-full blur-xl opacity-20 animate-pulse"></div>
            <h1 className="relative text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#C48F65]">
                La Hilula
            </h1>
        </div>
        
        {/* שורת פרטים עם מספר הטלפון */}
        <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-[#8BA888]/30"></div>
            <p className="text-[#8BA888] font-bold tracking-[0.15em] text-xs uppercase italic">
                Ilanit Israel • 050-666-9062
            </p>
            <div className="h-[1px] w-8 bg-[#8BA888]/30"></div>
        </div>
      </header>

      {/* תפריט קטגוריות צף */}
      <div className="max-w-xl mx-auto flex gap-2 overflow-x-auto pb-8 no-scrollbar sticky top-0 z-20 bg-[#0d0d0d]/80 backdrop-blur-md pt-4">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-[#C48F65] border-[#C48F65] text-white' : 'border-white/10 text-gray-500 hover:border-white/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-4 relative z-10">
        {filteredMenu.map(item => (
          <div key={item.id} className="bg-[#161616] rounded-3xl p-5 border border-white/5 flex items-center justify-between group hover:border-[#D4A5A5]/20 transition-all shadow-lg">
            <div className="flex-1 pl-4">
              <h3 className="text-xl font-bold group-hover:text-[#D4A5A5] transition-colors">{item.name}</h3>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
              <span className="text-[#C48F65] font-black block mt-2">₪{item.price}</span>
            </div>
            
            <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
              <button onClick={() => update(item.id, 1)} className="w-10 h-10 bg-gradient-to-br from-[#8BA888] to-[#5F7460] rounded-xl font-bold text-xl active:scale-90 transition-all text-white shadow-[0_0_10px_rgba(139,168,136,0.3)]">+</button>
              <span className="font-black text-lg w-4 text-center">{cart[item.id] || 0}</span>
              <button onClick={() => update(item.id, -1)} className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all ${cart[item.id] ? 'opacity-100 hover:bg-white hover:text-black' : 'opacity-20 pointer-events-none'}`}>-</button>
            </div>
          </div>
        ))}

        <div className="pt-10 space-y-4">
            <input placeholder="שם מלא" className="w-full bg-[#161616] border border-white/5 p-5 rounded-2xl outline-none focus:border-[#D4A5A5]/50 transition-colors placeholder:text-gray-600" onChange={e => setInfo({...info, name: e.target.value})} />
            <input placeholder="כתובת למשלוח" className="w-full bg-[#161616] border border-white/5 p-5 rounded-2xl outline-none focus:border-[#D4A5A5]/50 transition-colors placeholder:text-gray-600" onChange={e => setInfo({...info, address: e.target.value})} />
        </div>
      </div>

      {subtotal > 0 && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
          <div className="max-w-md mx-auto bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] p-[1px] rounded-[2.5rem] shadow-[0_0_30px_rgba(196,143,101,0.3)]">
            <div className="bg-[#0d0d0d] rounded-[2.4rem] p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">סה"כ לתשלום</p>
                <span className="text-3xl font-black text-white">₪{subtotal}</span>
              </div>
              <button onClick={send} className="bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-[#C48F65] hover:text-white transition-all shadow-lg flex items-center gap-2">
                <span>להזמנה</span>
                <span className="text-xl">🚀</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}