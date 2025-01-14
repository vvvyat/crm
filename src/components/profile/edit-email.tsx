import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { EmailInputs } from "../../consts"
import { useEditEmailMutation } from "../../fetch/edit-email"

export const EditEmail: React.FC = React.memo(() => {
    const [isFailed, setIsFailed] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EmailInputs>()

    const {mutateAsync: editEmail} = useEditEmailMutation(setIsFailed, reset)

    const onSubmit: SubmitHandler<EmailInputs> = (data) => {
        editEmail({
            oldEmail: data.oldEmail,
            newEmail: data.newEmail
        })
    }

    return (
        <div className="edit-email-container">
            <p>Изменить почту</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="edit-email-form profile-form">
                <label>Ваш почтовый адрес</label>
                <input type="email" {...register("oldEmail", {
                    required: 'Обязательное поле!',
                    deps: ['newEmail'],
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Email должен иметь вид: user@example.com',
                      },
                })} />
                {errors.oldEmail && <span className="warning">{errors.oldEmail.message}</span>}

                <label>Новый адрес</label>
                <input type="email" {...register("newEmail", {
                    required: 'Обязательное поле!',
                    validate: (newEmail) => {
                        const oldEmail = watch('oldEmail')
                        if (oldEmail && newEmail && oldEmail === newEmail) {
                            return 'Новый email должен отличаться от используемого.'
                        }
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Email должен иметь вид: user@example.com',
                    },
                })} />
                {errors.newEmail && <span className="warning">{errors.newEmail.message}</span>}

                <button disabled={isSubmitting} className="save-button">Сохранить изменения</button>
                {isFailed && <p className="edit-profile-error">Не удалось сохранить изменения.</p>}
            </form>
        </div>
    )
})