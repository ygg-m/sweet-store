import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { CartProduct, product } from "../Types/index";
import { useAuth } from "./AuthContext";

type StoreContextTypes = {
  products: product[] | null;
  cart: CartProduct[] | null;
  addCartItem: Function;
  removeCartItem: Function;
};

const StoreContext = createContext<StoreContextTypes>({
  products: [],
  cart: [],
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
    const refinedData =
      data.docs.find((doc) => doc.id === user?.uid)?.data().products || [];

    if (refinedData.length === 0) {
      setCart([]);
    } else {
      setCart(refinedData);
    }
  };

  useEffect(() => {
    getCart();
    getProducts();
  }, [user]);

  const addCartItem = async (productId: string, quantity?: number) => {
    if (!user) return;

    const prod = products?.find((p) => p.id === productId);

    const cartRef = doc(dataBase, "cart", user.uid);
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.exists()
      ? cartSnapshot.data()
      : { products: [] };

    const existingItem = cartData.products.find(
      (item: { id: string }) => item.id === productId
    );

    const updatedProducts = existingItem
      ? cartData.products.map((item: product) =>
          item.id === productId
            ? {
                ...item,
                quantity: (existingItem.quantity ?? 0) + (quantity ?? 1),
              }
            : item
        )
      : [
          ...cartData.products,
          {
            id: productId,
            product: { name: prod?.name, value: prod?.value },
            quantity: quantity ?? 1,
          },
        ];

    await setDoc(cartRef, { products: updatedProducts });
    getCart();
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
      updatedProducts[existingItemIndex].quantity =
        (updatedProducts[existingItemIndex].quantity ?? 1) - 1;

      if (updatedProducts[existingItemIndex].quantity === 0) {
        updatedProducts.splice(existingItemIndex, 1);
      }

      await setDoc(cartRef, { products: updatedProducts });
    }
    getCart();
  };

  const value: StoreContextTypes = {
    products,
    cart,
    addCartItem,
    removeCartItem,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
