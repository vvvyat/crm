import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { RegistrationInputs, Roles } from "../../consts";
import { useRegistrationMutation } from "../../fetch/registration";
import { ConfigProvider, Select } from "antd";

export const Registration: React.FC = React.memo(() => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationInputs>()

    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate()

    const {mutateAsync: registr} = useRegistrationMutation(setIsFailed, setIsSuccess)

    const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
        registr({
            firstName: data.firstName,
            lastName: data.lastName,
            surname: data.surname,
            email: data.email,
            sign: data.password,
            telegramUrl: data.telegramUrl,
            vkUrl: data.vkUrl,
            role: data.role,
            competencies: data.competencies,
        })
    }

    return (
        <div className="registration">
            <div className={isSuccess ? 'success-registr' : ''}>
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="register-form">
                    <div className="name-container">
                        <div className="name-field-container">
                            <label>Фамилия</label>
                            <input disabled={isSuccess} type="text" autoComplete="off" {...register("lastName", { required: true })} />
                            {errors.lastName && <span className="warning">Обязательное поле!</span>}
                        </div>

                        <div className="name-field-container">
                            <label>Имя</label>
                            <input disabled={isSuccess} type="text" autoComplete="off" {...register("firstName", { required: true })} />
                            {errors.firstName && <span className="warning">Обязательное поле!</span>}
                        </div>

                        <div className="name-field-container">
                            <label>Отчество</label>
                            <input disabled={isSuccess} type="text" autoComplete="off" {...register("surname")} />
                        </div>
                    </div>

                    <div className="email-password-container">
                        <div className="email-password-field-container">
                            <label className="email-lable">Электронная почта</label>
                            <input disabled={isSuccess} type="email" autoComplete="off" {...register("email", {
                                required: 'Обязательное поле!',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Email должен иметь вид: user@example.com',
                                },
                            })} />
                            {errors.email && <span className="warning">{errors.email.message}</span>}
                        </div>

                        <div className="email-password-field-container">
                            <label>Пароль</label>
                            <input disabled={isSuccess} type="password" autoComplete="off" {...register("password", {required: true, minLength: 8, deps: ['confirmPassword']})} />
                            {errors.password?.type === "required" && <span className="warning">Обязательное поле!</span>}
                            {errors.password?.type === "minLength" && <span className="warning">Минимальная длина 8 символов.</span>}
                        </div>

                        <div className="email-password-field-container">
                            <label>Подтвердите пароль</label>
                            <input disabled={isSuccess} type="password" autoComplete="off" {...register("confirmPassword", {
                                required: 'Обязательное поле!',
                                validate: (confirmPassword) => {
                                    const password = watch("password")
                                    if (password !== confirmPassword) {
                                        return 'Пароли не совпадают.'
                                    }
                                }
                            })} />
                            {errors.confirmPassword && <span className="warning">{errors.confirmPassword.message}</span>}
                        </div>
                    </div>

                    <label>Компетенции</label>
                    <textarea disabled={isSuccess} autoComplete="off" {...register("competencies", { required: true })}></textarea>
                    {errors.competencies && <span className="warning">Обязательное поле!</span>}

                    <label>Роль</label>
                    <Controller
                        control={control}
                        name="role"
                        rules={{required: true}}
                        render={({field}) => (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        fontSize: 16,
                                        fontFamily: 'Philosopher',
                                        paddingSM: 13,
                                        borderRadius: 32,
                                        colorText: '#000000',
                                        controlHeight: 54,
                                        lineWidth: 5,
                                        controlOutlineWidth: 0,
                                        colorBorder: '#c7bf9e',
                                    },
                                    components: {
                                        Select: {
                                            activeOutlineColor: '#c7bf9e',
                                            hoverBorderColor: '#c7bf9e',
                                            activeBorderColor: '#c7bf9e',
                                            optionActiveBg: '#c7bf9e',
                                            optionFontSize: 16,
                                            optionSelectedBg: '#c7bf9e',
                                            optionSelectedColor: '#000000',
                                            optionSelectedFontWeight: 400,
                                            selectorBg: '#d9d9d9',
                                        },
                                    },
                                }}
                            >
                                <Select
                                    {...field}
                                    className="role"
                                    popupClassName="role-popup"
                                    disabled={isSuccess}
                                    options={[
                                        {
                                            value: Roles.Curator,
                                            label: "Куратор"
                                        },
                                        {
                                            value: Roles.Student,
                                            label: "Студент"
                                        }
                                    ]}
                                />
                            </ConfigProvider>
                        )}
                    />
                    {errors.role && <span className="warning">Обязательное поле!</span>}
                    
                    <label>Telegram</label>
                    <input disabled={isSuccess} className="tg" type="text" autoComplete="off" {...register("telegramUrl", { required: true})} />
                    {errors.telegramUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                    <label>ВКонтакте</label>
                    <input disabled={isSuccess} className="vk" type="text" autoComplete="off" {...register("vkUrl", { required: true})} />
                    {errors.vkUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                    <button disabled={isSubmitting || isSuccess} className="registr-button">Зарегистрироваться</button>
                    {isFailed && !isSuccess && <p className="registr-error">Не удалось создать учётную запись.</p>}
                </form>
                <NavLink to="/">
                    <button disabled={isSuccess} className="to-authorize-button">Авторизация</button>
                </NavLink>
                <img src="../../img/registration.svg"/>
            </div>

            {isSuccess && (
                <div className="success-registration-modal">
                    <p>Регистрация прошла успешно!<br/>Теперь вы можете войти в свою учетную запись.</p>
                    <button onClick={() => {
                        navigate('/')
                    }}>Закрыть</button>
                </div>
            )}
        </div>
    )
})