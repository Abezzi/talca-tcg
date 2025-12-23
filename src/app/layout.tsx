import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "./_components/session-provider";

export const metadata: Metadata = {
  title: "Talca TCG",
  description: "Online Trading Card Game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <div className="relative flex min-h-screen">
              <main className="flex-1 transition-all duration-300">
                {children}
              </main>
            </div>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
