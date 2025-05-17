import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthorizationInputs } from "../consts";
import { useAuthorizationMutation } from "../fetch/authorization";

export const Authorization: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthorizationInputs>();

  const [isFailed, setIsFailed] = useState(false);

  const { mutateAsync: authorize, isPending } =
    useAuthorizationMutation(setIsFailed);

  const onSubmit: SubmitHandler<AuthorizationInputs> = async (data) => {
    authorize({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="authorization">
      <div className="login-main">
        <h1 className="login-header">Авторизация</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="login-form"
        >
          <input
            type="email"
            placeholder="Электронная почта"
            {...register("email", {
              required: "Обязательное поле!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email должен иметь вид: user@example.com",
              },
            })}
          />
          {errors.email && (
            <span className="warning">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="warning">Обязательное поле!</span>
          )}

          <button disabled={isSubmitting || isPending} className="login-button">
            Войти
          </button>
          {isFailed && <p className="login-error">Неверный email или пароль</p>}
        </form>
      </div>

      <div className="login-img">
        <div className="rectangle rectangle1"></div>
        <img src="../../img/login.svg" />
        <div className="rectangle rectangle2"></div>
      </div>
    </div>
  );
});