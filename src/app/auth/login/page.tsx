'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthDebugInfo from '@/components/AuthDebugInfo';
import TestAuthButton from '@/components/TestAuthButton';
import { getFirebaseAuthSafe } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authAvailable, setAuthAvailable] = useState(true);
  
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const auth = getFirebaseAuthSafe();
    setAuthAvailable(!!auth);
    
    if (!auth) {
      setError('Authentication service is currently unavailable. Please check the configuration or try again later.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authAvailable) {
      setError('Authentication service is currently unavailable. Please try again later.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Login error details:', error);
      let errorMessage = 'Failed to sign in. ';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message && error.message.includes('configuration')) {
        errorMessage = 'Authentication service is currently unavailable. Please try again later.';
      } else {
        errorMessage = `Failed to sign in: ${error.message || 'Unknown error'}`;
      }
      
      setError(errorMessage);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (!authAvailable) {
      setError('Authentication service is currently unavailable. Please try again later.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error: any) {
      console.error('Google login error details:', error);
      let errorMessage = 'Failed to sign in with Google. ';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.message && error.message.includes('configuration')) {
        errorMessage = 'Google authentication is currently unavailable. Please try email/password instead.';
      } else {
        errorMessage = `Google sign-in failed: ${error.message || 'Unknown error'}`;
      }
      
      setError(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access the AI chat and comment features</p>
        </div>

        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !authAvailable}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <LogIn size={20} />}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading || !authAvailable}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-3 rounded-lg font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-500 hover:text-orange-400 transition-colors">
              Sign up here
            </Link>
          </div>
        </div>
      </motion.div>
      <AuthDebugInfo />
      <TestAuthButton />
    </div>
  );
}