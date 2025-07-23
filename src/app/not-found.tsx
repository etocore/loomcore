'use client'; // Required because this is a client component

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import TextButton from '@/components/buttons/TextButton';

export default function NotFound({ reset }: { reset?: () => void }) {
  // Workaround for react-icons type issue
  const Icon = RiAlarmWarningFill;

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Icon
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>
            This page could not be found.
          </h1>
          {reset && (
            <TextButton variant='basic' onClick={reset} className='mt-4'>
              Go back
            </TextButton>
          )}
        </div>
      </section>
    </main>
  );
}

