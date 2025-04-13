'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user && pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (pathname === '/login') {
    return children;
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          {/* 사이드 메뉴 */}
          <div className="w-64 bg-gray-800 text-white">
            <div className="p-4">
              <h1 className="text-xl font-bold">Next.js Admin</h1>
            </div>
            <nav className="mt-4">
              <ul>
                <li>
                  <Link
                    href="/user-management"
                    className={`block px-4 py-2 hover:bg-gray-700 ${
                      pathname === '/user-management' ? 'bg-gray-700' : ''
                    }`}
                  >
                    유저 관리
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
