import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { AuthorizationInputs } from "../../consts";
import { useAuthorizationMutation } from "../../fetch/authorization";

export const Authorization: React.FC<{setUser: React.Dispatch<React.SetStateAction<boolean>>}> = React.memo(({setUser}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthorizationInputs>()

    const [isFailed, setIsFailed] = useState(false)

    const {mutateAsync: authorize} = useAuthorizationMutation(setIsFailed, setUser)

    const onSubmit: SubmitHandler<AuthorizationInputs> = async (data) => {
        authorize({
            email: data.email,
            password: data.password,
        })
    }

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    return (
        <div className="authorization">
            <div className="login-main">
                <h1 className="login-header">Авторизация</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="login-form">
                    <label className="email-lable">Электронная почта</label>
                    <input type="email" {...register("email", {
                        required: 'Обязательное поле!',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Email должен иметь вид: user@example.com',
                        },
                    })} />
                    {errors.email && <span className="warning">{errors.email.message}</span>}

                    <label className="password-lable">Пароль</label>
                    <input type="password" autoComplete="off" {...register("password", { required: true })} />
                    {errors.password && <span className="warning">Обязательное поле!</span>}

                    <button disabled={isSubmitting} className="login-button">Войти</button>
                    {isFailed && <p className="login-error">Неверный email или пароль</p>}
                </form>
                <NavLink to="/register">
                    <button className="to-registration-button">Регистрация</button>
                </NavLink>
            </div>

            <div className="login-img">
                <div className="rectangle rectangle1"></div>
                <img src="../../img/login.svg"/>
                <div className="rectangle rectangle2"></div>
            </div>
        </div>
    )
})