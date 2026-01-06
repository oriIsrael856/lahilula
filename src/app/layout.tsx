import type { Metadata } from "next";
import { Assistant } from "next/font/google"; 
import "./globals.css";

const assistant = Assistant({ subsets: ["hebrew"] });

// --- כאן אנחנו מוסיפים את הגדרות הוואטסאפ והפייסבוק ---
export const metadata: Metadata = {
  // הכותרת שתופיע בלשונית הדפדפן
  title: "La Hilula - המטבח של אילנית",
  description: "קייטרינג בוטיק, אוכל ביתי ומגשי אירוח ברמה אחרת. להזמנות: 050-666-9062",
  
  // חשוב! זו הכתובת הבסיסית של האתר כדי שהתמונות יעבדו
  metadataBase: new URL("https://lahilula.vercel.app"),

  // הגדרות עבור וואטסאפ ופייסבוק
  openGraph: {
    title: "La Hilula - המטבח של אילנית 🌿",
    description: "אוכל ביתי משובח, מגשי אירוח וטעמים שמרגישים בבית. היכנסו לתפריט והזמינו בוואטסאפ!",
    url: "https://lahilula.vercel.app",
    siteName: "La Hilula",
    images: [
      {
        url: "/logo.jpg", // וודא שקובץ הלוגו נמצא בתיקיית public בשם הזה
        width: 800,
        height: 800,
        alt: "La Hilula Logo",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  
  // האייקון הקטן בלשונית למעלה
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={assistant.className}>
        {children}
      </body>
    </html>
  );
}