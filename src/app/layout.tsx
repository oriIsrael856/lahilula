import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "La Hilula - המטבח של אילנית",
  description:
    "קייטרינג בוטיק, אוכל ביתי ומגשי אירוח ברמה אחרת. להזמנות: 050-666-9062",
  metadataBase: new URL("https://lahilula.vercel.app"),
  openGraph: {
    title: "La Hilula - המטבח של אילנית",
    description:
      "אוכל ביתי משובח, מגשי אירוח וטעמים שמרגישים בבית. היכנסו לתפריט והזמינו בוואטסאפ!",
    url: "https://lahilula.vercel.app",
    siteName: "La Hilula",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "La Hilula Logo",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
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
    <html lang="he" dir="rtl" className={`${assistant.variable} ${frankRuhl.variable}`}>
      <body className={`${assistant.className} antialiased`}>{children}</body>
    </html>
  );
}
