"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Special logic for test user as requested
    if (email === "test@example.com") {
      try {
        return await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
          // If test user doesn't exist, create it
          return await signup(email, password);
        }
        throw error;
      }
    }
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Create a user profile in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
      name: email.split('@')[0] || 'New User',
    });
    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
