import { Navigate } from "react-router";
import { Navbar, Products } from "../Components";
import { useAuth } from "../Contexts/AuthContext";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <Products />
      {!user ? <Navigate to="/login" replace={true} /> : ""}
    </div>
  );
};
