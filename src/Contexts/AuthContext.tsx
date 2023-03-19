import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Types";

type AuthContextTypes = {
  createUser: Function;
  login: Function;
  logout: Function;
  loading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextTypes>({
  createUser: () => {},
  login: () => {},
  logout: () => {},
  loading: false,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

type AuthContextProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAuth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, email, displayName, photoURL } = authUser;
        setUser({ uid, email, displayName, photoURL });
      } else {
        setUser(null);
      }
    });
  }, []);

  function createUser(email: string, password: string) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
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
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
