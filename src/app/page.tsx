"use client";
import { useState, useMemo, useEffect, useRef } from 'react';

// --- תמונות רקע ---
const BG_IMAGES = [
  "/bg1.jpeg", "/bg2.jpeg", "/bg3.jpeg", "/bg4.jpeg",
  "/bg5.jpeg", "/bg6.jpeg", "/bg7.jpeg", "/bg8.jpeg",
  "/bg9.jpeg", "/bg10.jpeg", "/bg11.jpeg", "/bg12.jpeg", "/bg13.jpeg"
];

// הקטגוריות
const CATEGORIES = ["הכל", "מנות ראשונות", "סלטים", "מגשי אירוח", "עמדות לאירועים", "פסטות ועיקריות", "מאפים"];

// --- הגדרת המנות ---
const MENU = [
  // --- מנות ראשונות ---
  { 
    id: 1, 
    name: "סביצ'ה דג", 
    price: 65, 
    category: "מנות ראשונות", 
    desc: "דג טרי בתיבול עדין, שמן זית, לימון ועשבי תיבול מהגינה", 
    images: [] 
  },
  { 
    id: 2, 
    name: "ברוסקטת גבינות", 
    price: 58, 
    category: "מנות ראשונות", 
    desc: "גבינות בוטיק, דבש ופירות העונה", 
    images: [] 
  },
  { 
    id: 21, 
    name: "שקשוקה", 
    price: 150, 
    category: "מנות ראשונות", 
    desc: "פיקנטית עם לחם ביתי", 
    images: ["/bg9.jpeg"] 
  },
  { 
    id: 26, 
    name: "חציל בלאדי על האש", 
    price: 50, 
    category: "מנות ראשונות", 
    desc: "ליבת חציל מעושנת בתיבול שמן זית כתית, מזולפת בטחינה גולמית ורכז רימונים. מוגשת עם פרוסות צ'ילי טרי, צנונית פריכה ועשבי תיבול לרעננות.", 
    images: ["/egplant.jpeg"] 
  },

  // --- סלטים ---
  { 
    id: 30, 
    name: "קרפצ'ו סלק", 
    price: 80, 
    category: "סלטים", 
    desc: "פרוסות סלק דקיקות בתיבול בלסמי מצומצם, גבינת פטה מגורדת ובצל ירוק קצוץ", 
    images: ["/selek.jpeg"] 
  },
  { 
    id: 31, 
    name: "סלט שרי חריף", 
    price: 120, 
    category: "סלטים", 
    desc: "עגבניות שרי צבעוניות, שום כתוש, כוסברה טרייה ופלפל חריף אש (כמות סועדים עד 20 איש)", 
    images: ["/garlicTomatos.jpeg"] 
  },
  { 
    id: 32, 
    name: "חסה בוטנים ופקאן", 
    price: 120, 
    category: "סלטים", 
    desc: "לבבות חסה רעננים עם בוטנים ופקאנים מסוכרים ברוטב ויניגרט חמוץ מתוק (כמות סועדים עד 20 איש)", 
    images: ["/chasa.jpeg"] 
  },
  { 
    id: 33, 
    name: "סלק לימוני", 
    price: 120, 
    category: "סלטים", 
    desc: "קוביות סלק בתיבול רענן עם אגוזים ולימון כבוש (כמות סועדים עד 20 איש)", 
    images: ["/lemonSelek.jpeg"] 
  },
  { 
    id: 34, 
    name: "סלט פסטה פסטו", 
    price: 120, 
    category: "סלטים", 
    desc: "פסטה קרה ברוטב פסטו בזיליקום ביתי, זיתי קלמטה ועגבניות שרי (כמות סועדים עד 20 איש)", 
    images: ["pastaPesto.jpeg"] 
  },
  { 
    id: 35, 
    name: "סלט יווני", 
    price: 120, 
    category: "סלטים", 
    desc: "חסה, עגבניות שרי, זיתים שחורים וגבינת פטה (כמות סועדים עד 20 איש)", 
    images: [] 
  },
  { 
    id: 36, 
    name: "סלט קיסר", 
    price: 120, 
    category: "סלטים", 
    desc: "ברוטב לימון ודבש עם אגוזי מלך (כמות סועדים עד 20 איש)", 
    images: [] 
  },
  { 
    id: 44, 
    name: "כרוב סיני עם חמוציות ושומשום", 
    price: 120, 
    category: "סלטים", 
    desc: "סלט כרוב רענן, מתקתק וקראנצ'י (כמות סועדים עד 20 איש)", 
    images: [] 
  },

  // --- מאפים ---
  { 
    id: 5, 
    name: "קיש בטטה (משפחתי)", 
    price: 120, 
    category: "מאפים", 
    desc: "בצק פריך במילוי שמנת ובטטה", 
    images: [] 
  },
  { 
    id: 6, 
    name: "קיש תפ''א ופטריות (משפחתי)", 
    price: 65, 
    category: "מאפים", 
    desc: "שילוב קלאסי של תפוחי אדמה ופטריות טריות", 
    images: ["/bg13.jpeg"] 
  },
  { 
    id: 42, 
    name: "קובנה עם רטבים", 
    price: 100, 
    category: "מאפים", 
    desc: "מאפה בצק אוורירי ורך הנאפה באיטיות, מוגש עם רטבים מסורתיים", 
    images: [] 
  },

  // --- עמדות לאירועים ---
  { 
    id: 24, 
    name: "עמדת מופלטות וספינג'", 
    price: 2500, 
    category: "עמדות לאירועים", 
    desc: "לאירועים עד 100 איש. כולל הכנה פרונטלית במקום, דבש, חמאה, ריבות ותה מרוקאי.",
    images: ["/mp1.jpeg", "/mp2.jpeg", "/mp3.jpeg", "/mp4.jpeg"] 
  },
  { 
    id: 45, 
    name: "סידור שולחן כולל כלים וריפיל", 
    price: 1500, 
    category: "עמדות לאירועים", 
    desc: "שירות פרימיום הכולל עיצוב וסידור השולחן, כלי אוכל והגשה אלגנטיים, ושירות מילוי מחדש (ריפיל) לאורך כל האירוע.", 
    images: [] 
  },

  // --- מגשי אירוח ---
  { 
    id: 25, 
    name: "מגש עוגיות מרוקאיות", 
    price: 200, 
    category: "מגשי אירוח", 
    desc: "מגש עשיר עם 20-25 עוגיות מרוקאיות אותנטיות בעבודת יד (מחיר למגש)", 
    images: ["/cp1.jpeg", "/cp2.jpeg", "/cp3.jpeg"] 
  },
  { 
    id: 40, 
    name: "פחזניה רגילה", 
    price: 4.25, 
    category: "מגשי אירוח", 
    desc: "פחזניות קלאסיות במילוי קרם עשיר ומפנק (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 41, 
    name: "פחזניית קראמבל", 
    price: 6, 
    category: "מגשי אירוח", 
    desc: "פחזניה בציפוי קראמבל פריך ובמילוי עשיר (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 3, 
    name: "לחמניות של אמא", 
    price: 8, 
    category: "מגשי אירוח", 
    desc: "ממולאות במטבוחה ביתית וחצילים (מחיר ליח')", 
    images: ["/buns.jpeg", "/bg4.jpeg", "/bg5.jpeg"] 
  },
  { 
    id: 4, 
    name: "מיני פריקסה", 
    price: 14, 
    category: "מגשי אירוח", 
    desc: "סנדוויץ' תוניסאי ביס עם כל התוספות (מחיר ליח')", 
    images: ["/frikase.jpeg"] 
  },
  { 
    id: 7, 
    name: "מיני קישים", 
    price: 9, 
    category: "מגשי אירוח", 
    desc: "מבחר טעמים: בצל/פטריות/בטטה (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 8, 
    name: "מיני טורטיה", 
    price: 12, 
    category: "מגשי אירוח", 
    desc: "מגולגלות עם ממרחים וירקות קלויים (מחיר ליח')", 
    images: ["/tortias.jpeg"] 
  },
  { 
    id: 9, 
    name: "מיני פוקאצ'ה", 
    price: 10, 
    category: "מגשי אירוח", 
    desc: "עם ירקות אנטיפסטי ושמן זית (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 10, 
    name: "לביבות תפ''א (לטקס)", 
    price: 6, 
    category: "מגשי אירוח", 
    desc: "זהובות ופריכות (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 11, 
    name: "סושי (יחידה)", 
    price: 5, 
    category: "מגשי אירוח", 
    desc: "צמחוני/דג בציפויים מיוחדים (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 14, 
    name: "מיני פיתה סביח", 
    price: 14, 
    category: "מגשי אירוח", 
    desc: "ביס מושלם עם חציל, ביצה וטחינה (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 15, 
    name: "קרואסון סלמון", 
    price: 16, 
    category: "מגשי אירוח", 
    desc: "במילוי גבינת שמנת וסלמון מעושן (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 12, 
    name: "מגש אנטיפסטי", 
    price: 180, 
    category: "מגשי אירוח", 
    desc: "ירקות קלויים בתנור (מחיר למגש גדול)", 
    images: [] 
  },
  { 
    id: 13, 
    name: "מגש גבינות מפנק", 
    price: 250, 
    category: "מגשי אירוח", 
    desc: "גבינות קשות ורכות, פירות ואגוזים (מחיר למגש)", 
    images: [] 
  },

  // --- פסטות ועיקריות ---
  { 
    id: 17, 
    name: "קוסקוס של סבתא", 
    price: 50, 
    category: "פסטות ועיקריות", 
    desc: "עבודת יד עם מרק ירקות עשיר (מנה אישית)", 
    images: ["/cuscus.jpeg", "/bg13.jpeg"] 
  },
  { 
    id: 18, 
    name: "פסטה רוזה", 
    price: 180, 
    category: "פסטות ועיקריות", 
    desc: "רוטב עגבניות ושמנת קטיפתי", 
    images: [] 
  },
  { 
    id: 19, 
    name: "פסטה שמנת פטריות", 
    price: 180, 
    category: "פסטות ועיקריות", 
    desc: "רוטב עשיר עם פטריות טריות", 
    images: [] 
  },
  { 
    id: 20, 
    name: "פסטה ירקות", 
    price: 180, 
    category: "פסטות ועיקריות", 
    desc: "בשמן זית, שום ועשבי תיבול", 
    images: ["/bg12.jpeg"] 
  },
  { 
    id: 22, 
    name: "תפו''א מוקרם", 
    price: 150, 
    category: "פסטות ועיקריות", 
    desc: "בשמנת וגבינות", 
    images: ["/bg11.jpeg"] 
  },
  { 
    id: 23, 
    name: "תפו''א/בטטה בתנור", 
    price: 150, 
    category: "פסטות ועיקריות", 
    desc: "פלחי ירקות שורש צלויים", 
    images: [] 
  },
  { 
    id: 43, 
    name: "סלמון שלם למרכז שולחן", 
    price: 250, 
    category: "פסטות ועיקריות", 
    desc: "נתח סלמון שלם ומרשים, עשוי בתנור ומוגש למרכז השולחן", 
    images: [] 
  }
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

  const isBulkItem = item.category === "מגשי אירוח" 
      && !item.name.includes("מגש אנטיפסטי") 
      && !item.name.includes("מגש גבינות")
      && !item.name.includes("מגש עוגיות");

  return (
    <article className="bg-[#161616]/90 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex flex-col sm:flex-row gap-4 group hover:border-[#D4A5A5]/30 transition-all shadow-lg overflow-hidden">
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
                    <button onClick={() => update(item.id, 1)} className="w-10 h-10 bg-gradient-to-br from-[#8BA888] to-[#5F7460] rounded-xl font-bold text-xl active:scale-90 transition-all text-white shadow-[0_0_10px_rgba(139,168,136,0.3)] focus:outline-none focus:ring-2 focus:ring-white">+</button>
                    <span className="font-black text-lg w-8 text-center" aria-live="polite">{qty || 0}</span>
                    <button onClick={() => update(item.id, -1)} disabled={!qty} className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white ${qty ? 'opacity-100 hover:bg-white hover:text-black' : 'opacity-20 cursor-not-allowed'}`}>-</button>
                </div>
            </div>
        </div>
    </article>
  );
}

// --- הרכיב הראשי ---
export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '', guests: '' });
  const [errors, setErrors] = useState({ name: false, address: false, guests: false });
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [bgIndex, setBgIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false); 
  
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
      
      const isBulkItem = item.category === "מגשי אירוח" 
        && !item.name.includes("מגש אנטיפסטי") 
        && !item.name.includes("מגש גבינות")
        && !item.name.includes("מגש עוגיות");

      const step = isBulkItem ? 30 : 1;
      const newQty = currentQty + (delta * step);

      return { ...prev, [id]: Math.max(0, newQty) };
    });
  };

  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = MENU.find(i => i.id === Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const validate = () => {
    if (subtotal === 0) {
        alert("העגלה ריקה! יש לבחור מנות לפני הפעולה.");
        return false;
    }
    const newErrors = {
        name: !info.name.trim(),
        address: !info.address.trim(),
        guests: !info.guests.trim()
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.address || newErrors.guests) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return false;
    }
    return true;
  };

  const send = () => {
    if (!validate()) return;
    
    const items = Object.entries(cart).filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const item = MENU.find(i => i.id === Number(id));
        return `• ${item?.name} (${q} יח') - ₪${(item?.price || 0) * q}`;
      }).join('\n');

    const text = `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי האירוע:\nשם המזמין: ${info.name}\nמיקום/כתובת: ${info.address}\nמספר אורחים: ${info.guests}`;
    window.open(`https://wa.me/972506669062?text=${encodeURIComponent(text)}`);
  };

  const generateQuote = () => {
    if (!validate()) return;

    const items = Object.entries(cart).filter(([_, q]) => q > 0).map(([id, qty]) => {
        const item = MENU.find(i => i.id === Number(id));
        return { ...item, qty, total: (item?.price || 0) * qty };
    });

    const logoUrl = window.location.origin + '/logo.jpg';

    const quoteHTML = `
      <html dir="rtl">
        <head>
          <title>הצעת מחיר - La Hilula</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #C48F65; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-img { max-width: 150px; height: auto; margin-bottom: 10px; display: block; margin: 0 auto; }
            .details { display: flex; justify-content: space-between; background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
            .col { flex: 1; }
            .label { font-weight: bold; font-size: 14px; color: #888; margin-bottom: 5px; }
            .value { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: right; padding: 15px; border-bottom: 2px solid #eee; color: #C48F65; }
            td { padding: 15px; border-bottom: 1px solid #eee; }
            .total-row { font-size: 24px; font-weight: bold; color: #C48F65; text-align: left; margin-top: 30px; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
            @media print { body { padding: 0; } .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoUrl}" alt="La Hilula" class="logo-img" onload="setTimeout(function(){window.print()}, 500)" onerror="console.error('Logo failed to load'); window.print();" />
            <div style="font-size: 18px; font-weight: bold; color: #C48F65; margin-top: 5px;">La Hilula</div>
            <div style="margin-top: 5px; font-size: 14px;">מטבח בוטיק וקייטרינג לאירועים</div>
            <div style="margin-top: 5px;">050-666-9062</div>
          </div>
          <div class="details">
            <div class="col">
              <div class="label">לכבוד</div>
              <div class="value">${info.name}</div>
              <div class="label">תאריך הפקה</div>
              <div class="value">${new Date().toLocaleDateString('he-IL')}</div>
            </div>
            <div class="col">
              <div class="label">מיקום האירוע</div>
              <div class="value">${info.address}</div>
              <div class="label">מספר משתתפים</div>
              <div class="value">${info.guests} אורחים</div>
            </div>
          </div>
          <h3>פירוט ההזמנה</h3>
          <table>
            <thead>
              <tr>
                <th>תיאור הפריט</th>
                <th>כמות</th>
                <th>מחיר יחידה</th>
                <th>סה"כ</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(i => `
                <tr>
                  <td>
                    <strong>${i.name}</strong>
                    <div style="font-size: 12px; color: #666;">${i.desc || ''}</div>
                  </td>
                  <td>${i.qty}</td>
                  <td>₪${i.price}</td>
                  <td>₪${i.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total-row">סה"כ לתשלום: ₪${subtotal}</div>
          <div class="footer">תודה שבחרתם בנו! La Hilula - אילנית ישראל<br/>ט.ל.ח | הצעת המחיר תקפה ל-14 יום</div>
        </body>
      </html>
    `;

    const win = window.open('', '', 'width=900,height=800');
    if (win) {
        win.document.write(quoteHTML);
        win.document.close();
    }
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
                        {/* כפתור הסיפור שלי בתפריט */}
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setShowAbout(true);
                            }}
                            className="w-full text-right p-4 rounded-xl text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#C48F65] text-[#C48F65] hover:bg-white/5 border border-[#C48F65]/30 mb-4"
                        >
                            הסיפור שלי 📖
                        </button>

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

        {/* --- חלון אודות מלא (Modal) --- */}
        {showAbout && (
            <div 
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
                role="dialog"
                aria-modal="true"
            >
                <div 
                    className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
                    onClick={() => setShowAbout(false)}
                ></div>
                
                <div className="relative w-full max-w-4xl h-[85vh] bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-[#C48F65]/20 animate-fadeIn">
                    
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/about-bg.jpeg" 
                            alt="רקע אודות" 
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
                    </div>

                    <button 
                        onClick={() => setShowAbout(false)}
                        className="absolute top-6 left-6 z-20 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative z-10 flex flex-col h-full overflow-y-auto custom-scrollbar">
                        <div className="p-8 md:p-16 text-center max-w-2xl mx-auto">
                            <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#C48F65] shadow-2xl overflow-hidden mb-8">
                                <img src="/profile.png" alt="אילנית" className="w-full h-full object-cover" />
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">המסע שלי</h2>
                            <p className="text-[#C48F65] text-lg font-bold tracking-widest uppercase mb-8">מהמטבח של אמא אליכם</p>

                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-right md:text-center font-light">
                                <p>
                                    המסע הקולינרי שלי לא התחיל בבתי ספר גבוהים לבישול בפריז, וגם לא במסעדות יוקרה. 
                                    הוא התחיל במקום הכי חם, אמיתי ומלא נשמה שיש – 
                                    <strong className="text-white font-bold"> המטבח של אמא.</strong>
                                </p>
                                <p>
                                    גדלתי בבית מרוקאי שבו האוכל הוא השפה הרשמית. אמא שלי, אישה עם ידי זהב ולב ענק, לימדה אותי שבישול לא עושים עם כוסות מדידה או משקלים, אלא עם הרגש. היא לימדה אותי להקשיב לסיר, להרגיש את הבצק בקצות האצבעות, ולדעת בדיוק מתי התבלינים נפתחים ומשחררים את הקסם שלהם.
                                </p>
                                <p>
                                    היום, ב-<strong>La Hilula</strong>, אני מביאה את כל הידע העתיק הזה, שעבר מדור לדור, ומשלבת אותו עם אסתטיקה מודרנית ואירוח ברמה הגבוהה ביותר. כל מגש שיוצא מהמטבח שלי, כל עוגייה וכל סיר קוסקוס, נעשים באותה אהבה ותשומת לב שאמא שלי הייתה נותנת לארוחת שישי.
                                </p>
                                <p>
                                    עבורי, האוכל הוא רק התירוץ – המטרה האמיתית היא לשמח אנשים, לחבר ביניהם, ולייצר רגעים של אושר טהור.
                                    <br/>
                                    <span className="text-[#C48F65] font-bold block mt-4 text-xl">בתיאבון, אילנית.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div id="main-content" className="max-w-xl mx-auto space-y-4 mt-8">
            
            {/* --- החלק הקבוע בדף הראשי --- */}
            <section className="mb-12 px-4" aria-labelledby="about-heading">
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group min-h-[450px] flex flex-col items-center justify-center p-8 border border-[#C48F65]/30">
                    
                    <div className="absolute inset-0">
                        <img 
                            src="/about-bg.jpeg" 
                            alt="רקע המטבח" 
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-700"></div>
                    </div>

                    <div className="relative z-10 text-center max-w-lg">
                        <div className="w-28 h-28 mx-auto rounded-full border-2 border-[#C48F65] shadow-xl overflow-hidden mb-6">
                            <img src="/profile.png" alt="אילנית ישראל" className="w-full h-full object-cover" />
                        </div>

                        <h2 id="about-heading" className="text-3xl font-black text-white mb-3 tracking-wide">
                            נעים להכיר, <span className="text-[#C48F65]">אילנית</span>
                        </h2>
                        
                        <p className="text-gray-200 leading-relaxed text-lg font-light drop-shadow-md">
                            "המסע שלי התחיל במטבח של אמא, בין ריחות התבלינים והחום של הבית. היום אני מביאה אליכם את אותה אהבה, בכל מגש ובכל ביס."
                        </p>

                        <div className="mt-6 w-16 h-1 bg-[#C48F65] mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

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
                    <label htmlFor="name" className="sr-only">שם המזמין</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="שם המזמין *" 
                        autoComplete="name"
                        aria-invalid={errors.name}
                        className={`w-full bg-[#161616]/90 backdrop-blur-sm border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] ${errors.name ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-[#D4A5A5]/50'}`} 
                        onChange={e => {
                            setInfo({...info, name: e.target.value});
                            if(e.target.value) setErrors({...errors, name: false});
                        }} 
                    />
                    {errors.name && <p role="alert" className="text-red-400 text-xs mt-1 mr-2">נא למלא שם המזמין</p>}
                </div>

                <div>
                    <label htmlFor="address" className="sr-only">מיקום האירוע / כתובת למשלוח</label>
                    <input 
                        id="address"
                        type="text"
                        placeholder="מיקום האירוע / כתובת למשלוח *" 
                        autoComplete="street-address"
                        aria-invalid={errors.address}
                        className={`w-full bg-[#161616]/90 backdrop-blur-sm border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] ${errors.address ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-[#D4A5A5]/50'}`} 
                        onChange={e => {
                            setInfo({...info, address: e.target.value});
                            if(e.target.value) setErrors({...errors, address: false});
                        }} 
                    />
                    {errors.address && <p role="alert" className="text-red-400 text-xs mt-1 mr-2">נא למלא מיקום</p>}
                </div>

                <div>
                    <label htmlFor="guests" className="sr-only">מספר אורחים</label>
                    <input 
                        id="guests"
                        type="number"
                        placeholder="מספר משתתפים באירוע *" 
                        aria-invalid={errors.guests}
                        className={`w-full bg-[#161616]/90 backdrop-blur-sm border p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] ${errors.guests ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-[#D4A5A5]/50'}`} 
                        onChange={e => {
                            setInfo({...info, guests: e.target.value});
                            if(e.target.value) setErrors({...errors, guests: false});
                        }} 
                    />
                    {errors.guests && <p role="alert" className="text-red-400 text-xs mt-1 mr-2">נא למלא מספר אורחים</p>}
                </div>
            </form>
        </div>

        {subtotal > 0 && (
            <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
            <div className="max-w-md mx-auto bg-gradient-to-r from-[#D4A5A5] to-[#C48F65] p-[1px] rounded-[2.5rem] shadow-[0_0_40px_rgba(196,143,101,0.4)]">
                <div className="bg-[#0d0d0d]/95 backdrop-blur-xl rounded-[2.4rem] p-6 flex flex-col gap-4">
                    
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">סה"כ לתשלום</p>
                            <span className="text-3xl font-black text-white">₪{subtotal}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <button 
                            onClick={generateQuote} 
                            aria-label="הפקת הצעת מחיר להדפסה"
                            className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2"
                        >
                            <span>הצעת מחיר</span>
                            <span>📄</span>
                        </button>

                        <button 
                            onClick={send} 
                            aria-label={`בצע הזמנה בוואטסאפ על סך ${subtotal} שקלים`}
                            className="flex-[2] bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-[#C48F65] hover:text-white transition-all shadow-lg flex justify-center items-center gap-2"
                        >
                            <span>להזמנה</span>
                            <span className="text-xl" aria-hidden="true">🚀</span>
                        </button>
                    </div>

                </div>
            </div>
            </div>
        )}
      </div>
    </main>
  );
}