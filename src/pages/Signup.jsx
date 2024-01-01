import { NavLink, useNavigate } from "react-router-dom";
import styles from "../pages/LogInAndSignUp.module.scss";
import BackToMainButton from "../ui/BackToMainButton";
import { useLogin, useSignup, useUser } from "../api/ApiHooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

//lot of classnames in this file are identical with log in classnames, using the same scss file
function Signup() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isAuthenticated } = useUser();
  const { login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status, if logged in navigate to main
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  function onSubmit({ username, email, password }) {
    signup(
      { username, email, password },
      {
        onSettled: () => {
          reset();
          navigate("/main");
        },
      }
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pokecards_text}>
        Poke<span className={styles.pokecards_text__red}>cards</span>
      </h2>
      <h2 className={styles.login__header}>Sign up</h2>
      <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login__username}>
          <label htmlFor="signup_username" className={styles.input_label}>
            Username
          </label>
          <input
            className={styles.login__input_user}
            type="text"
            id="signup_username"
            disabled={isLoading}
            {...register("username", { required: "This field is required" })}
          />
          {errors?.username?.message && (
            <p className={styles.password_validation}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className={styles.login__email}>
          <label htmlFor="signup_email" className={styles.input_label}>
            Email
          </label>
          <input
            className={styles.login__input_user}
            type="text"
            id="signup_email"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors?.email?.message && (
            <p className={styles.password_validation}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.login__password}>
          <label htmlFor="signup_password" className={styles.input_label}>
            Password (min 8 characters)
          </label>
          <input
            className={styles.login__input_password}
            type="password"
            id="signup_password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors?.password?.message && (
            <p className={styles.password_validation}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className={styles.login__password}>
          <label
            htmlFor="signup_repeat_password"
            className={styles.input_label}
          >
            Repeat password
          </label>
          <input
            className={styles.login__input_password}
            type="password"
            id="signup_repeat_password"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
          {errors?.passwordConfirm?.message && (
            <p className={styles.password_validation}>
              {errors?.passwordConfirm?.message}
            </p>
          )}
        </div>

        <button className={styles.action_button}>Sign up</button>
      </form>

      <p className={styles.register_here}>
        Do you already have an account?{" "}
        <NavLink to="/login" className={styles.register_here__link}>
          Log in here!
        </NavLink>
      </p>

      <BackToMainButton />
    </div>
  );
}

export default Signup;
