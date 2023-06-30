import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";
import { PulseLoader } from "react-spinners";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 401) {
        setErrMsg("Invalid Credentials");
      } else if (err.status === 400) {
        setErrMsg("Missing email or password");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);
  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
      <PulseLoader
        color="var(--bs-primary)"
        loading
        margin={10}
        size={40}
        speedMultiplier={0.7}
      />
    );

  const content = (
    <section className="col-sm-4">
      <header>
        <h2>User Login</h2>
      </header>
      <main>
        <form action="/action_page.php">
          <p className={errClass} ref={errRef} aria-live="assertive">
            {errMsg}
          </p>
          <div className="mb-3 mt-3">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label for="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="remember"
                checked={persist}
                onChange={handleToggle}
              />
              Remember me
            </label>
          </div>
          <div class="d-grid col-3 mx-auto">
            <button
              type="submit"
              class="btn btn-outline-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </main>
      <footer className="mt-2">
        <Link to="/">Back to home</Link>
      </footer>
    </section>
  );
  return content;
};

export default Login;
