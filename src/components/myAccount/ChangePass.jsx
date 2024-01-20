import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../api/ApiHooks";
import styles from "./ChangePass.module.scss";

function ChangePass() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { updatePass, isUpdating } = useUpdatePassword();

  function onSubmit({ password }) {
    updatePass({ password }, { onSuccess: reset });
  }

  return (
    <form className={styles.changepass} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.changepass__header}>Change password</h3>

      <div className={styles.changepass__row}>
        <label htmlFor="password" className={styles.changepass__label}>
          New password
        </label>
        <input
          className={styles.changepass__input}
          type="password"
          id="password"
          disabled={isUpdating}
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

      <div className={styles.changepass__row}>
        <label htmlFor="passwordConfirm" className={styles.changepass__label}>
          Repeat new password
        </label>
        <input
          className={styles.changepass__input}
          type="password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <p className={styles.password_validation}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <button className={styles.changepass__btn}>Change Password</button>
    </form>
  );
}

export default ChangePass;
