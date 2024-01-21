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

import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: Record<string, any> | null;
  googleSignIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(userAuth, provider);
    const userInfo = getAdditionalUserInfo(userCredential);

    if (userInfo && userInfo.isNewUser) {
      const uid = userCredential.user.uid;

      const userData = {
        uid: uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp(),
      };

      const userCollection = doc(firestore, "users", uid);

      await setDoc(userCollection, {
        ...userData,
      });
    }
  };

  const logOut = () => {
    signOut(userAuth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(userAuth, (currentUser: any) => {
      console.log({ currentUser });
      async function getUserData() {
        if (currentUser) {
          const uid = currentUser.uid;

          const userDocRef = doc(firestore, "users", uid);

          try {
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              setUserData(userDocSnapshot.data());
            } else {
              console.log("User document does not exist.");
            }
          } catch (error) {
            console.error("Error fetching user document:", error);
          }

          console.log({ user });
        } else {
          setUserData(null);
        }
      }
      setUser(currentUser);
      getUserData();
    });
    return () => subscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: userData, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
