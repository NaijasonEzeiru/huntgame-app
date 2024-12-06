import Header from "@/components/header";
import { Toaster } from "sonner";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import AboutApp from "@/components/aboutApp";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// const BowlbyOne = localFont({
//   src: "./BowlbyOne-Regular.ttf",
//   variable: "--font-bowlby-One-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Huntgame show",
  description: "Huntgame show",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#854B4D]`}>
        <Header />
        <main className="pt-4 md:pt-16 min-h-[calc(100vh-5rem)] relative overflow-hidden z-10 flex items-center justify-center">
          <img
            src="/hero_bg.png"
            alt="nons miraj"
            className="bg-cover absolute left-1/2 -translate-x-1/2 z-0 bottom-0 md:bottom-auto h-full w-auto block"
          />
          {children}
        </main>
        <AboutApp />
        <Toaster richColors theme="light" toastOptions={{}} />
      </body>
    </html>
  );
};

export default RootLayout;
