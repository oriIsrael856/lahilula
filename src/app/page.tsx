"use client";
import { useState, useMemo, useEffect, useRef } from 'react';

// --- תמונות רקע לאווירה כללית ---
const BG_IMAGES = [
  "/bg1.jpeg", "/bg2.jpeg", "/bg3.jpeg", "/bg4.jpeg",
  "/bg5.jpeg", "/bg6.jpeg", "/bg7.jpeg", "/bg8.jpeg",
  "/bg9.jpeg", "/bg10.jpeg", "/bg11.jpeg", "/bg12.jpeg", "/bg13.jpeg"
];

const CATEGORIES = ["הכל", "מנות ראשונות", "מגשי אירוח", "עמדות לאירועים", "פסטות ועיקריות", "מאפים"];

// --- הגדרת המנות ---
const MENU = [
  // --- מנות ראשונות ---
  { 
    id: 1, 
    name: "סביצ'ה דג", 
    price: 65, 
    category: "מנות ראשונות", 
    desc: "דג טרי בתיבול עדין, שמן זית, לימון ועשבי תיבול מהגינה", 
    images: ["/ceviche1.jpg", "/ceviche2.jpg"] 
  },
  { 
    id: 2, 
    name: "ברוסקטת גבינות", 
    price: 58, 
    category: "מנות ראשונות", 
    desc: "גבינות בוטיק, דבש ופירות העונה", 
    images: ["/bruschetta.jpg"] 
  },
  { id: 21, name: "שקשוקה", price: 50, category: "מנות ראשונות", desc: "פיקנטית עם לחם ביתי", images: [] },

  // --- מאפים ---
  { id: 5, name: "קיש בטטה (משפחתי)", price: 65, category: "מאפים", desc: "בצק פריך במילוי שמנת ובטטה", images: ["/quiche_batata.jpg"] },
  { id: 6, name: "קיש תפ''א ופטריות (משפחתי)", price: 65, category: "מאפים", desc: "שילוב קלאסי של תפוחי אדמה ופטריות טריות", images: ["/quiche_mushroom.jpg"] },

  // --- עמדות לאירועים ---
  { 
    id: 24, 
    name: "עמדת מופלטות וספינג'", 
    price: 2500, 
    category: "עמדות לאירועים", 
    desc: "לאירועים עד 100 איש. כולל הכנה פרונטלית במקום, דבש, חמאה, ריבות ותה מרוקאי.",
    images: ["/mofletta1.jpg"]
  },

  // --- מגשי אירוח ---
  
  // *** המנה החדשה שהוספנו ***
  { 
    id: 25, 
    name: "מגש עוגיות מרוקאיות", 
    price: 200, 
    category: "מגשי אירוח", 
    desc: "מגש עשיר עם 20-25 עוגיות מרוקאיות אותנטיות בעבודת יד (מחיר למגש)", 
    images: ["/cp1.jpeg", "/cp2.jpeg"] // שים כאן תמונה של העוגיות
  },

  { id: 3, name: "לחמניות של אמא", price: 8, category: "מגשי אירוח", desc: "ממולאות במטבוחה ביתית וחצילים (מחיר ליח')", images: [] },
  { id: 4, name: "מיני פריקסה", price: 14, category: "מגשי אירוח", desc: "סנדוויץ' תוניסאי ביס עם כל התוספות (מחיר ליח')", images: [] },
  { id: 7, name: "מיני קישים", price: 9, category: "מגשי אירוח", desc: "מבחר טעמים: בצל/פטריות/בטטה (מחיר ליח')", images: [] },
  { id: 8, name: "מיני טורטיה", price: 12, category: "מגשי אירוח", desc: "מגולגלות עם ממרחים וירקות קלויים (מחיר ליח')", images: [] },
  { id: 9, name: "מיני פוקאצ'ה", price: 10, category: "מגשי אירוח", desc: "עם ירקות אנטיפסטי ושמן זית (מחיר ליח')", images: [] },
  { id: 10, name: "לביבות תפ''א (לטקס)", price: 6, category: "מגשי אירוח", desc: "זהובות ופריכות (מחיר ליח')", images: [] },
  { id: 11, name: "סושי (יחידה)", price: 5, category: "מגשי אירוח", desc: "צמחוני/דג בציפויים מיוחדים (מחיר ליח')", images: [] },
  { id: 14, name: "מיני פיתה סביח", price: 14, category: "מגשי אירוח", desc: "ביס מושלם עם חציל, ביצה וטחינה (מחיר ליח')", images: [] },
  { id: 15, name: "קרואסון סלמון", price: 16, category: "מגשי אירוח", desc: "במילוי גבינת שמנת וסלמון מעושן (מחיר ליח')", images: [] },
  
  // מגשים גדולים
  { id: 12, name: "מגש אנטיפסטי", price: 180, category: "מגשי אירוח", desc: "ירקות קלויים בתנור (מחיר למגש גדול)", images: ["/antipasti.jpg"] },
  { id: 13, name: "מגש גבינות מפנק", price: 250, category: "מגשי אירוח", desc: "גבינות קשות ורכות, פירות ואגוזים (מחיר למגש)", images: ["/cheese_platter.jpg"] },

  // --- פסטות ועיקריות ---
  { id: 17, name: "קוסקוס של סבתא", price: 50, category: "פסטות ועיקריות", desc: "עבודת יד עם מרק ירקות עשיר (מנה אישית)", images: [] },
  { id: 18, name: "פסטה רוזה", price: 52, category: "פסטות ועיקריות", desc: "רוטב עגבניות ושמנת קטיפתי", images: [] },
  { id: 19, name: "פסטה שמנת פטריות", price: 52, category: "פסטות ועיקריות", desc: "רוטב עשיר עם פטריות טריות", images: [] },
  { id: 20, name: "פסטה ירקות", price: 48, category: "פסטות ועיקריות", desc: "בשמן זית, שום ועשבי תיבול", images: [] },
  { id: 22, name: "תפו''א מוקרם", price: 55, category: "פסטות ועיקריות", desc: "בשמנת וגבינות", images: [] },
  { id: 23, name: "תפו''א/בטטה בתנור", price: 45, category: "פסטות ועיקריות", desc: "פלחי ירקות שורש צלויים", images: [] }
];

// --- רכיב כרטיס מנה ---
function MenuItem({ item, qty, update }: { item: any, qty: number, update: (id: number, delta: number) => void }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!item.images || item.images.length <= 1) return;
    const delay = Math.random() * 2000; 
    const timeout = setTimeout(() => {
        const interval = setInterval(() => {
            setCurrentImg(prev => (prev + 1) % item.images.length);
        }, 3500); 
        return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [item.images]);

  // לוגיקה לתצוגת "מינימום 30" - הוספנו החרגה לעוגיות
  const isBulkItem = item.category === "מגשי אירוח" 
      && !item.name.includes("מגש אנטיפסטי") 
      && !item.name.includes("מגש גבינות")
      && !item.name.includes("מגש עוגיות");

  return (
    <article className="bg-[#161616]/90 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex flex-col sm:flex-row gap-4 group hover:border-[#D4A5A5]/30 transition-all shadow-lg overflow-hidden">
        
        {/* תמונה */}
        {item.images && item.images.length > 0 && (
            <div className="w-full sm:w-32 h-48 sm:h-32 relative rounded-2xl overflow-hidden flex-shrink-0 bg-black/50">
                {item.images.map((src: string, index: number) => (
                    <img 
                        key={src}
                        src={src}
                        alt={item.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImg ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                {item.images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                        {item.images.map((_: any, i: number) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? 'bg-white' : 'bg-white/30'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {/* תוכן */}
        <div className="flex-1 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold group-hover:text-[#D4A5A5] transition-colors">{item.name}</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed pl-2">{item.desc}</p>
            </div>
            
            <div className="flex items-end justify-between mt-4">
                <div className="flex flex-col">
                    <span className="text-[#C48F65] font-black text-lg" aria-label={`מחיר: ${item.price} שקלים`}>₪{item.price}</span>
                    {isBulkItem && <span className="text-[10px] text-[#8BA888] bg-[#8BA888]/10 px-2 py-0.5 rounded-full w-fit mt-1">מינימום 30 יח'</span>}
                </div>

                <div className="flex items-center gap-3 bg-black/60 p-1.5 rounded-2xl border border-white/10">
                    <button 
                        onClick={() => update(item.id, 1)} 
                        aria-label={`הוסף יחידה אחת של ${item.name}`}
                        className="w-10 h-10 bg-gradient-to-br from-[#8BA888] to-[#5F7460] rounded-xl font-bold text-xl active:scale-90 transition-all text-white shadow-[0_0_10px_rgba(139,168,136,0.3)] focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <span aria-hidden="true">+</span>
                    </button>
                    
                    <span className="font-black text-lg w-8 text-center" aria-live="polite" aria-label={`כמות נוכחית: ${qty || 0}`}>
                        {qty || 0}
                    </span>
                    
                    <button 
                        onClick={() => update(item.id, -1)} 
                        aria-label={`הסר יחידה אחת של ${item.name}`}
                        disabled={!qty}
                        className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white ${qty ? 'opacity-100 hover:bg-white hover:text-black' : 'opacity-20 cursor-not-allowed'}`}
                    >
                        <span aria-hidden="true">-</span>
                    </button>
                </div>
            </div>
        </div>
    </article>
  );
}

// --- הרכיב הראשי ---
export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '' });
  const [errors, setErrors] = useState({ name: false, address: false });
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [bgIndex, setBgIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        setBgIndex((current) => (current + 1) % BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMenuOpen && closeButtonRef.current) {
        closeButtonRef.current.focus();
    }
  }, [isMenuOpen]);

  const filteredMenu = useMemo(() => 
    activeCategory === "הכל" ? MENU : MENU.filter(m => m.category === activeCategory)
  , [activeCategory]);

  const update = (id: number, delta: number) => {
    const item = MENU.find(i => i.id === id);
    if (!item) return;

    setCart(prev => {
      const currentQty = prev[id] || 0;
      let newQty = currentQty + delta;
      
      // לוגיקה לחישוב כמויות (החרגנו את העוגיות מהמינימום)
      const isBulkItem = item.category === "מגשי אירוח" 
        && !item.name.includes("מגש אנטיפסטי") 
        && !item.name.includes("מגש גבינות")
        && !item.name.includes("מגש עוגיות");

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
    if (subtotal === 0) {
        alert("העגלה ריקה! יש לבחור מנות לפני ההזמנה.");
        return;
    }
    const newErrors = {
        name: !info.name.trim(),
        address: !info.address.trim()
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.address) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return; 
    }
    const items = Object.entries(cart).filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const item = MENU.find(i => i.id === Number(id));
        return `• ${item?.name} (${q} יח') - ₪${(item?.price || 0) * q}`;
      }).join('\n');
    const text = `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי לקוח:\nשם: ${info.name}\nכתובת: ${info.address}`;
    window.open(`https://wa.me/972506669062?text=${encodeURIComponent(text)}`);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white pb-44 px-4 relative overflow-x-hidden font-sans" dir="rtl">
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-[#C48F65] text-white p-4 rounded-xl z-[60] font-bold">
        דלג לתוכן המרכזי
      </a>

      {/* תמונות רקע כלליות */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d] z-20"></div>
        {BG_IMAGES.map((src, index) => (
            <img 
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
            />
        ))}
      </div>

      <div className="relative z-30">
        
        <header className="max-w-2xl mx-auto pt-10 pb-8 text-center relative">
            <button 
                onClick={() => setIsMenuOpen(true)}
                aria-label="פתח תפריט קטגוריות"
                aria-expanded={isMenuOpen}
                className="absolute top-10 right-2 z-50 p-2 text-[#C48F65] hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48F65]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <div className="flex justify-center mb-6">
                <button 
                    onClick={() => setActiveCategory("הכל")}
                    className="relative group cursor-pointer rounded-full focus:outline-none focus:ring-4 focus:ring-[#C48F65]/50"
                    aria-label="חזור לדף הבית והצג את כל המנות"
                >
                    <div className="absolute -inset-1 bg-[#C48F65]/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <img src="/logo.jpg" alt="La Hilula Logo" className="relative w-40 h-40 object-contain rounded-full border border-white/5 shadow-2xl" />
                </button>
            </div>

            <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] rounded-full blur-xl opacity-20 animate-pulse"></div>
                <h1 className="relative text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#C48F65]">
                    La Hilula
                </h1>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
                <div className="h-[1px] w-8 bg-[#8BA888]/50"></div>
                <p className="text-[#8BA888] font-bold tracking-[0.15em] text-xs uppercase italic">
                    Ilanit Israel • 050-666-9062
                </p>
                <div className="h-[1px] w-8 bg-[#8BA888]/50"></div>
            </div>
        </header>

        {isMenuOpen && (
            <div 
                className="fixed inset-0 z-50 flex justify-start"
                role="dialog"
                aria-modal="true"
                aria-label="תפריט ניווט"
            >
                <div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>

                <div 
                    ref={menuRef}
                    className="relative bg-[#1a1a1a] w-3/4 max-w-sm h-full shadow-2xl p-8 border-l border-[#C48F65]/20 flex flex-col overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-bold text-[#C48F65]">תפריט</h2>
                        <button 
                            ref={closeButtonRef}
                            onClick={() => setIsMenuOpen(false)} 
                            aria-label="סגור תפריט"
                            className="text-white hover:text-red-400 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C48F65] p-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-4">
                        {CATEGORIES.filter(cat => cat !== "הכל").map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`w-full text-right p-4 rounded-xl text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#C48F65] ${
                                    activeCategory === cat 
                                    ? 'bg-[#C48F65] text-white shadow-lg' 
                                    : 'text-gray-300 hover:bg-white/5 hover:text-[#C48F65]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                        La Hilula • Premium Cooking
                    </div>
                </div>
            </div>
        )}

        <div id="main-content" className="max-w-xl mx-auto space-y-4 mt-8">
            <h2 className="text-center text-[#C48F65] text-sm font-bold mb-4 tracking-widest uppercase">
                {activeCategory === "הכל" ? "כל המנות" : activeCategory}
            </h2>

            {filteredMenu.map(item => (
                <MenuItem 
                    key={item.id} 
                    item={item} 
                    qty={cart[item.id] || 0} 
                    update={update} 
                />
            ))}

            <form className="pt-10 space-y-4 pb-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="name" className="sr-only">שם מלא</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="שם מלא *" 
                        autoComplete="name"
                        aria-invalid={errors.name}
                        className={`w-full bg-[#161616]/90 backdrop-blur-sm border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] ${errors.name ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-[#D4A5A5]/50'}`} 
                        onChange={e => {
                            setInfo({...info, name: e.target.value});
                            if(e.target.value) setErrors({...errors, name: false});
                        }} 
                    />
                    {errors.name && <p role="alert" className="text-red-400 text-xs mt-1 mr-2">נא למלא שם מלא</p>}
                </div>

                <div>
                    <label htmlFor="address" className="sr-only">כתובת למשלוח</label>
                    <input 
                        id="address"
                        type="text"
                        placeholder="כתובת למשלוח *" 
                        autoComplete="street-address"
                        aria-invalid={errors.address}
                        className={`w-full bg-[#161616]/90 backdrop-blur-sm border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] ${errors.address ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-[#D4A5A5]/50'}`} 
                        onChange={e => {
                            setInfo({...info, address: e.target.value});
                            if(e.target.value) setErrors({...errors, address: false});
                        }} 
                    />
                    {errors.address && <p role="alert" className="text-red-400 text-xs mt-1 mr-2">נא למלא כתובת למשלוח</p>}
                </div>
            </form>
        </div>

        {subtotal > 0 && (
            <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
            <div className="max-w-md mx-auto bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] p-[1px] rounded-[2.5rem] shadow-[0_0_40px_rgba(196,143,101,0.4)]">
                <div className="bg-[#0d0d0d]/95 backdrop-blur-xl rounded-[2.4rem] p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">סה"כ לתשלום</p>
                    <span className="text-3xl font-black text-white">₪{subtotal}</span>
                </div>
                <button 
                    onClick={send} 
                    aria-label={`בצע הזמנה בוואטסאפ על סך ${subtotal} שקלים`}
                    className="bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-[#C48F65] hover:text-white transition-all shadow-lg flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#C48F65]/50"
                >
                    <span>להזמנה</span>
                    <span className="text-xl" aria-hidden="true">🚀</span>
                </button>
                </div>
            </div>
            </div>
        )}
      </div>
    </main>
  );
}