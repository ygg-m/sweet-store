import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAp27lLC5k4fGQq8d5s7mTkXQ9zRfcAJ8Q",
  authDomain: "store-ef9df.firebaseapp.com",
  projectId: "store-ef9df",
});

type StoreContextTypes = {};

const StoreContext = createContext<StoreContextTypes>({});

export const useStore = () => useContext(StoreContext);

type StoreContextProps = { children: React.ReactNode };

export const CharacterProvider: React.FC<StoreContextProps> = ({
  children,
}) => {
  const dataBase = getFirestore(firebaseApp);
  const userCollectionRef = collection(dataBase, "users");
  const productsCollectionRef = collection(dataBase, "products");

  const [user, setUser] = useState<string>("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
    getUsers();
  }, []);

  const value: StoreContextTypes = {};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
