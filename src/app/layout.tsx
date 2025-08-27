import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/section/ThemeProvider";
import Navbar from "@/components/section/Navbar";
import Sidebar from "@/components/section/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Sapa",
  description: "Indonesian social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} ${inter.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange>
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>
                    <div className="lg:col-span-9">{children}</div>
                  </div>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
