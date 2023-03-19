import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../Contexts/StoreContext";

export const Cart = () => {
  const { cart } = useStore();

  let subtotal: number = 0;

  cart?.forEach((prod) => {
    if (prod) subtotal += prod.product.value * prod.quantity;
  });

  const Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  if (cart)
    return (
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle btn">
          <div className="indicator">
            <Icon />
            {cart?.length > 0 ? (
              <span className="badge badge-sm indicator-item">
                {cart?.length}
              </span>
            ) : null}
          </div>
        </label>
        <div
          tabIndex={0}
          className="dropdown-content card card-compact mt-3 w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">
              {cart?.length > 1
                ? `${cart?.length} Items`
                : cart?.length > 0
                ? `${cart?.length} Item`
                : "Nothing here yet!"}
            </span>
            <div className="grid gap-1">
              {cart?.map((prod) => {
                return (
                  <div
                    className="flex items-center justify-between rounded-lg bg-base-200 p-2"
                    key={uuidv4()}
                  >
                    <div className="flex items-center gap-2">
                      <span>{prod.product.name}</span>
                      <span className="font-medium">x{prod.quantity}</span>
                    </div>
                    <span className="font-medium">
                      ${prod.quantity * prod.product.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <span className="text-info">Subtotal: ${subtotal}</span>
            <div className="card-actions">
              <Link to="/cart" className="btn-primary btn-block btn">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
};
