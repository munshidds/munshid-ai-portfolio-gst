import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Munshid Rahman K | AI/ML Engineer Portfolio',
  description: 'Interactive portfolio of Munshid Rahman K, an AI/ML Engineer translating advanced machine learning techniques into scalable solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#030205] text-white antialiased selection:bg-orange-500/30 selection:text-orange-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
