import { useStore } from "./Contexts/StoreContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Register } from "./Pages";
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
]);

function App() {
  const {} = useStore();

  return <RouterProvider router={router} />;
}

export default App;
