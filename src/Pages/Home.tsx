import { Navigate } from "react-router";
import { Card, Navbar } from "../Components";
import { useAuth } from "../Contexts/AuthContext";

export const Home = () => {
  const { loggedIn } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex min-h-[calc(100vh-66px)] flex-wrap items-center justify-center gap-8 bg-neutral p-8">
        <Card />
        <Card />
        <Card />
      </div>
      {!loggedIn && <Navigate to="/login" replace={true} />}
    </div>
  );
};
