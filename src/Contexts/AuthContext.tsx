import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { firebaseApp } from "../firebase";
import { user } from "../Types/index";
import { useStore } from "./StoreContext";

type AuthContextTypes = {
  createUser: Function;
  login: Function;
  logout: Function;
  loading: boolean;
  loggedIn: boolean;
};

const AuthContext = createContext<AuthContextTypes>({
  createUser: () => {},
  login: () => {},
  logout: () => {},
  loading: false,
  loggedIn: false,
});

export const useAuth = () => useContext(AuthContext);

type AuthContextProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const { setUser } = useStore();
  const auth = getAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  function createUser(email: string, password: string) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
        setLoggedIn(true);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  function login(email: string, password: string) {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        setLoggedIn(true);

        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // ..
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  const value: AuthContextTypes = {
    createUser,
    login,
    logout,
    loading,
    loggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
