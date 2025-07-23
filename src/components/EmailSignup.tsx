'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type EmailSignupProps = {
  onSuccess: () => void;
  onClose: () => void;
};

export default function EmailSignup({ onSuccess, onClose }: EmailSignupProps) {
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
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-lg"
          aria-label="Close"
        >
          ×
        </button>
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
