"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // ✅ Import add karo
import { auth, db } from '../lib/firebase'; // ✅ db import karo

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ✅ Firestore se user data fetch karo
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);
            setOnboarded(userData.onboarded || false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setUser(user);
      } else {
        setUser(null);
        setUserData(null);
        setOnboarded(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      onboarded, 
      userData // ✅ Sab values provide karo
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);