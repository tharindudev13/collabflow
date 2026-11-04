import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "CollabFlow",
  description: "A collaborative project and task management platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
    
        <main className="w-full min-h-screen">
          {children}
        </main>

       
      </body>
    </html>
  );
}
