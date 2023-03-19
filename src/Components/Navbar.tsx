import { useAuth } from "../Contexts/AuthContext";
import { Cart } from "./Cart";

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">Sweets</a>
      </div>
      <div className="flex-none">
        <Cart />
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
