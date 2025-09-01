'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'FAQ', href: '#' },
];

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('userInfo') != null) {
      router.push('/landing');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 m-0 p-0">
        <nav className="flex items-center justify-between px-3 py-0 lg:px-6 m-0">
          <div className="flex lg:flex-1">
            <Image
              src="/logo-transparent-svg.svg"
              alt="Eventique Logo"
              width={100}
              height={80}
              priority
            />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              aria-label="Open main menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl mt-24 py-14 sm:py-20 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Wish to know how to host a great event?{' '}
              <a
                href="https://newsletter.oberai.dev/p/hacking-hackathon-organizing-101"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f02e65]"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Community to the rescue 🚀
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Events are a great way to connect with like-minded people. They also provide
              a great opportunity to learn and network with others in your field. Get
              started with Eventique to host or join your next event.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleGetStarted}
                className="rounded-md bg-[#f02e65] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#990e3c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </button>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more →
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(98%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-20rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#f02e65] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
