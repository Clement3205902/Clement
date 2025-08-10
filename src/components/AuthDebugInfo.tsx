'use client';

import { useEffect, useState } from 'react';
import { getFirebaseAuthSafe, getFirebaseDBSafe } from '@/lib/firebase';

export default function AuthDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const auth = getFirebaseAuthSafe();
    const db = getFirebaseDBSafe();

    setDebugInfo({
      firebaseAuthAvailable: !!auth,
      firebaseDbAvailable: !!db,
      environmentVariables: {
        apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      }
    });
  }, []);

  if (!debugInfo) return null;

  // Only show in development or if there are issues
  const hasIssues = !debugInfo.firebaseAuthAvailable || !debugInfo.firebaseDbAvailable;
  
  if (process.env.NODE_ENV === 'production' && !hasIssues) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <details className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-xs">
        <summary className="cursor-pointer text-orange-400 font-semibold mb-2">
          🔧 Debug Info
        </summary>
        <div className="space-y-2 text-gray-300">
          <div>
            <strong>Firebase Services:</strong>
            <ul className="ml-4">
              <li>Auth: {debugInfo.firebaseAuthAvailable ? '✅' : '❌'}</li>
              <li>Database: {debugInfo.firebaseDbAvailable ? '✅' : '❌'}</li>
            </ul>
          </div>
          <div>
            <strong>Environment Variables:</strong>
            <ul className="ml-4">
              <li>API Key: {debugInfo.environmentVariables.apiKey ? '✅' : '❌'}</li>
              <li>Auth Domain: {debugInfo.environmentVariables.authDomain ? '✅' : '❌'}</li>
              <li>Project ID: {debugInfo.environmentVariables.projectId ? '✅' : '❌'}</li>
              <li>Storage Bucket: {debugInfo.environmentVariables.storageBucket ? '✅' : '❌'}</li>
              <li>Sender ID: {debugInfo.environmentVariables.messagingSenderId ? '✅' : '❌'}</li>
              <li>App ID: {debugInfo.environmentVariables.appId ? '✅' : '❌'}</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}