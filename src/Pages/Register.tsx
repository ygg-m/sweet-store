import { Link } from "react-router-dom";

export const Register = () => {
  const Form = () => {
    return (
      <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
        <div className="card-body">
          <Email />
          <Password />
          <RepeatPassword />
          <div className="form-control mt-6">
            <button className="btn-primary btn">Register</button>
          </div>
          <Link to="/login" className="link text-center">
            Already a member?
          </Link>
        </div>
      </div>
    );
  };

  const Email = () => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="email"
          className="input-bordered input"
        />
      </div>
    );
  };

  const Password = () => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="text"
          placeholder="password"
          className="input-bordered input"
        />
      </div>
    );
  };

  const RepeatPassword = () => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Repeat Password</span>
        </label>
        <input
          type="text"
          placeholder="repeat password"
          className="input-bordered input"
        />
      </div>
    );
  };

  const Text = () => {
    return (
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">So you're new here!</h1>
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
        <Form />
      </div>
    </div>
  );
};
