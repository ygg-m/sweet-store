import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { product } from "../Types/index";
import { useAuth } from "./AuthContext";

interface CartProduct {
  product: { name: string; value: number };
  quantity: number;
  id: string;
}

type StoreContextTypes = {
  products: product[] | null;
  cart: CartProduct[] | null;
  setCart: Function;
  addCartItem: Function;
  removeCartItem: Function;
};

const StoreContext = createContext<StoreContextTypes>({
  products: [],
  cart: [],
  setCart: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
});

export const useStore = () => useContext(StoreContext);

type StoreContextProps = { children: React.ReactNode };

export const StoreProvider: React.FC<StoreContextProps> = ({ children }) => {
  const { user } = useAuth();
  const dataBase = getFirestore(firebaseApp);
  const productsCollectionRef = collection(dataBase, "products");
  const cartCollectionRef = collection(dataBase, "cart");

  const [products, setProducts] = useState<product[] | null>(null);

  const [cart, setCart] = useState<CartProduct[] | null>(null);

  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    const refinedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProducts(refinedData);
  };

  const getCart = async () => {
    const data = await getDocs(cartCollectionRef);
    const refinedData = data.docs.map((doc) => {
      if (doc.id === user?.uid) return doc.data().products;
    })[0];
    setCart(refinedData);
  };

  useEffect(() => {
    getCart();
    getProducts();
  }, [user, cart]);

  const addCartItem = async (productId: string, quantity: number) => {
    if (!user) return;

    const prod = products?.filter((p) => p.id === productId)[0];

    const cartRef = doc(dataBase, "cart", user.uid);
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.exists()
      ? cartSnapshot.data()
      : { products: [] };

    let updatedProducts;

    const existingItemIndex = cartData.products.findIndex(
      (item: product) => item.id === productId
    );

    if (existingItemIndex >= 0) {
      updatedProducts = [...cartData.products];
      updatedProducts[existingItemIndex].quantity += quantity;
    } else {
      updatedProducts = [
        ...cartData.products,
        {
          id: productId,
          product: { name: prod?.name, value: prod?.value },
          quantity: quantity,
        },
      ];
    }

    await setDoc(cartRef, { products: updatedProducts });
  };

  const removeCartItem = async (productId: string) => {
    if (!user) return;

    const cartRef = doc(dataBase, "cart", user.uid);
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.exists()
      ? cartSnapshot.data()
      : { products: [] };

    const existingItemIndex = cartData.products.findIndex(
      (item: product) => item.id === productId
    );
    if (existingItemIndex >= 0) {
      let updatedProducts = [...cartData.products];
      updatedProducts[existingItemIndex].quantity -= 1;

      if (updatedProducts[existingItemIndex].quantity === 0) {
        updatedProducts.splice(existingItemIndex, 1);
      }

      await setDoc(cartRef, { products: updatedProducts });
    }
  };

  const value: StoreContextTypes = {
    products,
    cart,
    setCart,
    addCartItem,
    removeCartItem,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
