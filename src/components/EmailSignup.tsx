'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EmailSignup({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('emails').insert([{ email }]);

    if (error) {
      console.error('Error saving email:', error);
      setStatus('error');
    } else {
      localStorage.setItem('emailSubmitted', 'true');
      setStatus('success');
      onSuccess(); // Notify parent that user is verified
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-2">Enter Your Email</h2>
        <p className="text-sm text-gray-600 mb-4">
          Join early access to start exploring.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-black text-white rounded px-4 py-2 text-sm"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
          {status === 'error' && (
            <p className="text-red-600 text-xs mt-1">Try again later.</p>
          )}
        </form>
      </div>
    </div>
  );
}
