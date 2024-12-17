import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type ProfileInputs = {
    password1: string;
    password2: string;
}

export const EditPassword: React.FC = React.memo(() => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProfileInputs>()

    const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
        console.log(data)
        reset()
    }

    return (
        <div className="edit-password-container">
            <p>Изменить пароль</p>
            <form onSubmit={handleSubmit(onSubmit)} className="edit-password-form profile-form">
                <label className="password1-lable">Новый пароль</label>
                <input type="text" autoComplete="off" {...register("password1", {required: true, deps: ['password2']})} />
                {errors.password1 && <span className="warning">Обязательное поле!</span>}

                <label className="password2-lable">Новый пароль (ещё раз)</label>
                <input type="text" autoComplete="off" {...register("password2", {
                    required: 'Обязательное поле!',
                    validate: (password2) => {
                        const password1 = watch("password1")
                        if (password1 !== password2) {
                            return 'Пароли не совпадают.'
                        }
                    }
                })} />
                {errors.password2 && <span className="warning">{errors.password2.message}</span>}

                <button disabled={isSubmitting} className="save-button">Сохранить изменения</button>
            </form>
        </div>
    )
})