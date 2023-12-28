"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { userAuth } from "../firebase";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

import { firestore } from "../firebase";

import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext("");

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(userAuth, provider);
    const userInfo = getAdditionalUserInfo(userCredential);

    if (userInfo && userInfo.isNewUser) {
      const uid = userCredential.user.uid;

      const userData = {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      };

      const userCollection = doc(firestore, "users", uid);

      await setDoc(userCollection, {
        userData,
      });
    }
  };

  const logOut = () => {
    signOut(userAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(userAuth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    //@ts-ignore
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
