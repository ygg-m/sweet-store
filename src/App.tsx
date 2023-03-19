import { useStore } from "./Contexts/StoreContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Register } from "./Pages";
import { Cart } from "./Pages/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

function App() {
  const {} = useStore();

  return <RouterProvider router={router} />;
}

export default App;
