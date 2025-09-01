import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/header'; // ✅ import header

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eventique - Create Events',
  icons: {
    icon: 'favicon.ico',
  },
  description:
    'Eventique is a platform for event organizers to create and manage events.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ Header will now appear on all pages */}
        <Header />
        <main className="pt-20">{children}</main> 
        {/* pt-20 = padding so content isn’t hidden behind fixed header */}
      </body>
    </html>
  );
}
