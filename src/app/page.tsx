"use client";
import { useState, useMemo } from 'react';

// הגדרת קטגוריות
const CATEGORIES = ["הכל", "מנות ראשונות", "מגשי אירוח", "פסטות ועיקריות", "מאפים"];

const MENU = [
  // --- מנות ראשונות ---
  { id: 1, name: "סביצ'ה דג", price: 65, category: "מנות ראשונות", desc: "דג טרי בתיבול עדין, שמן זית, לימון ועשבי תיבול מהגינה", color: "from-[#8BA888] to-[#5F7460]" },
  { id: 2, name: "ברוסקטת גבינות", price: 58, category: "מנות ראשונות", desc: "גבינות בוטיק, דבש ופירות העונה", color: "from-[#D4A5A5] to-[#B88686]" },
  { id: 21, name: "שקשוקה", price: 50, category: "מנות ראשונות", desc: "פיקנטית עם לחם ביתי" },

  // --- מאפים ---
  { id: 3, name: "לחמניות של אמא", price: 8, category: "מאפים", desc: "מינימום 10 יח' - ממולאות במטבוחה ביתית וחצילים" },
  { id: 5, name: "קיש בטטה (משפחתי)", price: 65, category: "מאפים", desc: "בצק פריך במילוי שמנת ובטטה" },
  { id: 6, name: "קיש תפ''א ופטריות (משפחתי)", price: 65, category: "מאפים", desc: "שילוב קלאסי של תפוחי אדמה ופטריות טריות" },

  // --- מגשי אירוח ---
  { id: 4, name: "מיני פריקסה", price: 14, category: "מגשי אירוח", desc: "סנדוויץ' תוניסאי ביס עם כל התוספות (מחיר ליח')" },
  { id: 7, name: "מיני קישים", price: 9, category: "מגשי אירוח", desc: "מבחר טעמים: בצל/פטריות/בטטה (מחיר ליח')" },
  { id: 8, name: "מיני טורטיה", price: 12, category: "מגשי אירוח", desc: "מגולגלות עם ממרחים וירקות קלויים (מחיר ליח')" },
  { id: 9, name: "מיני פוקאצ'ה", price: 10, category: "מגשי אירוח", desc: "עם ירקות אנטיפסטי ושמן זית (מחיר ליח')" },
  { id: 10, name: "לביבות תפ''א (לטקס)", price: 6, category: "מגשי אירוח", desc: "זהובות ופריכות (מחיר ליח')" },
  { id: 11, name: "סושי (יחידה)", price: 5, category: "מגשי אירוח", desc: "צמחוני/דג בציפויים מיוחדים (מחיר ליח')" },
  { id: 14, name: "מיני פיתה סביח", price: 14, category: "מגשי אירוח", desc: "ביס מושלם עם חציל, ביצה וטחינה (מחיר ליח')" },
  { id: 15, name: "קרואסון סלמון", price: 16, category: "מגשי אירוח", desc: "במילוי גבינת שמנת וסלמון מעושן (מחיר ליח')" },
  
  { id: 12, name: "מגש אנטיפסטי", price: 180, category: "מגשי אירוח", desc: "ירקות קלויים בתנור (מחיר למגש גדול)" },
  { id: 13, name: "מגש גבינות מפנק", price: 250, category: "מגשי אירוח", desc: "גבינות קשות ורכות, פירות ואגוזים (מחיר למגש)" },

  // --- פסטות ועיקריות ---
  { id: 17, name: "קוסקוס של סבתא", price: 50, category: "פסטות ועיקריות", desc: "עבודת יד עם מרק ירקות עשיר (מנה אישית)" },
  { id: 18, name: "פסטה רוזה", price: 52, category: "פסטות ועיקריות", desc: "רוטב עגבניות ושמנת קטיפתי" },
  { id: 19, name: "פסטה שמנת פטריות", price: 52, category: "פסטות ועיקריות", desc: "רוטב עשיר עם פטריות טריות" },
  { id: 20, name: "פסטה ירקות", price: 48, category: "פסטות ועיקריות", desc: "בשמן זית, שום ועשבי תיבול" },
  { id: 22, name: "תפו''א מוקרם", price: 55, category: "פסטות ועיקריות", desc: "בשמנת וגבינות" },
  { id: 23, name: "תפו''א/בטטה בתנור", price: 45, category: "פסטות ועיקריות", desc: "פלחי ירקות שורש צלויים" }
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '' });
  // כאן אנחנו שומרים איזה שדות חסרים כדי לצבוע אותם באדום
  const [errors, setErrors] = useState({ name: false, address: false });
  const [activeCategory, setActiveCategory] = useState("הכל");

  const filteredMenu = useMemo(() => 
    activeCategory === "הכל" ? MENU : MENU.filter(m => m.category === activeCategory)
  , [activeCategory]);

  const update = (id: number, delta: number) => {
    const item = MENU.find(i => i.id === id);
    if (!item) return;

    setCart(prev => {
      const currentQty = prev[id] || 0;
      let newQty = currentQty + delta;

      const isBulkItem = item.category === "מגשי אירוח" && !item.name.includes("מגש אנטיפסטי") && !item.name.includes("מגש גבינות");

      if (isBulkItem) {
        if (currentQty === 0 && delta > 0) return { ...prev, [id]: 30 };
        if (newQty < 30) return { ...prev, [id]: 0 };
      }

      return { ...prev, [id]: Math.max(0, newQty) };
    });
  };

  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = MENU.find(i => i.id === Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const send = () => {
    // 1. בדיקה אם העגלה ריקה
    if (subtotal === 0) {
        alert("העגלה ריקה! יש לבחור מנות לפני ההזמנה.");
        return;
    }

    // 2. בדיקת תקינות (Validation) לשדות
    const newErrors = {
        name: !info.name.trim(), // האם השם ריק?
        address: !info.address.trim() // האם הכתובת ריקה?
    };

    setErrors(newErrors);

    // אם יש שגיאה באחד השדות - עוצרים כאן ולא שולחים
    if (newErrors.name || newErrors.address) {
        // גלילה למטה לאזור הטופס כדי שהמשתמש יראה מה חסר
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return; 
    }

    // אם הכל תקין, ממשיכים לשליחה
    const items = Object.entries(cart).filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const item = MENU.find(i => i.id === Number(id));
        return `• ${item?.name} (${q} יח') - ₪${(item?.price || 0) * q}`;
      }).join('\n');
    
    const text = `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי לקוח:\nשם: ${info.name}\nכתובת: ${info.address}`;
    window.open(`https://wa.me/972506669062?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white pb-44 px-4 relative overflow-x-hidden font-sans" dir="rtl">
      
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8BA888]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-[#D4A5A5]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="max-w-2xl mx-auto pt-16 pb-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-[#C48F65]/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img src="/logo.jpg" alt="Logo" className="relative w-40 h-40 object-contain rounded-full border border-white/5 shadow-2xl" />
            </div>
        </div>

        <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] rounded-full blur-xl opacity-20 animate-pulse"></div>
            <h1 className="relative text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#C48F65]">
                La Hilula
            </h1>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-[#8BA888]/30"></div>
            <p className="text-[#8BA888] font-bold tracking-[0.15em] text-xs uppercase italic">
                Ilanit Israel • 050-666-9062
            </p>
            <div className="h-[1px] w-8 bg-[#8BA888]/30"></div>
        </div>
      </header>

      <div className="max-w-xl mx-auto flex gap-2 overflow-x-auto pb-8 no-scrollbar sticky top-0 z-20 bg-[#0d0d0d]/95 backdrop-blur-md pt-4">
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
        {filteredMenu.map(item => {
           const isBulkItem = item.category === "מגשי אירוח" && !item.name.includes("מגש אנטיפסטי") && !item.name.includes("מגש גבינות");
           
           return (
            <div key={item.id} className="bg-[#161616] rounded-3xl p-5 border border-white/5 flex items-center justify-between group hover:border-[#D4A5A5]/20 transition-all shadow-lg">
                <div className="flex-1 pl-4">
                <h3 className="text-xl font-bold group-hover:text-[#D4A5A5] transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#C48F65] font-black">₪{item.price}</span>
                    {isBulkItem && <span className="text-[10px] text-[#8BA888] bg-[#8BA888]/10 px-2 py-0.5 rounded-full">מינימום 30 יח'</span>}
                </div>
                </div>
                
                <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                <button onClick={() => update(item.id, 1)} className="w-10 h-10 bg-gradient-to-br from-[#8BA888] to-[#5F7460] rounded-xl font-bold text-xl active:scale-90 transition-all text-white shadow-[0_0_10px_rgba(139,168,136,0.3)]">+</button>
                <span className="font-black text-lg w-8 text-center">{cart[item.id] || 0}</span>
                <button onClick={() => update(item.id, -1)} className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all ${cart[item.id] ? 'opacity-100 hover:bg-white hover:text-black' : 'opacity-20 pointer-events-none'}`}>-</button>
                </div>
            </div>
        )})}

        <div className="pt-10 space-y-4 pb-10">
            <div>
                <input 
                    placeholder="שם מלא *" 
                    className={`w-full bg-[#161616] border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-600 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-white/5 focus:border-[#D4A5A5]/50'}`} 
                    onChange={e => {
                        setInfo({...info, name: e.target.value});
                        if(e.target.value) setErrors({...errors, name: false});
                    }} 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 mr-2">נא למלא שם מלא</p>}
            </div>

            <div>
                <input 
                    placeholder="כתובת למשלוח *" 
                    className={`w-full bg-[#161616] border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-600 ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-white/5 focus:border-[#D4A5A5]/50'}`} 
                    onChange={e => {
                        setInfo({...info, address: e.target.value});
                        if(e.target.value) setErrors({...errors, address: false});
                    }} 
                />
                {errors.address && <p className="text-red-500 text-xs mt-1 mr-2">נא למלא כתובת למשלוח</p>}
            </div>
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