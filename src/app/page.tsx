'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import EmailSignup from '@/components/EmailSignup';
import MVPPage from '@/components/MVPPage';

export default function HomePage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('emailSubmitted');
    if (access === 'true') setAccessGranted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Loomcore</title>
        <meta name="description" content="Loomcore — Truth stitched together by minds, not algorithms." />
      </Head>

      {accessGranted ? (
        <MVPPage />
      ) : (
        <main>
          <section className="bg-white dark:bg-black">
            <div className="layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Loomcore
              </h1>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                An anonymous, transparent, AI-verified forum for building collective understanding — no ads, no noise, no tracking.
              </p>

              <div className="mt-8 flex flex-col items-center space-y-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
                >
                  Join Early Access
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Built by humans. Strengthened by truth. Powered by curiosity.
                </p>
              </div>

              <footer className="absolute bottom-2 text-gray-500 text-xs dark:text-gray-600">
                © {new Date().getFullYear()} Loomcore
              </footer>
            </div>
          </section>

          {showModal && (
            <EmailSignup
              onSuccess={() => {
                setAccessGranted(true);
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          )}
        </main>
      )}
    </>
  );
}
