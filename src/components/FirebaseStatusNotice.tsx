'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { getFirebaseAuthSafe, getFirebaseDBSafe } from '@/lib/firebase';

export default function FirebaseStatusNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuthSafe();
    const db = getFirebaseDBSafe();
    
    // Show notice if Firebase services are not available
    if (!auth || !db) {
      setShowNotice(true);
    }
  }, []);

  if (!showNotice) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-semibold text-orange-400 mb-1">
              Limited Functionality
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Some features (comments, authentication) are temporarily unavailable. 
              The AI chat and main content are still fully functional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}