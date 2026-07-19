"use client";
import { useState, useMemo, useEffect, useRef } from 'react';

// --- תמונות רקע ---
const BG_IMAGES = [
  "/bg1.jpeg", "/bg2.jpeg", "/bg3.jpeg", "/bg4.jpeg",
  "/bg5.jpeg", "/bg6.jpeg", "/bg7.jpeg", "/bg8.jpeg",
  "/bg9.jpeg", "/bg10.jpeg", "/bg11.jpeg", "/bg12.jpeg", "/bg13.jpeg"
];

// הקטגוריות — לפי סדר הגשה במעדה
const CATEGORIES = ["הכל", "סלטים", "מנות פתיחה", "עיקריות ופסטות", "סנדוויצ'ים ומטוגנים", "בצקים", "קוסקוס", "קינוחים ומתוקים", "עמדות", "חבילות לעליה לתורה", "עיצוב שולחן"];

const SERVING_COURSES = [
  { title: "סלטים", categories: ["סלטים"] },
  { title: "מנות פתיחה", categories: ["מנות פתיחה"] },
  { title: "עיקריות ופסטות", categories: ["עיקריות ופסטות"] },
  { title: "סנדוויצ'ים ומטוגנים", categories: ["סנדוויצ'ים ומטוגנים"] },
  { title: "בצקים", categories: ["בצקים"] },
  { title: "קוסקוס", categories: ["קוסקוס"] },
  { title: "קינוחים ומתוקים", categories: ["קינוחים ומתוקים"] },
  { title: "עמדות", categories: ["עמדות"] },
  { title: "חבילות לעליה לתורה", categories: ["חבילות לעליה לתורה"] },
  { title: "עיצוב שולחן", categories: ["עיצוב שולחן"] },
];

const BULK_ITEM_IDS = new Set([3, 4, 7, 8, 9, 10, 11, 14, 15]);
const COUSCOUS_ITEM_IDS = new Set([17, 48]);
const COUSCOUS_DEFAULT_QTY = 30;

const isBulkMenuItem = (item: { id: number }) => BULK_ITEM_IDS.has(item.id);

const isCouscousItem = (item: { id: number }) => COUSCOUS_ITEM_IDS.has(item.id);

// --- הגדרת המנות ---
const MENU = [
  // --- מנות פתיחה ---
  { 
    id: 1, 
    name: "סביצ'ה דג", 
    price: 65, 
    category: "מנות פתיחה", 
    desc: "דג טרי בתיבול עדין, שמן זית, לימון ועשבי תיבול מהגינה", 
    images: [] 
  },
  { 
    id: 2, 
    name: "ברוסקטת גבינות", 
    price: 58, 
    category: "מנות פתיחה", 
    desc: "גבינות בוטיק, דבש ופירות העונה", 
    images: [] 
  },
  { 
    id: 11, 
    name: "סושי (יחידה)", 
    price: 5, 
    category: "מנות פתיחה", 
    desc: "צמחוני/דג בציפויים מיוחדים (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 26, 
    name: "חציל בלאדי על האש", 
    price: 50, 
    category: "מנות פתיחה", 
    desc: "ליבת חציל מעושנת בתיבול שמן זית כתית, מזולפת בטחינה גולמית ורכז רימונים. מוגשת עם פרוסות צ'ילי טרי, צנונית פריכה ועשבי תיבול לרעננות.", 
    images: ["/egplant.jpeg"] 
  },
  { 
    id: 12, 
    name: "מגש אנטיפסטי", 
    price: 180, 
    category: "מנות פתיחה", 
    desc: "ירקות קלויים בתנור (מחיר למגש גדול)", 
    images: [] 
  },
  { 
    id: 13, 
    name: "מגש גבינות מפנק", 
    price: 250, 
    category: "מנות פתיחה", 
    desc: "גבינות קשות ורכות, פירות ואגוזים (מחיר למגש)", 
    images: [] 
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
    images: ["/greek_salad_is_autoOrient_w.jpg"]
  },
  { 
    id: 36, 
    name: "סלט קיסר", 
    price: 120, 
    category: "סלטים", 
    desc: "ברוטב לימון ודבש עם אגוזי מלך (כמות סועדים עד 20 איש)", 
    images: ["/ceaser0036_i.jpg"]
  },
  { 
    id: 44, 
    name: "כרוב אסייתי", 
    price: 120, 
    category: "סלטים", 
    desc: "סלט כרוב רענן, מתקתק וקראנצ'י (כמות סועדים עד 20 איש)", 
    images: ["/asian_cabbage_salad_idit_autoOrient_i.jpg"]
  },
  { 
    id: 46, 
    name: "סלט כרוב עם איולי ועשבי טיבול עם שקד מטוגן", 
    price: 120, 
    category: "סלטים", 
    desc: "סלט כרוב טרי בתיבול איולי, עשבי תיבול ושקד מטוגן (כמות סועדים עד 20 איש)", 
    images: ["/cabbage_with_almonds.jpg"]
  },
  { 
    id: 47, 
    name: "סלט קפרזה", 
    price: 120, 
    category: "סלטים", 
    desc: "עגבניות, גבינת מוצרלה, בזיליקום ושמן זית (כמות סועדים עד 20 איש)", 
    images: ["/capreza_salad.jpg.webp"]
  },

  // --- בצקים ---
  { 
    id: 5, 
    name: "קיש בטטה (משפחתי)", 
    price: 120, 
    category: "בצקים", 
    desc: "בצק פריך במילוי שמנת ובטטה", 
    images: [] 
  },
  { 
    id: 6, 
    name: "קיש תפ''א ופטריות (משפחתי)", 
    price: 120,
    category: "בצקים", 
    desc: "שילוב קלאסי של תפוחי אדמה ופטריות טריות", 
    images: [] 
  },
  { 
    id: 42, 
    name: "קובנה עם רטבים", 
    price: 100, 
    category: "בצקים", 
    desc: "מאפה בצק אוורירי ורך הנאפה באיטיות, מוגש עם רטבים מסורתיים", 
    images: [] 
  },
  { 
    id: 7, 
    name: "מיני קישים", 
    price: 9, 
    category: "בצקים", 
    desc: "מבחר טעמים: בצל/פטריות/בטטה (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 8, 
    name: "מיני טורטיה", 
    price: 12, 
    category: "בצקים", 
    desc: "מגולגלות עם ממרחים וירקות קלויים (מחיר ליח')", 
    images: ["/tortias.jpeg"] 
  },
  { 
    id: 9, 
    name: "מיני פוקאצ'ה", 
    price: 10, 
    category: "בצקים", 
    desc: "עם ירקות אנטיפסטי ושמן זית (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 15, 
    name: "קרואסון סלמון", 
    price: 16, 
    category: "בצקים", 
    desc: "במילוי גבינת שמנת וסלמון מעושן (מחיר ליח')", 
    images: [] 
  },

  // --- סנדוויצ'ים ומטוגנים ---
  { 
    id: 3, 
    name: "לחמניות של אמא", 
    price: 8, 
    category: "סנדוויצ'ים ומטוגנים", 
    desc: "ממולאות במטבוחה ביתית וחצילים (מחיר ליח')", 
    images: ["/buns.jpeg", "/bg4.jpeg", "/bg5.jpeg"] 
  },
  { 
    id: 4, 
    name: "מיני פריקסה", 
    price: 14, 
    category: "סנדוויצ'ים ומטוגנים", 
    desc: "סנדוויץ' תוניסאי ביס עם כל התוספות (מחיר ליח')", 
    images: ["/frikase.jpeg"] 
  },
  { 
    id: 10, 
    name: "לביבות תפ''א (לטקס)", 
    price: 6, 
    category: "סנדוויצ'ים ומטוגנים", 
    desc: "זהובות ופריכות (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 14, 
    name: "מיני פיתה סביח", 
    price: 14, 
    category: "סנדוויצ'ים ומטוגנים", 
    desc: "ביס מושלם עם חציל, ביצה וטחינה (מחיר ליח')", 
    images: [] 
  },

  // --- עמדות ---
  { 
    id: 24, 
    name: "עמדת מופלטות וספינג'", 
    price: 2500, 
    category: "עמדות", 
    desc: "לאירועים עד 100 איש. כולל הכנה פרונטלית במקום, דבש, חמאה, ריבות ותה מרוקאי.",
    images: ["/mp1.jpeg", "/mp2.jpeg", "/mp3.jpeg", "/mp4.jpeg"] 
  },

  // --- חבילות לעליה לתורה ---
  { 
    id: 49, 
    name: "חבילת עליה לתורה — קלאסית", 
    price: 4000, 
    category: "חבילות לעליה לתורה", 
    desc: "ספינג', מופלטות, בריק (אריסה זיתים). חבילה מושלמת לאירוע עליה לתורה.",
    images: ["/mp1.jpeg", "/mp2.jpeg"] 
  },
  { 
    id: 50, 
    name: "חבילת עליה לתורה — עם שקשוקה", 
    price: 4500, 
    category: "חבילות לעליה לתורה", 
    desc: "מופלטות, ספינג', בריק (אריסה זיתים), שקשוקה (בגטים).",
    images: ["/mp1.jpeg", "/mp3.jpeg"] 
  },
  { 
    id: 51, 
    name: "חבילת עליה לתורה — מלאה", 
    price: 5500, 
    category: "חבילות לעליה לתורה", 
    desc: "מופלטות, ספינג', בריק, שקשוקה, פריקסה. החבילה המלאה ביותר לאירוע.",
    images: ["/mp1.jpeg", "/mp2.jpeg", "/mp3.jpeg", "/frikase.jpeg"] 
  },

  // --- עיצוב שולחן ---
  { 
    id: 45, 
    name: "סידור שולחן כולל כלים וריפיל", 
    price: 1500, 
    category: "עיצוב שולחן", 
    desc: "שירות פרימיום הכולל עיצוב וסידור השולחן, כלי אוכל והגשה אלגנטיים, ושירות מילוי מחדש (ריפיל) לאורך כל האירוע.", 
    images: [] 
  },

  // --- קינוחים ומתוקים ---
  { 
    id: 25, 
    name: "מגש עוגיות מרוקאיות", 
    price: 200, 
    category: "קינוחים ומתוקים", 
    desc: "מגש עשיר עם 20-25 עוגיות מרוקאיות אותנטיות בעבודת יד (מחיר למגש)", 
    images: ["/cp1.jpeg", "/cp2.jpeg", "/cp3.jpeg"] 
  },
  { 
    id: 40, 
    name: "פחזניה רגילה", 
    price: 4.25, 
    category: "קינוחים ומתוקים", 
    desc: "פחזניות קלאסיות במילוי קרם עשיר ומפנק (מחיר ליח')", 
    images: [] 
  },
  { 
    id: 41, 
    name: "פחזניית קראמבל", 
    price: 6, 
    category: "קינוחים ומתוקים", 
    desc: "פחזניה בציפוי קראמבל פריך ובמילוי עשיר (מחיר ליח')", 
    images: [] 
  },

  // --- עיקריות ופסטות ---
  { 
    id: 18, 
    name: "פסטה רוזה", 
    price: 180, 
    category: "עיקריות ופסטות", 
    desc: "רוטב עגבניות ושמנת קטיפתי", 
    images: [] 
  },
  { 
    id: 19, 
    name: "פסטה שמנת פטריות", 
    price: 180, 
    category: "עיקריות ופסטות", 
    desc: "רוטב עשיר עם פטריות טריות", 
    images: [] 
  },
  { 
    id: 20, 
    name: "פסטה ירקות", 
    price: 180, 
    category: "עיקריות ופסטות", 
    desc: "בשמן זית, שום ועשבי תיבול", 
    images: ["/bg12.jpeg"] 
  },
  { 
    id: 22, 
    name: "תפו''א מוקרם", 
    price: 150, 
    category: "עיקריות ופסטות", 
    desc: "בשמנת וגבינות", 
    images: ["/bg11.jpeg"] 
  },
  { 
    id: 23, 
    name: "תפו''א/בטטה בתנור", 
    price: 150, 
    category: "עיקריות ופסטות", 
    desc: "פלחי ירקות שורש צלויים", 
    images: [] 
  },
  { 
    id: 21, 
    name: "שקשוקה", 
    price: 150, 
    category: "עיקריות ופסטות", 
    desc: "פיקנטית עם לחם ביתי", 
    images: ["/bg9.jpeg"] 
  },
  { 
    id: 43, 
    name: "סלמון שלם למרכז שולחן", 
    price: 250, 
    category: "עיקריות ופסטות", 
    desc: "נתח סלמון שלם ומרשים, עשוי בתנור ומוגש למרכז השולחן", 
    images: [] 
  },

  // --- קוסקוס ---
  { 
    id: 17, 
    name: "קוסקוס של סבתא", 
    price: 50, 
    category: "קוסקוס", 
    desc: "עבודת יד עם מרק ירקות עשיר (₪50 למנה, ברירת מחדל 30 מנות)", 
    images: ["/cuscus.jpeg", "/bg13.jpeg"] 
  },
  { 
    id: 48, 
    name: "קוסקוס עם תנזיה", 
    price: 50, 
    category: "קוסקוס", 
    desc: "תבשיל פירות יבשים מרוקאי מתקתק עם זעפרן (₪50 למנה, ברירת מחדל 30 מנות)", 
    images: ["/cuscus.jpeg", "/bg13.jpeg"] 
  }
];

// --- רכיב כרטיס מנה ---
function MenuItem({ item, qty, update }: { item: any, qty: number, update: (id: number, delta: number) => void }) {
  const [currentImg, setCurrentImg] = useState(0);
  const isBulkItem = isBulkMenuItem(item);
  const isCouscous = isCouscousItem(item);

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
                    <span className="text-[#C48F65] font-black text-lg" aria-label={`מחיר: ${item.price} שקלים${isCouscous ? ' למנה' : ''}`}>
                      ₪{item.price}{isCouscous && <span className="text-sm font-bold text-gray-400">/מנה</span>}
                    </span>
                    {isCouscous && (
                      <span className="text-[10px] text-[#8BA888] bg-[#8BA888]/10 px-2 py-0.5 rounded-full w-fit mt-1">
                        ברירת מחדל {COUSCOUS_DEFAULT_QTY} מנות · ₪{item.price * COUSCOUS_DEFAULT_QTY}
                      </span>
                    )}
                    {isBulkItem && <span className="text-[10px] text-[#8BA888] bg-[#8BA888]/10 px-2 py-0.5 rounded-full w-fit mt-1">מינימום 30 יח'</span>}
                </div>

                <div className="flex items-center gap-3 bg-black/60 p-1.5 rounded-2xl border border-white/10">
                    <button type="button" onClick={() => update(item.id, 1)} className="w-10 h-10 bg-gradient-to-br from-[#8BA888] to-[#5F7460] rounded-xl font-bold text-xl active:scale-90 transition-all text-white shadow-[0_0_10px_rgba(139,168,136,0.3)] focus:outline-none focus:ring-2 focus:ring-white">+</button>
                    <span className="font-black text-lg min-w-8 text-center" aria-live="polite">{qty || 0}</span>
                    <button type="button" onClick={() => update(item.id, -1)} disabled={!qty} className={`w-10 h-10 bg-[#222] text-gray-400 rounded-xl font-bold text-xl active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-white ${qty ? 'opacity-100 hover:bg-white hover:text-black' : 'opacity-20 cursor-not-allowed'}`}>-</button>
                </div>
            </div>
        </div>
    </article>
  );
}

// --- הרכיב הראשי ---
export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [info, setInfo] = useState({ name: '', address: '', guests: '', note: '' });
  const [errors, setErrors] = useState({ name: false, address: false, guests: false });
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [bgIndex, setBgIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCartReview, setShowCartReview] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<number>>(new Set());
  
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

  const menuByCourse = useMemo(() =>
    SERVING_COURSES.map(course => ({
      ...course,
      items: course.categories.flatMap(cat => MENU.filter(m => m.category === cat)),
    })).filter(course => course.items.length > 0)
  , []);

  const update = (id: number, delta: number) => {
    const item = MENU.find(i => i.id === id);
    if (!item) return;

    setCart(prev => {
      const currentQty = prev[id] || 0;

      if (isCouscousItem(item)) {
        if (currentQty === 0 && delta > 0) {
          return { ...prev, [id]: COUSCOUS_DEFAULT_QTY };
        }
        return { ...prev, [id]: Math.max(0, currentQty + delta) };
      }

      const step = isBulkMenuItem(item) ? 30 : 1;
      const newQty = currentQty + (delta * step);

      return { ...prev, [id]: Math.max(0, newQty) };
    });
  };

  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = MENU.find(i => i.id === Number(id));
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const cartItems = useMemo(() =>
    Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = MENU.find(i => i.id === Number(id));
        if (!item) return null;
        return { ...item, qty, total: item.price * qty };
      })
      .filter(Boolean) as Array<(typeof MENU)[number] & { qty: number; total: number }>
  , [cart]);

  const cartItemCount = cartItems.length;

  const toggleCartReview = () => {
    setShowCartReview(prev => {
      if (prev) setSelectedForDelete(new Set());
      return !prev;
    });
  };

  const toggleSelectItem = (id: number) => {
    setSelectedForDelete(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllCartItems = () => {
    setSelectedForDelete(new Set(cartItems.map(item => item.id)));
  };

  const deleteSelectedItems = () => {
    if (selectedForDelete.size === 0) return;
    setCart(prev => {
      const next = { ...prev };
      selectedForDelete.forEach(id => delete next[id]);
      return next;
    });
    setSelectedForDelete(new Set());
    setShowCartReview(false);
  };

  useEffect(() => {
    if (subtotal === 0) {
      setShowCartReview(false);
      setSelectedForDelete(new Set());
    }
  }, [subtotal]);

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

    const noteLine = info.note.trim() ? `\n\nהערות:\n${info.note.trim()}` : '';
    const text = `הזמנה חדשה מ-La Hilula 🌿\n\nפירוט המנות:\n${items}\n\nסה"כ לתשלום: ₪${subtotal}\n\nפרטי האירוע:\nשם המזמין: ${info.name}\nמיקום/כתובת: ${info.address}\nמספר אורחים: ${info.guests}${noteLine}`;
    window.open(`https://wa.me/972506669062?text=${encodeURIComponent(text)}`);
  };

  const generateQuote = () => {
    if (!validate()) return;

    const items = Object.entries(cart).filter(([_, q]) => q > 0).map(([id, qty]) => {
        const item = MENU.find(i => i.id === Number(id));
        return { ...item, qty, total: (item?.price || 0) * qty };
    });

    const logoUrl = window.location.origin + '/logo.jpg';

    const escapeHtml = (value: string) =>
      value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const noteSection = info.note.trim()
      ? `<div class="note-section"><div class="label">הערות</div><div class="note-text">${escapeHtml(info.note.trim())}</div></div>`
      : '';

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
            .note-section { background: #fff8f0; border: 1px solid rgba(196, 143, 101, 0.3); border-radius: 10px; padding: 16px 20px; margin-bottom: 30px; margin-top: 24px; }
            .note-text { font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #444; }
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
          ${noteSection}
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
    <main className="min-h-screen bg-[#0d0d0d] text-white pb-24 px-4 relative overflow-x-hidden font-sans" dir="rtl">
      
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
                            הסיפור שלי
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

            {activeCategory === "הכל" ? (
              menuByCourse.map(course => (
                <section key={course.title} className="space-y-4">
                  <h3 className="text-center text-white text-lg font-bold pt-6 pb-2 border-b border-[#C48F65]/30">
                    {course.title}
                  </h3>
                  {course.items.map(item => (
                    <MenuItem 
                      key={item.id} 
                      item={item} 
                      qty={cart[item.id] || 0} 
                      update={update} 
                    />
                  ))}
                </section>
              ))
            ) : (
              filteredMenu.map(item => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  qty={cart[item.id] || 0} 
                  update={update} 
                />
              ))
            )}

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

                <div>
                    <label htmlFor="note" className="sr-only">הערה להצעת מחיר</label>
                    <textarea
                        id="note"
                        rows={3}
                        placeholder="הערה להצעת מחיר (אופציונלי) — למשל תנאי תשלום, הנחה, הערות לאירוע"
                        className="w-full bg-[#161616]/90 backdrop-blur-sm border border-white/10 p-5 rounded-2xl outline-none transition-colors placeholder:text-gray-500 focus:ring-2 focus:ring-[#C48F65] focus:border-[#D4A5A5]/50 resize-y min-h-[5rem]"
                        onChange={e => setInfo({ ...info, note: e.target.value })}
                    />
                </div>
            </form>
        </div>

        {subtotal > 0 && (
            <>
                {showCartReview && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setShowCartReview(false);
                            setSelectedForDelete(new Set());
                        }}
                        aria-hidden="true"
                    />
                )}

                {showCartReview && (
                    <div
                        className="fixed bottom-[4.25rem] left-0 right-0 px-3 z-50 pointer-events-none"
                        role="dialog"
                        aria-modal="true"
                        aria-label="רשימת פריטים בעגלה"
                    >
                        <div className="max-w-xl mx-auto pointer-events-auto bg-[#161616]/98 backdrop-blur-md border border-[#C48F65]/40 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] max-h-[45vh] flex flex-col overflow-hidden">
                            <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between gap-2">
                                <h3 className="text-sm font-bold text-white">העגלה שלי</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCartReview(false);
                                        setSelectedForDelete(new Set());
                                    }}
                                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                                >
                                    סגור
                                </button>
                            </div>

                            <ul className="overflow-y-auto p-2 space-y-1 flex-1">
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        <label className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedForDelete.has(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                                className="w-4 h-4 accent-[#C48F65] shrink-0"
                                            />
                                            <span className="flex-1 min-w-0 text-sm text-white truncate">{item.name}</span>
                                            <span className="text-[11px] text-gray-400 shrink-0">{item.qty} × ₪{item.price}</span>
                                            <span className="text-sm font-bold text-[#C48F65] shrink-0">₪{item.total}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>

                            <div className="px-2 py-2 border-t border-white/10 flex gap-2">
                                <button
                                    type="button"
                                    onClick={selectAllCartItems}
                                    className="flex-1 py-2 text-xs font-bold bg-white/10 border border-white/15 text-white rounded-xl hover:bg-white/20 transition-all"
                                >
                                    בחר הכל
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteSelectedItems}
                                    disabled={selectedForDelete.size === 0}
                                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                                        selectedForDelete.size > 0
                                            ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                                            : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
                                    }`}
                                >
                                    מחק נבחרים{selectedForDelete.size > 0 ? ` (${selectedForDelete.size})` : ''}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="fixed bottom-3 left-0 right-0 px-3 z-50 pointer-events-none">
                    <div className="max-w-xl mx-auto pointer-events-auto bg-[#0d0d0d]/95 backdrop-blur-md border border-[#C48F65]/40 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] px-2 py-2 flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={toggleCartReview}
                            aria-expanded={showCartReview}
                            aria-label={`${showCartReview ? 'סגור' : 'פתח'} רשימת פריטים בעגלה`}
                            className={`shrink-0 min-w-[4.5rem] ps-1 pe-1 py-1 rounded-xl text-right transition-all ${
                                showCartReview ? 'bg-[#C48F65]/20' : 'hover:bg-white/5'
                            }`}
                        >
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wide leading-none mb-0.5">סה"כ</p>
                            <p className="text-lg font-black text-white leading-tight">₪{subtotal}</p>
                            <p className="text-[9px] text-[#C48F65] font-bold leading-none mt-0.5">{cartItemCount} פריטים</p>
                        </button>
                        <button
                            type="button"
                            onClick={generateQuote}
                            aria-label="הפקת הצעת מחיר להדפסה"
                            className="flex-1 min-w-0 py-2.5 px-1.5 text-xs sm:text-sm font-bold bg-white/10 border border-white/15 text-white rounded-xl hover:bg-white/20 transition-all truncate"
                        >
                            הצעת מחיר
                        </button>
                        <button
                            type="button"
                            onClick={send}
                            aria-label={`בצע הזמנה בוואטסאפ על סך ${subtotal} שקלים`}
                            className="flex-[1.15] min-w-0 py-2.5 px-1.5 text-xs sm:text-sm font-black bg-[#C48F65] text-white rounded-xl hover:bg-[#D4A5A5] transition-all truncate"
                        >
                            להזמנה
                        </button>
                    </div>
                </div>
            </>
        )}
      </div>
    </main>
  );
}