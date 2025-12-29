import { Assistant } from "next/font/google"; 
import "./globals.css";

const assistant = Assistant({ subsets: ["hebrew"] });

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