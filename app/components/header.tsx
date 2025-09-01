'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AppwriteConfig } from '../constants/appwrite_config';

interface UserInfo {
  $id: string;
  [key: string]: any;
}

export default function Header() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const appwriteConfig = new AppwriteConfig();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        try {
          const parsed: UserInfo = JSON.parse(stored);
          if (parsed?.$id) setUserInfo(parsed);
        } catch (error) {
          console.error('Failed to parse userInfo from localStorage:', error);
        }
      }
    }
  }, []);

  const handleSignOut = async () => {
    if (!userInfo) return;
    try {
      await appwriteConfig.signOut(userInfo.$id); // Or account.deleteSession('current')
      localStorage.removeItem('userInfo');
      setUserInfo(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <nav className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
          <Image 
            src="/logo-transparent-svg.svg"
            alt="Eventique Logo" 
            width={100} 
            height={80} 
          />
        </div>

        {/* Desktop Login / Logout */}
        <div className="hidden lg:flex">
          {userInfo ? (
            <button
              onClick={handleSignOut}
              className="ml-6 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="ml-6 px-4 py-2 rounded-md bg-[#f02e65] text-white hover:bg-pink-700"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-4 bg-white shadow-md">
          {userInfo ? (
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="w-full px-4 py-2 rounded-md bg-[#f02e65] text-white hover:bg-pink-700"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}
