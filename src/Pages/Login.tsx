import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export const Login = () => {
  const { login, loading, loggedIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cantLogin, setCantLogin] = useState<boolean>(true);

  useEffect(() => {
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;

    if (!isEmailEmpty || !isPasswordEmpty) setCantLogin(false);
    else setCantLogin(true);
  }, [email, password]);

  function handleClick() {
    login(email, password);
  }

  const Text = () => {
    return (
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
    );
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Text />
        <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(" ", ""))}
                placeholder="email"
                className="input-bordered input"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.replace(" ", ""));
                  e.target.focus();
                }}
                type="password"
                placeholder="password"
                className="input-bordered input"
              />
            </div>

            <div className="form-control mt-6">
              {loading ? (
                <button className="loading btn">loading</button>
              ) : (
                <button
                  className={`btn-primary btn ${cantLogin && "btn-disabled"}`}
                  onClick={handleClick}
                >
                  Login
                </button>
              )}
            </div>
            <Link to="/register" className="link text-center">
              Not registered yet?
            </Link>

            {loggedIn && <Navigate to="/" replace={true} />}
          </div>
        </div>
      </div>
    </div>
  );
};
