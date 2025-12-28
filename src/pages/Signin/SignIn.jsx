import { useContext } from "react";
import AuthContext from "./../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate();
  console.log("In sign In page", location);
  // const from = location.state || "/";

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log("sign in", result.user.email);
        const user = { email: email };
        axios
          .post(
            "https://job-portal-server-for-recruiter-mu.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
          });
        // navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Sign In!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Sign In</button>
            </fieldset>
          </form>
          <div className="divider">OR</div>
          <div className="m-8">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
