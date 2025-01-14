import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { PasswordInputs } from "../../consts"
import { useEditPasswordMutation } from "../../fetch/edit-password"

export const EditPassword: React.FC = React.memo(() => {
    const [isFailed, setIsFailed] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PasswordInputs>()

    const {mutateAsync: editPassword} = useEditPasswordMutation(setIsFailed, reset)

    const onSubmit: SubmitHandler<PasswordInputs> = (data) => {
        editPassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        })
    }

    return (
        <div className="edit-password-container">
            <p>Изменить пароль</p>
            <form onSubmit={handleSubmit(onSubmit)} className="edit-password-form profile-form">
                <label>Текущий пароль</label>
                <input type="text" autoComplete="off" {...register("oldPassword", {required: true, deps: ['newPassword']})} />
                {errors.oldPassword && <span className="warning">Обязательное поле!</span>}

                <label>Новый пароль</label>
                <input type="text" autoComplete="off" {...register("newPassword", {
                    required: 'Обязательное поле!',
                    validate: (newPassword) => {
                        const oldPassword = watch('oldPassword')
                        if (oldPassword && newPassword && oldPassword === newPassword) {
                            return 'Новый пароль должен отличаться от используемого.'
                        }
                    }
                })} />
                {errors.newPassword && <span className="warning">{errors.newPassword.message}</span>}

                <button disabled={isSubmitting} className="save-button">Сохранить изменения</button>
                {isFailed && <p className="edit-profile-error">Не удалось сохранить изменения.</p>}
            </form>
        </div>
    )
})