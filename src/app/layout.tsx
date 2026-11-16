import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

/** One typeface for everything: headings and body both use Lexend Deca. */
const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyoto Trip Planner",
  description: "Conversational trip-planner prototype: describe a Kyoto weekend, get a stay, an experience and a place to eat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lexendDeca.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
