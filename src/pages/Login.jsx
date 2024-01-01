import { NavLink, useNavigate } from "react-router-dom";
import styles from "../pages/LogInAndSignUp.module.scss";
import BackToMainButton from "../ui/BackToMainButton";
import { useEffect, useState } from "react";
import { useLogin, useUser } from "../api/ApiHooks";
import Spinner from "../ui/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Check authentication status, if logged in navigate to main
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pokecards_text}>
        Poke<span className={styles.pokecards_text__red}>cards</span>
      </h2>
      <h2 className={styles.login__header}>Log in</h2>
      <form className={styles.login} onSubmit={handleSubmit}>
        <div className={styles.login__email}>
          <label htmlFor="login_email" className={styles.input_label}>
            Email
          </label>
          <input
            className={styles.login__input_user}
            type="text"
            required={true}
            id="login_email"
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.login__password}>
          <label htmlFor="login_password" className={styles.input_label}>
            Password
          </label>
          <input
            className={styles.login__input_password}
            type="password"
            required={true}
            id="login_password"
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.action_button} disabled={isLoading}>
          Log in
        </button>
      </form>
      <p className={styles.register_here}>
        Don&apos;t have an account?{" "}
        <NavLink to="/signup" className={styles.register_here__link}>
          Register here!
        </NavLink>
      </p>
      <BackToMainButton />
    </div>
  );
}

export default Login;
