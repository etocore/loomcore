'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import TextButton from '@/components/buttons/TextButton';

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <AlertTriangle
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>
            404 – Page Not Found
          </h1>
          <TextButton
            variant='basic'
            onClick={() => window.location.href = '/'}
            className='mt-4'
          >
            Go Home
          </TextButton>
        </div>
      </section>
    </main>
  );
}


