import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { product, user } from "../Types/index";

type StoreContextTypes = {
  setUser: Function;
};

const StoreContext = createContext<StoreContextTypes>({
  setUser: () => {},
});

export const useStore = () => useContext(StoreContext);

type StoreContextProps = { children: React.ReactNode };

export const StoreProvider: React.FC<StoreContextProps> = ({ children }) => {
  const dataBase = getFirestore(firebaseApp);
  const userCollectionRef = collection(dataBase, "users");
  const productsCollectionRef = collection(dataBase, "products");

  const [user, setUser] = useState<user>();
  const [products, setProducts] = useState<product[]>();
  const [cart, setCart] = useState<product[]>();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
    getUsers();
  }, []);

  const value: StoreContextTypes = {
    setUser,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
