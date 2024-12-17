import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type ProfileInputs = {
    email: string;
}

export const EditEmail: React.FC = React.memo(() => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileInputs>()

    const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
        console.log(data)
        reset()
    }

    return (
        <div className="edit-email-container">
            <p>Изменить почту</p>
            <p className="current-email-lable">Ваш почтовый адрес</p>
            <p className="current-email">sonya@gmail.com</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="edit-email-form profile-form">
                <label className="email-lable">Новый адрес</label>
                <input type="email" autoComplete="off" {...register("email", {
                    required: 'Обязательное поле!',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Email должен иметь вид: user@example.com',
                      },
                })} />
                {errors.email && <span className="warning">{errors.email.message}</span>}

                <button disabled={isSubmitting} className="save-button">Сохранить изменения</button>
            </form>
        </div>
    )
})