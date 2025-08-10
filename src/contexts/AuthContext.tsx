'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDB } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, displayName: string) {
    const auth = getFirebaseAuth();
    const db = getFirebaseDB();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      createdAt: new Date(),
      lastLogin: new Date(),
      isVTStudent: email.endsWith('.edu'),
      chatMessageCount: 0
    });
  }

  async function login(email: string, password: string) {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const auth = getFirebaseAuth();
    const db = getFirebaseDB();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    // Check if user document exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),
        lastLogin: new Date(),
        isVTStudent: user.email?.endsWith('.edu') || false,
        chatMessageCount: 0
      });
    } else {
      // Update last login
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date()
      }, { merge: true });
    }
  }

  function logout() {
    const auth = getFirebaseAuth();
    return signOut(auth);
  }

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirebaseDB();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Update last login if user document exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            lastLogin: new Date()
          }, { merge: true });
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}