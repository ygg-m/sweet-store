import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Navbar, Products } from "../Components";
import { useAuth } from "../Contexts/AuthContext";
import { useStore } from "../Contexts/StoreContext";

export const Cart = () => {
  const { user } = useAuth();
  const { cart, addCartItem, removeCartItem } = useStore();

  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    let newSubtotal: number = 0;

    cart?.forEach((prod) => {
      newSubtotal += prod.product.value * prod.quantity;
      setSubtotal(newSubtotal);
    });
  }, [cart]);

  const NumberOfItems = () => {
    if (cart)
      return (
        <span className="text-lg font-bold">
          {cart?.length > 1
            ? `${cart?.length} Items`
            : cart?.length > 0
            ? `${cart?.length} Item`
            : "Nothing here yet!"}
        </span>
      );
    else return null;
  };

  const ItemList = () => {
    if (cart)
      return (
        <div className="grid w-full gap-1">
          {cart?.map((prod) => {
            return (
              <div
                className="flex w-full items-center justify-between rounded-lg bg-base-100 p-2"
                key={uuidv4()}
              >
                <div className="flex items-center gap-2">
                  <span>{prod.product.name}</span>$
                  {prod.quantity * prod.product.value}
                </div>
                <span className="grid grid-cols-3 items-center gap-2 font-medium">
                  <button
                    className="btn-primary btn-sm btn-square btn"
                    onClick={() => removeCartItem(prod.id)}
                  >
                    -
                  </button>
                  <span className="text-center font-medium">
                    x{prod.quantity}
                  </span>
                  <button
                    className="btn-primary btn-sm btn-square btn"
                    onClick={() => addCartItem(prod.id, 1)}
                  >
                    +
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      );
    else return null;
  };

  const Drawer = () => {
    if (cart)
      return (
        <div className="absolute z-50 h-screen w-screen bg-neutral/[0.5]">
          <div className="absolute right-0 z-0 flex h-screen w-1/3 flex-col items-center justify-between gap-8 bg-neutral p-8 shadow-2xl">
            <div className="grid w-full place-items-center gap-8">
              <NumberOfItems />
              <ItemList />
            </div>
            <div className="w-full">
              <span className="text-info">Subtotal: ${subtotal}</span>
              <Link to="/" className="btn-primary btn-block btn">
                Finish
              </Link>
            </div>
          </div>
          <Link to="/" className="absolute -z-10 h-full w-full"></Link>
        </div>
      );
    else return null;
  };

  if (!user) return <Navigate to="/login" replace={true} />;

  if (cart)
    return (
      <div>
        <Drawer />
        <Navbar />
        <Products />
      </div>
    );
  else return null;
};
