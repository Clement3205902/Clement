'use client';

import { useState } from 'react';
import { getFirebaseAuthSafe } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function TestAuthButton() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string>('');

  const testAuth = async () => {
    setTesting(true);
    setResult('Testing...');

    try {
      const auth = getFirebaseAuthSafe();
      
      if (!auth) {
        setResult('❌ Firebase Auth not available');
        setTesting(false);
        return;
      }

      setResult('✅ Firebase Auth available, testing email/password auth...');

      // Test with a dummy email
      const testEmail = `test+${Date.now()}@example.com`;
      const testPassword = 'testpassword123';

      try {
        // Try to create a test user
        await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        setResult(`✅ Test user created successfully with ${testEmail}`);
        
        // Clean up - try to delete the user (optional)
        // Note: In production, you'd want proper cleanup
        
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          setResult('✅ Auth working (user already exists)');
        } else {
          setResult(`❌ Auth test failed: ${error.code} - ${error.message}`);
        }
      }

    } catch (error: any) {
      setResult(`❌ Unexpected error: ${error.message}`);
    }

    setTesting(false);
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
        <button
          onClick={testAuth}
          disabled={testing}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-2 rounded text-sm mb-2 w-full"
        >
          {testing ? 'Testing...' : '🧪 Test Auth'}
        </button>
        {result && (
          <div className="text-xs text-gray-300 max-w-xs break-words">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}